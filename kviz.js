const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
let shuffledQuestions, currentQuestionIndex; 
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons')


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})


function startGame()
{
    console.log('Started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    nextQuestion();
}


function nextQuestion()
{
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) 
{
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement ('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct)
            {
                button.dataset.correct = answer.correct
            }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}


function resetState ()
{
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild)
    {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e)
{
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button=> {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex+1){
    nextButton.classList.remove('hide')
    }
        else{
            startButton.innerText = 'Restart'   //toto zmen na vysledek
            startButton.classList.remove('hide')
    }

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
        question: 'Jake je hlavni mesto Gronska',
        answers: [
            {text: 'Nuuk', correct: true },
            {text: 'Praha', correct: false },
            {text: 'Keflavik', correct: false },
        ]
    },
    {
        question: 'Hruska nebo jablko nebo ananas?',
        answers: [
            {text: 'ananas', correct: true },
            {text: 'hruska', correct: false },
            {text: 'jablko', correct: false },
        ]
    },
    {
        question: 'Jak se mi tento kurz zatim dari?',
        answers: [
            {text: 'na jednicku', correct: true },
            {text: 'nikdy jsem ho nemela zacinat', correct: false },
            {text: '50-50', correct: false },
        ]
    }

]