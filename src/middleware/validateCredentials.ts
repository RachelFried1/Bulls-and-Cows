import express from 'express';
import { Player } from '../players/player.model';

export const validateCredentials = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const { username, password } = req.body;

    const player = await Player.findOne({ username, password });
    if (!player) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
    }

    req.body.playerId = player._id;
    next();
};