import { Router, Request, Response, NextFunction } from 'express';
import playerService from './player.service';
import { validatePlayer } from '../middleware/validateParameters';
import { checkPlayerNotExists, checkPlayerExistsById } from '../middleware/checkPlayerExists';

const router = Router();

// Add a new player
router.post('/', validatePlayer, checkPlayerNotExists, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playerData = req.body;
        const newPlayer = await playerService.addPlayer(playerData);
        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Edit an existing player
router.put('/:playerid/edit', checkPlayerExistsById, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playerId = req.params.playerid;
        const updatedPlayer = await playerService.editPlayer(playerId, req.body);
        if (!updatedPlayer) {
            res.status(404).json({ message: 'Player not found' });
            return;
        }
        res.status(200).json(updatedPlayer);
    } catch (error) {
        next(error);
    }
});

// Delete a player
router.delete('/:playerid', checkPlayerExistsById, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playerId = req.params.playerid;
        const deletedPlayer = await playerService.deletePlayer(playerId);
        if (!deletedPlayer) {
            res.status(404).json({ message: 'Player not found' });
            return;
        }
        res.status(200).json({
            message: 'Player deleted successfully',
            player: deletedPlayer
        });
    } catch (error) {
        next(error);
    }
});

// Get leaderboard
router.get('/leaderboard', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const leaderboard = await playerService.getLeaderboard(req.app.get('GameModel'));
        res.status(200).json(leaderboard);
    } catch (error) {
        next(error);
    }
});

// Get recent results for a player
router.get('/:playerid/results', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playerId = req.params.playerid;
        const results = await playerService.getRecentResults(playerId, req.app.get('GameModel'));
        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

// Get a player by ID
router.get('/:playerid', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playerId = req.params.playerid;
        const player = await playerService.getPlayer(playerId);
        if (!player) {
            res.status(404).json({ message: 'Player not found' });
            return;
        }
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
});

export const playerRouter = router;