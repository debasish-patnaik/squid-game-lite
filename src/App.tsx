import { useEffect, useState } from 'react';
import './App.css';

const colors = {
	green: '#11ff11',
	red: '#ff1111',
};

function App() {
	const [gameStarted, setGameStarted] = useState(false);
	const [gameFinished, setGameFinished] = useState(false);
	const [timeLeft, setTimeLeft] = useState(15);
	const [score, setScore] = useState(0);
	const [boxColor, setBoxColor] = useState(colors.red);

	useEffect(() => {
		if (timeLeft === 0) {
			setGameFinished(true);
		} else if (gameStarted && !gameFinished && timeLeft > 0) {
			setTimeout(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
		}
	}, [gameStarted, gameFinished, timeLeft]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setBoxColor(boxColor === colors.red ? colors.green : colors.red);
		}, Math.random() * 1000 + 1000);

		return () => clearInterval(intervalId);
	}, [boxColor]);

	const handleStartGame = () => {
		setGameStarted(true);
		setGameFinished(false);
		setTimeLeft(15);
		setScore(0);
	};

	const handleBoxClick = () => {
		if (boxColor === colors.green && score === 24) {
			setScore((score) => score + 1);
			setGameFinished(true);
		} else if (boxColor === colors.green) {
			setScore((score) => score + 1);
		} else {
			setGameFinished(true);
		}
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#efeff2] to-[#d7dae0]">
				<h1 className="text-[32px] font-bold text-center mb-4 select-none">
					<span style={{ color: colors.red }}>Squid</span>
					<span> Game: Lite</span>
				</h1>
				{(!gameStarted || gameFinished) && (
					<>
						<p className="text-lg select-none">Score == 25: 😄</p>
						<p className="text-lg select-none">Score &lt; 25: 😖</p>
						<p className="mb-4 text-lg select-none">🟩: ✅ | 🟥: ❌</p>
						{/* Tick Tock ⏳! */}
						<button
							onClick={handleStartGame}
							className="
							bg-[#333] select-none text-white px-5 py-2.5 
							border-none rounded mb-4 hover:opacity-80"
						>
							Start Game
						</button>
					</>
				)}
				{gameStarted && !gameFinished && (
					<h2 className="text-[24px] mb-2">Time left: {`${timeLeft}`}s</h2>
				)}
				<h1 className="text-[32px] font-bold select-none mb-4">
					Score: {score}
				</h1>
				{gameFinished && (
					<h2 className="text-[28px]">{`${
						score < 25 ? 'Game Over!' : 'You Win!'
					}`}</h2>
				)}
				{gameStarted && !gameFinished && (
					<div
						className="w-[100px] h-[100px] cursor-pointer"
						style={{ backgroundColor: boxColor }}
						onClick={handleBoxClick}
					></div>
				)}
			</div>
			<footer className="footer">
				<p>
					Built by{' '}
					<a href="https://github.com/debasish-patnaik">Debasish Patnaik</a>
				</p>
			</footer>
		</>
	);
}

export default App;
