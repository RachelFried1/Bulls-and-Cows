import { Request, Response, NextFunction } from 'express';


export function validateGuess(req: Request, res: Response, next: NextFunction) {
    const guess = req.body.guess;
    if (
        !Array.isArray(guess) ||
        guess.length !== 4 ||
        !guess.every(num => typeof num === 'number' && num >= 1 && num <= 9) ||
        new Set(guess).size !== 4
    ) {
        res.status(400).json({
            error: 'Guess must be an array of 4 unique numbers between 1 and 9.'
        });
        return;
    }
    next();
}