import { Request, Response, NextFunction } from 'express';


export function validatePlayer(req: Request, res: Response, next: NextFunction) {
    const { name, password, mail } = req.body;

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        typeof name !== 'string' ||
        typeof password !== 'string' ||
        typeof mail !== 'string' ||
        !emailRegex.test(mail) ||
        password.length < 4 // Example: password must be at least 4 chars
    ) {
       res.status(400).json({
            error: 'Invalid player parameters. Name, valid email, and password (min 4 chars) are required.'
        });
        return;
    }
    next();
}