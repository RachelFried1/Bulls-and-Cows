import { Router, Request, Response } from 'express';
import gameService from './game.service';
import { validateCredentials } from '../middleware/validateCredentials'; // Import the new middleware
import { validateGuess } from '../middleware/validateGame';
import mongoose from 'mongoose';

const router = Router();

// Start a new game with username and password
router.post('/start', validateCredentials, async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body; // Get username and password from the request
        const gameId = await gameService.startGame(username, password);
        res.status(201).json({ gameId });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

// Make a guess
router.post('/:gameId/guess', validateGuess, async (req: Request, res: Response) => {
    try {
        const gameId = req.params.gameId;
        const { guess } = req.body; // Ensure guess is retrieved from the body
        const result = await gameService.makeGuess(new mongoose.Types.ObjectId(gameId), guess);
        res.status(200).json(result);
    } catch (error) {
         res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

// Get game status
router.get('/:gameId', async (req: Request, res: Response) => {
    try {
        const gameId = req.params.gameId;
        const status = await gameService.getGameStatus(new mongoose.Types.ObjectId(gameId));
        res.status(200).json(status);
    } catch (error) {
         res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

// End the game
router.post('/:gameId/end', async (req: Request, res: Response) => {
    try {
        const gameId = req.params.gameId;
        const message = await gameService.endGame(new mongoose.Types.ObjectId(gameId));
        res.status(200).json({ message });
    } catch (error) {
         res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

export const gameRouter = router;