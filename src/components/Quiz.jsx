import { useState } from 'react';
import DUMMYQUESTIONS from '../questions';

//Fisher-Yates algorithms
function shuffleArray(array) {
	const newArr = [...array];
	for (let i = newArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
	}
	return newArr;
}

export default function Quiz() {
	const [userAnswers, setUserAnswer] = useState([]);
	const activeQuestionIndex = userAnswers.length;

	const currentQuestion = DUMMYQUESTIONS[activeQuestionIndex];
	const shuffledAnswers = shuffleArray(currentQuestion.answers);

	function handleSelectAnswer(selectedAnswer) {
		setUserAnswer((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
	}

	return (
		<div id='quiz'>
			<div id='question'>
				<h2>{currentQuestion.text}</h2>
				<ul id='answers'>
					{shuffledAnswers.map((answer) => (
						<li key={answer} className='answer'>
							<button onClick={() => handleSelectAnswer(answer)}>
								{answer}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
