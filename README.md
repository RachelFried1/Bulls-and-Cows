Bulls and Cows API – Backend
Welcome to Bulls and Cows – a classic logic game reimagined as a clean RESTful API built with Node.js, TypeScript, Express, and MongoDB.

🎯 What is this project?

An educational backend server for the Bulls and Cows game. Players register, start games, and try to guess a unique 4-digit secret code. Each guess returns:

Bulls: correct digit in the correct place

Cows: correct digit in the wrong place

The server tracks attempts, wins, and maintains a leaderboard of the fastest winners.

💡 Key Features

✅ Player registration, editing, deletion, and viewing
✅ Secure authentication with middleware validation
✅ Random secret code generation with no duplicate digits
✅ Game logic for bulls and pgias calculation
✅ MongoDB data persistence for all players and games
✅ Leaderboard of top 10 fastest wins
✅ Clean, modular TypeScript structure for scalability

🔧 Middlewares Used

validatePlayer: ensures valid name, email, and password (minimum 4 characters)

validateCredentials: authenticates login

checkPlayerNotExists: prevents duplicate player creation

checkPlayerExistsById: validates player existence before edit or delete

validateGuess: ensures guess is an array of 4 unique digits between 1 and 9

🚀 How to Run Locally

Clone this repository:
git clone https://github.com/RachelFried1/Bulls-and-Cows.git

Enter the project folder:
cd Bulls-and-Cows

Install dependencies:
npm install

Configure your MongoDB connection in src/db/connection.ts.

Run the server:
npm run dev

📬 Postman Collection

Included in the repository is BullsAndCows.json, containing requests to:

Add, edit, delete, and view players

Start games and submit guesses

Test all middleware validation flows

👩‍💻 Author

Name: Rachel Fried

GitHub: RachelFried1

Project: Backend for Bulls and Cows game, developed as part of Node.js & TypeScript learning and practice.

📜 License

This project is for educational use. Feel free to fork, improve, and adapt for learning purposes.
