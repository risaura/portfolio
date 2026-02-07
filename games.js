// Math Game Variables
let mathGameActive = false;
let mathTimeLeft = 60;
let mathScore = 0;
let mathTimer;
let currentAnswer;

// Start Math Game
function playMathGame() {
    document.getElementById('mathGameModal').style.display = 'block';
}

function closeMathGame() {
    stopMathGame();
    document.getElementById('mathGameModal').style.display = 'none';
}

function startMathGame() {
    mathGameActive = true;
    mathTimeLeft = 60;
    mathScore = 0;
    
    document.getElementById('mathScore').textContent = '0';
    document.getElementById('mathTimer').textContent = '60';
    document.getElementById('mathResults').style.display = 'none';
    document.getElementById('startMathBtn').style.display = 'none';
    document.getElementById('mathAnswer').value = '';
    
    generateMathProblem();
    
    mathTimer = setInterval(() => {
        mathTimeLeft--;
        document.getElementById('mathTimer').textContent = mathTimeLeft;
        
        if (mathTimeLeft <= 0) {
            endMathGame();
        }
    }, 1000);
}

function stopMathGame() {
    mathGameActive = false;
    clearInterval(mathTimer);
}

function generateMathProblem() {
    const operations = ['+', '-', '×'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    
    let problem, answer;
    
    switch(op) {
        case '+':
            problem = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case '-':
            // Make sure result is positive
            const [larger, smaller] = num1 > num2 ? [num1, num2] : [num2, num1];
            problem = `${larger} - ${smaller}`;
            answer = larger - smaller;
            break;
        case '×':
            problem = `${num1} × ${num2}`;
            answer = num1 * num2;
            break;
    }
    
    currentAnswer = answer;
    document.getElementById('mathProblem').textContent = problem;
    document.getElementById('mathAnswer').focus();
}

function submitMathAnswer() {
    if (!mathGameActive) return;
    
    const userAnswer = parseInt(document.getElementById('mathAnswer').value);
    
    if (userAnswer === currentAnswer) {
        mathScore++;
        document.getElementById('mathScore').textContent = mathScore;
        document.getElementById('mathAnswer').value = '';
        generateMathProblem();
    } else {
        // Shake animation for wrong answer
        const input = document.getElementById('mathAnswer');
        input.style.animation = 'shake 0.5s';
        setTimeout(() => input.style.animation = '', 500);
    }
}

// Allow Enter key to submit
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('mathAnswer');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitMathAnswer();
            }
        });
    }
});

function endMathGame() {
    stopMathGame();
    
    document.getElementById('finalMathScore').textContent = mathScore;
    document.getElementById('mathResults').style.display = 'block';
    document.getElementById('startMathBtn').style.display = 'block';
    document.getElementById('startMathBtn').textContent = 'Play Again';
    
    // Award coins
    window.tutoringApp.playGame('Math Challenge', 25);
}

// Other games (simplified - just award coins)
function playWordGame() {
    window.tutoringApp.playGame('Science Word Match', 25);
    showGameNotification();
}

function playCodeGame() {
    window.tutoringApp.playGame('Code Debug', 25);
    showGameNotification();
}

function playMemoryGame() {
    window.tutoringApp.playGame('Memory Master', 25);
    showGameNotification();
}

function showGameNotification() {
    const notification = document.getElementById('gameNotification');
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
