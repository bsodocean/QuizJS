const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFill = document.querySelector('#progressBarFill');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the capital city of Czech Republic?',
        choice1: 'Prague',
        choice2: 'Pilsen',
        choice3: 'Brno',
        choice4: 'Mallorca',
        answer: 1,
    },
    {
        question: 'What geometric shape is generally used for stop signs?',
        choice1: 'Octagon',
        choice2: 'Triangle',
        choice3: 'Circle',
        choice4: 'Square',
        answer: 1,
    },
    {
        question: 'Which animal can be seen on the Porsche logo?',
        choice1: 'Horse',
        choice2: 'Dog',
        choice3: 'Cat',
        choice4: 'Moose',
        answer:   1,
    },
    {
        question: 'Which is the only edible food that never goes bad?',
        choice1: 'Honey',
        choice2: 'Bread',
        choice3: 'Carrot',
        choice4: 'Cucumber',
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)


        return window.location.assign('end.html') 
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFill.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
})

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectAnswer = selectedChoice.dataset['number']

        let classToApply = selectAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()