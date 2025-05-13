import { useCallback, useState } from 'react';
import quizCompleteImg from '../assets/quiz-complete.png';
import DUMMYQUESTIONS from '../questions';
import QuestionTimer from './QuestionTimer';

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
	const quizIsComplete = activeQuestionIndex === DUMMYQUESTIONS.length;

	const handleSelectAnswer = useCallback(function handleSelectAnswer(
		selectedAnswer
	) {
		setUserAnswer((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
	},
	[]);

	const handleSkipAnswer = useCallback(
		() => handleSelectAnswer(null),
		[handleSelectAnswer]
	);
	if (quizIsComplete) {
		return (
			<div id='summary'>
				<img src={quizCompleteImg} alt='Trophy icon' />
				<h2>Quiz Completed!</h2>
			</div>
		);
	}

	const shuffledAnswers = shuffleArray(currentQuestion.answers);

	return (
		<div id='quiz'>
			<div id='question'>
				<QuestionTimer
					key={activeQuestionIndex} // react will remouint this component whenever key is changed
					timeout={15000}
					onTimeout={() => handleSkipAnswer()}
				/>
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
