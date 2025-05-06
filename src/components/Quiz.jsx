import { useState } from 'react';
import DUMMYQUESTIONS from '../questions';

export default function Quiz() {
	const [userAnswers, setUserAnswer] = useState([]);
	const activeQuestionIndex = userAnswers.length;

	function handleSelectAnswer(selectedAnswer) {
		setUserAnswer((prevUserAnswers) => {
			return [...prevUserAnswers, selectedAnswer];
		});
	}

	return (
		<div id='quiz'>
			<div id='question'>
				<h2>{DUMMYQUESTIONS[activeQuestionIndex].text}</h2>
				<ul id='answers'>
					{DUMMYQUESTIONS[activeQuestionIndex].answers.map((answer) => (
						<li key={answer} className='answer'>
							<button onClick={() => handleSelectAnswer(answer)}>
								{answer}
							</button>
						</li>
					))}
				</ul>
				<p>{userAnswers}</p>
			</div>
		</div>
	);
}
