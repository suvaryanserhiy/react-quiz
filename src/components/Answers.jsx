import { useRef } from 'react';

//Fisher-Yates algorithms
function shuffleArray(array) {
	const newArr = [...array];
	for (let i = newArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
	}
	return newArr;
}

export default function Answers({
	answers,
	selectedAnswer,
	answerState,
	onSelectAnswer,
}) {
	const shuffledAnswers = useRef();
	if (!shuffledAnswers.current) {
		shuffledAnswers.current = shuffleArray(answers);
	}
	return (
		<ul id='answers'>
			{shuffledAnswers.current.map((answer) => {
				const isSelected = selectedAnswer === answer;
				let cssClass = '';

				if (answerState === 'answered' && isSelected) {
					cssClass = 'selected';
				}
				if (
					(answerState === 'correct' || answerState === 'wrong') &&
					isSelected
				) {
					cssClass = answerState;
				}
				return (
					<li key={answer} className='answer'>
						<button
							onClick={() => onSelectAnswer(answer)}
							className={cssClass}
							disabled={answerState !== ''}
						>
							{answer}
						</button>
					</li>
				);
			})}
		</ul>
	);
}
