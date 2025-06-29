import { Request, Response, NextFunction } from 'express';
import { Player } from '../players/player.model';

// Checks if a player with the same name or mail already exists (for create)
export async function checkPlayerNotExists(req: Request, res: Response, next: NextFunction) {
    const { name, mail } = req.body;
    const existing = await Player.findOne({ $or: [{ name }, { mail }] });
    if (existing) {
        res.status(409).json({ error: 'Player with this name or email already exists.' });
        return;
    }
    next();
}

// Checks if a player exists by ID (for edit/delete)
export async function checkPlayerExistsById(req: Request, res: Response, next: NextFunction) {
    const playerId = req.params.playerid;
    const player = await Player.findById(playerId);
    if (!player) {
        res.status(404).json({ error: 'Player not found.' });
        return;
    }
    // Optionally attach player to request for later use
    (req as any).player = player;
    next();
}