const welcomeArea = document.getElementById('quiz-welcome-area');
const container = document.querySelector('.quiz_learning');
const startButton = document.getElementById('start-btn');
const questions = document.querySelectorAll('.mak_box');
const resultSection = document.querySelector('.lr_quiz_result');
const timers = [];
let userAnswers = [];
let score = 0;
var userAnswerElement;

startButton.addEventListener('click', () => {
    welcomeArea.style.display = 'none';
    container.style.display = 'block';
    showQuestion(0); 
});

function showResult() {
    container.style.display = 'none';
    resultSection.style.display = 'block';
    displayResults();
}

function showQuestion(index) {
    questions.forEach((question, idx) => {
        if (idx === index) {
            question.style.display = 'block';
            startTimer(index);
        } else {
            question.style.display = 'none';
            clearInterval(timers[idx]);
        }
    });
}

document.querySelectorAll('.next-btn').forEach((button, index) => {
    button.addEventListener('click', () => {
        const currentQuestion = document.querySelector(`.mak_box:nth-child(${index + 1})`);
        const selectedOption = currentQuestion.querySelector('.selected-option');
        
        if (!selectedOption) {
            alert("Please select an answer before proceeding to the next question!");
            return;
        }

        const nextIndex = index + 1;
        if (nextIndex < questions.length) {
            showQuestion(nextIndex);
        } else {
            const lastQuestionIndex = questions.length - 1;
            clearInterval(timers[lastQuestionIndex]);
            calculateScore();
            showResult();
        }
    });
});

document.querySelectorAll('.answer-btn').forEach((button, index) => {
    button.addEventListener('click', () => {
        const answer = prompt("Enter your answer (A, B, C, or D):");
        if (answer && /^[A-D]$/.test(answer.toUpperCase())) {
            const optionIndex = answer.toUpperCase().charCodeAt(0) - 65;
            const currentQuestion = document.querySelector(`.mak_box:nth-child(${index + 1})`);
            const newSelectedOption = currentQuestion.querySelector(`.option:nth-child(${optionIndex + 1})`);
            const selectedOption = currentQuestion.querySelector('.selected-option');
            
            if (selectedOption) {
                selectedOption.classList.remove('selected-option');
                selectedOption.style.color = ''; 
                selectedOption.style.backgroundColor = '';
            }
            
            newSelectedOption.classList.add('selected-option');
            newSelectedOption.style.color = 'white';
            newSelectedOption.style.backgroundColor = '#0022ff';

            userAnswers[index] = answer.toString().toUpperCase();
        } else {
            alert("Please enter a valid answer (A, B, C, or D)!");
        }
    });
});

document.querySelector('.retake-btn').addEventListener('click', () => {
    resultSection.style.display = 'none';
    welcomeArea.style.display = 'block';
    resetSelectedAnswers();
    clearIntervalAllTimers();
    score = 0;
});

function resetSelectedAnswers() {
    questions.forEach(question => {
        const selectedOption = question.querySelector('.selected-option');
        if (selectedOption) {
            selectedOption.classList.remove('selected-option');
            selectedOption.style.color = '';
            selectedOption.style.backgroundColor = '';
        }
    });
    userAnswers = [];
    showQuestion(0);
}

function startTimer(index) {
    let timeLeft = 10;
    const timerElement = document.querySelector(`.timer${index + 1}`);
    timerElement.textContent = `Time left: ${timeLeft} seconds`;
    timers[index] = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft} seconds`;
        if (timeLeft === 0) {
            clearInterval(timers[index]);
            alert("Time's up!");
            userAnswers[index] = "Not Answered";
            const nextIndex = index + 1;
            if (nextIndex < questions.length) {
                showQuestion(nextIndex);
            } else {
                calculateScore();
                showResult();
            }
        }
    }, 1000);
}

function clearIntervalAllTimers() {
    timers.forEach(timer => clearInterval(timer));
}

function displayResults() {
    for (let i = 0; i < userAnswers.length; i++) {
        userAnswerElement = document.querySelector('.lr_questions_container' + (i + 1) + ' .user_answer');
        const userAnswer = userAnswers[i];
        const correctAnswer = getCorrectAnswer(i);
        const answerIsCorrect = userAnswer === correctAnswer;
        userAnswerElement.innerHTML = 'Your answer: ' + userAnswer;
        
        if (userAnswer === "Not Answered") {
            userAnswerElement.style.color = 'orange';
        } else if (answerIsCorrect) {
            userAnswerElement.style.color = 'green';
        } else {
            userAnswerElement.style.color = 'red';
        }
    }

    // Display the score
    const scoreElement = document.querySelector('.lr_quiz_result h2');
    calculateScore(); // ____________________Calculate score before displaying___________________
    scoreElement.textContent = `You have scored: ${score} points`;

    // __________________________If the user scored maximum points, generate and display the discount code_____________________
    if (score === questions.length * 2) {
        const discountCode = generateDiscountCode();
        alert(`Congratulations! You've answered all questions correctly. Here's your discount code: ${discountCode}`);
    }
}

function calculateScore() {
    score = 0;
    userAnswers.forEach((userAnswer, index) => {
        const correctAnswer = getCorrectAnswer(index);
        if (userAnswer === correctAnswer) {
            score += 2; // __________________2 points for correct answer____________________
        } else if (userAnswer === undefined || userAnswer === "Not Answered") {
            score -= 1; // __________________-1 point for not answered______________________
        } else {
            score -= 1; // __________________-1 point for incorrect answer__________________
        }
    });
}

function getCorrectAnswer(index) {
    switch (index) {
        case 0:
            return 'A';
        case 1:
            return 'D';
        case 2:
            return 'B';
        case 3:
            return 'C';
        case 4:
            return 'C';
        default:
            return '';
    }
}

function generateDiscountCode() {
    // _____________________Generate a random discount code___________________________
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // Example of generating a 6-character alphanumeric code
}

function displayResults() {
    for (let i = 0; i < userAnswers.length; i++) {
        userAnswerElement = document.querySelector('.lr_questions_container' + (i + 1) + ' .user_answer');
        const userAnswer = userAnswers[i];
        const correctAnswer = getCorrectAnswer(i);
        const answerIsCorrect = userAnswer === correctAnswer;
        userAnswerElement.innerHTML = 'Your answer: ' + userAnswer;
        
        if (userAnswer === "Not Answered") {
            userAnswerElement.style.color = 'orange';
        } else if (answerIsCorrect) {
            userAnswerElement.style.color = 'green';
        } else {
            userAnswerElement.style.color = 'red';
        }
    }

    // Calculate score
    calculateScore();

    // _____________________Display the score__________________
    const scoreElement = document.querySelector('.lr_quiz_result h2');
    scoreElement.textContent = `You have scored: ${score} points`;

    // ___________Alert the score____________
    alert(`You have scored: ${score} points`);

    // If the user scored maximum points, generate and display the discount code
    if (score === questions.length * 2) {
        const discountCode = generateDiscountCode();
        alert(`Congratulations! You've answered all questions correctly. Here's your discount code: ${discountCode}`);
    }
    function generateDiscountCode() {
    // ________________________Generate a random discount code_________________
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // Example of generating a 6-character alphanumeric code
}
}
