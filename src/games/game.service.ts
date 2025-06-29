import { Game, IGame } from './game.model';
import { BullPgia } from './game.logic';
import { Player } from '../players/player.model'; // Make sure to import the Player model
import mongoose from 'mongoose';

class GameService {
    async startGame(username: string, password: string): Promise<mongoose.Types.ObjectId> {
        const player = await Player.findOne({ username, password });
        if (!player) {
            throw new Error('Invalid player credentials');
        }

        const secretCode = new BullPgia().secretCode;
        const game = new Game({
            playerId: player._id,
            secretCode,
            attempts: [],
            status: 'in-progress',
            maxAttempts: 10,
            winner: false,
            createdAt: new Date(),
        });

        await game.save();
        return game._id as mongoose.Types.ObjectId;
    }

    async makeGuess(gameId: mongoose.Types.ObjectId, guess: number[]): Promise<any> {
        const game = await Game.findById(gameId);
        if (!game || game.status !== 'in-progress') {
            throw new Error('Game not found or already ended');
        }

        const bullPgia = new BullPgia(game.secretCode); // Create BullPgia instance with the secret code
        const { bulls, pgias } = bullPgia.checkGuess(guess); // Check the guess

        game.attempts.push({
            guess,
            bulls,
            pgias,
            createdAt: new Date(),
        });

        
        if (bulls === 4) {
            game.status = 'won';
            game.winner = true;
        } else if (game.attempts.length >= game.maxAttempts) {
            game.status = 'lost';
        }

        await game.save(); // Save the updated game instance
        return {
            bulls,
            pgias,
            remainingAttempts: game.maxAttempts - game.attempts.length,
            status: game.status,
        };
    }

    async getGameStatus(gameId: mongoose.Types.ObjectId): Promise<any> {
        const game = await Game.findById(gameId).populate('playerId'); 
        if (!game) {
            throw new Error('Game not found');
        }
    
        
            return {
                status: game.status,
                attempts: game.attempts.map(attempt => ({
                    guess: attempt.guess,
                    bulls: attempt.bulls,
                    pgias: attempt.pgias,
                    createdAt: attempt.createdAt,
                })),
            
        };
    }

    async endGame(gameId: mongoose.Types.ObjectId): Promise<string> {
        const game = await Game.findById(gameId);
        if (!game) {
            throw new Error('Game not found');
        }

        game.status = 'ended'; 
        await game.save(); 
        return `Game ${gameId} has been ended.`;
    }
}
export default new GameService();