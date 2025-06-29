import express, { Request, Response }  from 'express';
import { gameRouter} from './games/game.controller';
import { playerRouter} from './players/player.controller';
import {myDB} from './db/connection';
import { Game } from './games/game.model';
const app = express();

app.use(express.json());
myDB.getDB();
app.set('GameModel', Game); // Make sure 'Game' is your Mongoose model
app.use('/api/game', gameRouter);
app.use('/api/player', playerRouter);

app.use((err: Error, req: Request , res: Response, next: any) => {
    res.status(500).send('Something went wrong!');
});

export default app;