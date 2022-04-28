const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const question = document.querySelector('#question');
const questionContainerElement = document.getElementById('question-container');
let shuffledQuestions, currentQuestionIndex; 
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let myAnswers = [];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    nextQuestion();
})

function startGame()
{
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    nextQuestion();
}

function nextQuestion()
{
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) 
{
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement ('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct)
            {
                button.dataset.correct = answer.correct
            }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
        
    });
    picture.src = 'obrazky/' + questions[currentQuestionIndex].picture;

}

function resetState ()
{
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild)
    {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e)
{
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button=> {
        setStatusClass(button, button.dataset.correct)

   // let answer = event.target.dataset.answer;
    // myAnswers.push(e.target.getAttribute('mystery'));   
    })
    if(shuffledQuestions.length > currentQuestionIndex+1){
    nextButton.classList.remove('hide');
    }
    else if (shuffledQuestions.length === questions.length){
	ShowResults();
    }
}


function ShowResults() {
	document.querySelector('.kviz').style.display = 'none';
	document.querySelector('.results').style.display = 'block';
	const finished = document.querySelector('#values');
	console.log(myAnswers);

	let correctAnswers = 0;

	for (let i = 0; i < questions.length; i++) {
		let lineQuestion = document.createElement('h3');
		lineQuestion.textContent = (i + 1) + '. ' + questions[i].question;
		finished.appendChild(lineQuestion);

		let mine = document.createElement('p');
		mine.textContent = 'Tvoje odpověď: ' + questions[i].answers[myAnswers[i]];
		finished.appendChild(mine);

		let correct = document.createElement('p');
		if (parseInt(myAnswers[i]) === questions[i].correct) {
			correctAnswers++;
			correct.textContent = 'To je SPRÁVNĚ.';
		} else {
			correct.textContent = 'Správná odpověď: ' + questions[i].answers[questions[i].spravna];
            
		}
		finished.appendChild(correct);
	}

	let percent = document.createElement('h2');
	percent.textContent += 'Správně ' + correctAnswers + ' ze ' + questions.length + ' otázek. Úspěšnost ' + Math.round(correctAnswers / questions.length * 100) + ' %.';
	finished.appendChild(percent);
}

function setStatusClass(element, correct) {

    clearStatusClass(element)
    if(correct )
    {element.classList.add('correct')}
    else 
    {element.classList.add('wrong')}
}

function clearStatusClass(element)
{
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        picture:  'mapa.PNG',
        question: 'Jake je hlavni mesto Gronska',
        answers: [
            {text: 'Nuuk', correct: true },
            {text: 'Praha', correct: false },
            {text: 'Keflavik', correct: false },
        ]
    },
    {
        picture: 'snehurka.jpg',
        question: 'Tak na cem si ted pochutname?',
        answers: [
            {text: 'ananas', correct: false },
            {text: 'hruska', correct: false },
            {text: 'jablko', correct: true },
        ]
    },
    {
        picture: 'pivo.jpg',
        question: 'Jak se mi tento kurz zatim dari?',
        answers: [
            {text: 'na jednicku', correct: true },
            {text: 'nikdy jsem ho nemela zacinat', correct: false },
            {text: '50-50', correct: false },
        ]
    },
    {
        picture:  'mapa.PNG',
        question: 'A hlavni mesto Slovenska?',
        answers: [
            {text: 'Bratislava', correct: true },
            {text: 'Praha', correct: false },
            {text: 'Brno', correct: false },
        ]
    },

]