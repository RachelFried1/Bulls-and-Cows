import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayer extends Document {
    name: string;
    password: string;
    mail: string;
    totalGames: number;
    wins: number;
}

const PlayerSchema = new Schema<IPlayer>(
    {
        name: { type: String, required: true, unique: true },      // unique added
        password: { type: String, required: true },
        mail: { type: String, required: true, unique: true },      // unique added
        totalGames: { type: Number, default: 0 },
        wins: { type: Number, default: 0 }
    }
);

export const Player = mongoose.model<IPlayer>('Player', PlayerSchema);