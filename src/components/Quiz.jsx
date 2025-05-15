import { useCallback, useRef, useState } from 'react';
import DUMMYQUESTIONS from '../questions';
import Question from './Question';
import Summary from './Summary';

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
		return <Summary userAnswers={userAnswers} />;
	}

	return (
		<div id='quiz'>
			<Question
				key={activeQuestionIndex}
				questionIndex={activeQuestionIndex}
				onSelectAnswer={handleSelectAnswer}
				onSkipAnswer={handleSkipAnswer}
			/>
		</div>
	);
}
