'use strict'

const questions = [
    {
        question: "Which is largest animal in the world?",
        answer: [
            { text: "shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answer: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Shri Lanka", correct: false },
            { text: "Nepal", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answer: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
    {
        question: "Which is smallest continet in the world?",
        answer: [
            { text: "Asia", correct: false },
            { text: "Arctic", correct: false },
            { text: "Australia", correct: true },
            { text: "Africa", correct: false },
        ]
    },
    {
        question: "How many days are there in a week?",
        answer: [
            { text: "4", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "10", correct: false },
        ]
    },
    {
        question: "How many days are there in a year?",
        answer: [
            { text: "565", correct: false },
            { text: "456", correct: false },
            { text: "365", correct: true },
            { text: "265", correct: false },
        ]
    },
    {
        question: "What is the capital of India?",
        answer: [
            { text: "Delhi", correct: true },
            { text: "Kashmir", correct: false },
            { text: "Chandigarh", correct: false },
            { text: "Noida", correct: false },
        ]
    },
    {
        question: "How many years are there in one Millenium?",
        answer: [
            { text: "1500 years", correct: false },
            { text: "1000 years", correct: true },
            { text: "2000 years", correct: false },
            { text: "999 years", correct: false },
        ]
    },
    {
        question: "Which continent is known as the ‘Dark’ continent?",
        answer: [
            { text: "Asia", correct: false },
            { text: "Japan", correct: false },
            { text: "Austrelia", correct: false },
            { text: "Africa", correct: true },
        ]
    },
    {
        question: "Who invented Watch?",
        answer: [
            { text: "Albert Eiensten", correct: false },
            { text: "Peter Henlein", correct: true },
            { text: "Nikol Tesla", correct: false },
            { text: "Thomas Edison", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
};

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();