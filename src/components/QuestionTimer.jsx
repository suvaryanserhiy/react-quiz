import { useEffect, useState } from 'react';

export default function QuestionTimer({ timeout, onTimeout }) {
	const [remainingTime, setRemainingTime] = useState(timeout);

	useEffect(() => {
		const quizTimer = setTimeout(onTimeout, timeout);

		return () => {
			clearTimeout(quizTimer);
		};
	}, [onTimeout, timeout]);

	useEffect(() => {
		const proggresInterval = setInterval(() => {
			setRemainingTime((prevRemainigTime) => prevRemainigTime - 100);
		}, 100);

		return () => {
			clearInterval(proggresInterval);
		};
	}, []);

	return <progress id='question-time' max={timeout} value={remainingTime} />;
}
