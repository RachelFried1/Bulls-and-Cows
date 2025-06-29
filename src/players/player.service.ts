import { Player, IPlayer } from './player.model';
import { Types } from 'mongoose';
import { Game,IGame } from '../games/game.model';

 class PlayerService {
    // Add a new player
    async addPlayer(data: { name: string; password: string; mail: string }): Promise<IPlayer> {
        const player = new Player({ ...data });
        return await player.save();
    }

    // Edit player details
    async editPlayer(playerId: string, data: Partial<IPlayer>): Promise<IPlayer | null> {
        return await Player.findByIdAndUpdate(playerId, data, { new: true });
    }

    // Delete a player
    async deletePlayer(playerId: string): Promise<IPlayer | null> {
        return await Player.findByIdAndDelete(playerId);
    }

    // Get a player by ID (with all their games if needed)
    async getPlayer(playerId: string): Promise<{ player: IPlayer | null; games: IGame[] }> {
        const player = await Player.findById(playerId);
        if (!player) {
            return { player: null, games: [] }; // Return null player and empty games if not found
        }
    
        // Fetch all games for the player
        const games = await Game.find({ playerId: playerId }); // Assuming playerId is the field in Game that references the player's ID
    
        return { player, games }; // Return both player and their games
    }

    // Get recent results for a player (to be implemented with Game model)
    async getRecentResults(playerId: string, GameModel: any) {
        return await GameModel.find({ playerId: new Types.ObjectId(playerId) })
            .sort({ createdAt: -1 })
            .limit(5);
    }

    // Get leaderboard (top 10 fastest wins)
    async getLeaderboard(GameModel: any) {
        return await GameModel.aggregate([
            { $match: { status: 'won' } },
            {
                $group: {
                    _id: '$playerId',
                    minAttempts: { $min: { $size: '$attempts' } },
                    lastWin: { $max: '$createdAt' }
                }
            },
            { $sort: { minAttempts: 1, lastWin: 1 } },
            { $limit: 10 }
        ]);
    }
}
export default new PlayerService();