export class BullPgia {
    secretCode: number[];

    constructor(secretCode?: number[]) {
        this.secretCode = secretCode ?? BullPgia.generateSecretCode();
    }


    static generateSecretCode(): number[] {
        const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const code: number[] = [];
        for (let i = 0; i < 4; i++) {
            const idx = Math.floor(Math.random() * digits.length);
            code.push(digits[idx]);
            digits.splice(idx, 1);
        }
        return code;
    }

    
    checkGuess(guess: number[]): { bulls: number; pgias: number } {
        let bulls = 0;
        let pgias = 0;
        const secret = [...this.secretCode];
        const guessCopy = [...guess];

    
        for (let i = 0; i < 4; i++) {
            if (guessCopy[i] === secret[i]) {
                bulls++;
                secret[i] = -1; // Mark as matched
                guessCopy[i] = -2; // Mark as matched
            }
        }

      
        for (let i = 0; i < 4; i++) {
            if (guessCopy[i] !== -2) {
                const idx = secret.indexOf(guessCopy[i]);
                if (idx !== -1) {
                    pgias++;
                    secret[idx] = -1; // Mark as matched
                }
            }
        }

        return { bulls, pgias };
    }
}