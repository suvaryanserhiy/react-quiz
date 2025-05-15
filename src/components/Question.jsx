import { useState } from 'react';
import DUMMYQUESTIONS from '../questions';
import Answers from './Answers';
import QuestionTimer from './QuestionTimer';
export default function Question({
	questionIndex,
	onSelectAnswer,
	selectedAnswer,
	onSkipAnswer,
}) {
	const [answer, setAnswer] = useState({
		selectedAnswer: '',
		isCorrect: null,
	});

	let timer = 10000;

	if (answer.selectedAnswer) {
		timer = 1000;
	}
	if (answer.isCorrect !== null) {
		timer = 2000;
	}

	function handleSelectAnswer(answer) {
		setAnswer({
			selectedAnswer: answer,
			isCorrect: null,
		});

		setTimeout(() => {
			setAnswer({
				selectedAnswer: answer,
				isCorrect: DUMMYQUESTIONS[questionIndex].answers[0] === answer,
			});
			setTimeout(() => {
				onSelectAnswer(answer);
			}, 2000);
		}, 1000);
	}
    
	let answerState = '';
	if (answer.selectedAnswer && answer.isCorrect !== null) {
		answerState = answer.isCorrect ? 'correct' : 'wrong';
	} else if (answer.selectedAnswer) {
		answerState = 'answered';
	}
	return (
		<div id='question'>
			<QuestionTimer
				key={timer}
				timeout={timer}
				onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
				mode={answerState}
			/>
			<h2>{DUMMYQUESTIONS[questionIndex].text}</h2>
			<Answers
				answers={DUMMYQUESTIONS[questionIndex].answers}
				selectedAnswer={answer.selectedAnswer}
				answerState={answerState}
				onSelectAnswer={handleSelectAnswer}
			/>
		</div>
	);
}
