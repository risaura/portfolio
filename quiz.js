// Quiz data
const quizzes = {
    math: {
        title: 'Math Quiz',
        questions: [
            {
                question: 'What is the value of x in the equation: 2x + 5 = 13?',
                answers: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
                correct: 1
            },
            {
                question: 'What is the area of a circle with radius 5?',
                answers: ['25π', '10π', '50π', '5π'],
                correct: 0
            },
            {
                question: 'Simplify: (x² + 2x + 1) = ?',
                answers: ['(x + 1)²', '(x - 1)²', 'x² + 1', '(x + 2)²'],
                correct: 0
            },
            {
                question: 'What is 15% of 200?',
                answers: ['25', '30', '35', '40'],
                correct: 1
            },
            {
                question: 'If a triangle has angles of 60° and 70°, what is the third angle?',
                answers: ['40°', '45°', '50°', '55°'],
                correct: 2
            },
            {
                question: 'What is the slope of a line passing through (2,3) and (4,7)?',
                answers: ['1', '2', '3', '4'],
                correct: 1
            },
            {
                question: 'What is √144?',
                answers: ['10', '11', '12', '13'],
                correct: 2
            },
            {
                question: 'Solve for y: 3y - 7 = 14',
                answers: ['y = 5', 'y = 6', 'y = 7', 'y = 8'],
                correct: 2
            },
            {
                question: 'What is the perimeter of a rectangle with length 8 and width 5?',
                answers: ['18', '24', '26', '30'],
                correct: 2
            },
            {
                question: 'What is 5³ (5 cubed)?',
                answers: ['15', '25', '75', '125'],
                correct: 3
            }
        ]
    },
    science: {
        title: 'Science Quiz',
        questions: [
            {
                question: 'What is the chemical symbol for gold?',
                answers: ['Go', 'Gd', 'Au', 'Ag'],
                correct: 2
            },
            {
                question: 'What is the speed of light?',
                answers: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
                correct: 0
            },
            {
                question: 'What is the powerhouse of the cell?',
                answers: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'],
                correct: 2
            },
            {
                question: 'What is the acceleration due to gravity on Earth?',
                answers: ['8.8 m/s²', '9.8 m/s²', '10.8 m/s²', '11.8 m/s²'],
                correct: 1
            },
            {
                question: 'What is the most abundant gas in Earth\'s atmosphere?',
                answers: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'],
                correct: 1
            },
            {
                question: 'How many bones are in the adult human body?',
                answers: ['196', '206', '216', '226'],
                correct: 1
            },
            {
                question: 'What is the pH of pure water?',
                answers: ['5', '6', '7', '8'],
                correct: 2
            },
            {
                question: 'What planet is known as the Red Planet?',
                answers: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
                correct: 1
            },
            {
                question: 'What is the chemical formula for water?',
                answers: ['CO₂', 'H₂O', 'O₂', 'NaCl'],
                correct: 1
            },
            {
                question: 'Which force keeps planets in orbit around the sun?',
                answers: ['Electromagnetic', 'Nuclear', 'Gravity', 'Friction'],
                correct: 2
            }
        ]
    },
    programming: {
        title: 'Programming Quiz',
        questions: [
            {
                question: 'What does HTML stand for?',
                answers: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
                correct: 0
            },
            {
                question: 'Which of these is NOT a programming language?',
                answers: ['Python', 'Java', 'HTML', 'C++'],
                correct: 2
            },
            {
                question: 'What does CSS stand for?',
                answers: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
                correct: 1
            },
            {
                question: 'In Python, what does "print()" do?',
                answers: ['Deletes text', 'Outputs text to console', 'Creates a variable', 'None of these'],
                correct: 1
            },
            {
                question: 'What symbol is used for comments in JavaScript?',
                answers: ['//', '#', '<!--', '**'],
                correct: 0
            },
            {
                question: 'What is an array?',
                answers: ['A type of loop', 'A collection of data', 'A function', 'A variable type'],
                correct: 1
            },
            {
                question: 'Which is a valid JavaScript variable declaration?',
                answers: ['var x = 5;', 'variable x = 5;', 'int x = 5;', 'x := 5;'],
                correct: 0
            },
            {
                question: 'What does "if" do in programming?',
                answers: ['Creates a loop', 'Makes a decision', 'Defines a function', 'Imports a library'],
                correct: 1
            },
            {
                question: 'What is a function?',
                answers: ['A type of variable', 'A reusable block of code', 'A data type', 'An error'],
                correct: 1
            },
            {
                question: 'What does IDE stand for?',
                answers: ['Integrated Development Environment', 'Internet Development Engine', 'Interactive Design Editor', 'Internal Data Explorer'],
                correct: 0
            }
        ]
    }
};

let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// Start quiz
function startQuiz(quizType) {
    currentQuiz = quizzes[quizType];
    currentQuestionIndex = 0;
    score = 0;
    
    document.getElementById('quizSelection').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizTitle').textContent = currentQuiz.title;
    document.getElementById('totalQuestions').textContent = currentQuiz.questions.length;
    
    loadQuestion();
}

// Load current question
function loadQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    selectedAnswer = null;
    
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('questionText').textContent = question.question;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    document.getElementById('quizProgress').style.width = progress + '%';
    
    // Create answer buttons
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;
        btn.onclick = () => selectAnswer(index);
        answersContainer.appendChild(btn);
    });
    
    // Update next button
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = true;
    nextBtn.textContent = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'See Results →' : 'Next Question →';
}

// Select answer
function selectAnswer(index) {
    if (selectedAnswer !== null) return; // Already answered
    
    selectedAnswer = index;
    const question = currentQuiz.questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.answer-btn');
    
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === question.correct) {
            btn.classList.add('correct');
        } else if (i === selectedAnswer) {
            btn.classList.add('incorrect');
        }
    });
    
    if (selectedAnswer === question.correct) {
        score++;
    }
    
    document.getElementById('nextBtn').disabled = false;
}

// Next question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuiz.questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show results
function showResults() {
    const totalQuestions = currentQuiz.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultsContainer').style.display = 'block';
    
    document.getElementById('scorePercentage').textContent = percentage;
    document.getElementById('correctAnswers').textContent = score;
    document.getElementById('totalQuestionsResult').textContent = totalQuestions;
    
    // Calculate coins
    let coinsEarned = 100; // Base
    if (percentage === 100) {
        coinsEarned += 50; // Perfect score bonus
    } else if (percentage >= 80) {
        coinsEarned += 25; // Good score bonus
    }
    
    document.getElementById('coinsEarned').textContent = coinsEarned;
    
    // Save progress
    window.tutoringApp.completeQuiz('quiz', score, totalQuestions, coinsEarned);
}
