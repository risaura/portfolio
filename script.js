// Initialize user data from localStorage
let userData = {
    coins: 0,
    lessonsCompleted: 0,
    quizzesCompleted: 0,
    gamesPlayed: 0,
    achievements: [],
    progress: {
        math: 0,
        science: 0,
        programming: 0,
        gamedev: 0
    },
    purchasedItems: [],
    streakDays: 0,
    lastVisit: new Date().toDateString()
};

// Load data from localStorage
function loadUserData() {
    const saved = localStorage.getItem('tutoringUserData');
    if (saved) {
        userData = JSON.parse(saved);
        
        // Check streak
        const today = new Date().toDateString();
        const lastVisit = userData.lastVisit;
        
        if (lastVisit !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastVisit === yesterday.toDateString()) {
                userData.streakDays++;
                checkAchievement('streak');
            } else {
                userData.streakDays = 1;
            }
            
            userData.lastVisit = today;
            saveUserData();
        }
    } else {
        saveUserData();
    }
    
    updateUI();
}

// Save data to localStorage
function saveUserData() {
    localStorage.setItem('tutoringUserData', JSON.stringify(userData));
}

// Update UI elements
function updateUI() {
    const navCoins = document.getElementById('nav-coins');
    const heroCoins = document.getElementById('hero-coins');
    const heroLessons = document.getElementById('hero-lessons');
    const heroAchievements = document.getElementById('hero-achievements');
    
    if (navCoins) navCoins.textContent = userData.coins;
    if (heroCoins) heroCoins.textContent = userData.coins;
    if (heroLessons) heroLessons.textContent = userData.lessonsCompleted;
    if (heroAchievements) heroAchievements.textContent = userData.achievements.length;
}

// Add coins with animation
function addCoins(amount, reason = '') {
    userData.coins += amount;
    saveUserData();
    updateUI();
    
    // Show notification
    showNotification(`+${amount} coins! ${reason}`, 'success');
    
    // Check achievements
    checkAchievement('coins');
}

// Complete a lesson
function completeLesson(subject, lessonName, coinsEarned = 50) {
    userData.lessonsCompleted++;
    userData.progress[subject] = (userData.progress[subject] || 0) + 1;
    addCoins(coinsEarned, `Completed: ${lessonName}`);
    checkAchievement('lessons');
    saveUserData();
}

// Complete a quiz
function completeQuiz(subject, score, maxScore, coinsEarned = 100) {
    userData.quizzesCompleted++;
    const percentage = (score / maxScore) * 100;
    
    let bonus = 0;
    if (percentage === 100) {
        bonus = 50;
        showNotification('Perfect score! +50 bonus coins!', 'success');
    } else if (percentage >= 80) {
        bonus = 25;
        showNotification('Great job! +25 bonus coins!', 'success');
    }
    
    addCoins(coinsEarned + bonus, `Quiz completed: ${Math.round(percentage)}%`);
    checkAchievement('quizzes');
    saveUserData();
}

// Play a game
function playGame(gameName, coinsEarned = 25) {
    userData.gamesPlayed++;
    addCoins(coinsEarned, `Played: ${gameName}`);
    checkAchievement('games');
    saveUserData();
}

// Achievement System
const achievements = {
    firstLesson: { name: 'First Steps', desc: 'Complete your first lesson', coins: 100 },
    tenLessons: { name: 'Dedicated Learner', desc: 'Complete 10 lessons', coins: 250 },
    firstQuiz: { name: 'Quiz Master Beginner', desc: 'Complete your first quiz', coins: 100 },
    tenQuizzes: { name: 'Quiz Champion', desc: 'Complete 10 quizzes', coins: 300 },
    firstGame: { name: 'Fun Learner', desc: 'Play your first learning game', coins: 50 },
    richStudent: { name: 'Coin Collector', desc: 'Earn 1000 coins', coins: 500 },
    superRich: { name: 'Crypto Learner', desc: 'Earn 5000 coins', coins: 1000 },
    weekStreak: { name: '7 Day Streak', desc: 'Visit 7 days in a row', coins: 500 }
};

function checkAchievement(type) {
    let newAchievements = [];
    
    switch(type) {
        case 'lessons':
            if (userData.lessonsCompleted === 1 && !userData.achievements.includes('firstLesson')) {
                newAchievements.push('firstLesson');
            }
            if (userData.lessonsCompleted === 10 && !userData.achievements.includes('tenLessons')) {
                newAchievements.push('tenLessons');
            }
            break;
        case 'quizzes':
            if (userData.quizzesCompleted === 1 && !userData.achievements.includes('firstQuiz')) {
                newAchievements.push('firstQuiz');
            }
            if (userData.quizzesCompleted === 10 && !userData.achievements.includes('tenQuizzes')) {
                newAchievements.push('tenQuizzes');
            }
            break;
        case 'games':
            if (userData.gamesPlayed === 1 && !userData.achievements.includes('firstGame')) {
                newAchievements.push('firstGame');
            }
            break;
        case 'coins':
            if (userData.coins >= 1000 && !userData.achievements.includes('richStudent')) {
                newAchievements.push('richStudent');
            }
            if (userData.coins >= 5000 && !userData.achievements.includes('superRich')) {
                newAchievements.push('superRich');
            }
            break;
        case 'streak':
            if (userData.streakDays >= 7 && !userData.achievements.includes('weekStreak')) {
                newAchievements.push('weekStreak');
            }
            break;
    }
    
    newAchievements.forEach(ach => {
        userData.achievements.push(ach);
        const achievement = achievements[ach];
        userData.coins += achievement.coins;
        showNotification(`🏆 Achievement Unlocked: ${achievement.name}! +${achievement.coins} coins!`, 'achievement');
    });
    
    if (newAchievements.length > 0) {
        saveUserData();
        updateUI();
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00b09b, #96c93d)' : 
                      type === 'achievement' ? 'linear-gradient(135deg, #f093fb, #f5576c)' : 
                      'linear-gradient(135deg, #667eea, #764ba2)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        font-weight: bold;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Purchase item from shop
function purchaseItem(itemId, cost) {
    if (userData.coins >= cost) {
        userData.coins -= cost;
        userData.purchasedItems.push({
            id: itemId,
            purchasedAt: new Date().toISOString()
        });
        saveUserData();
        updateUI();
        showNotification('Purchase successful!', 'success');
        return true;
    } else {
        showNotification(`Not enough coins! Need ${cost - userData.coins} more.`, 'error');
        return false;
    }
}

// Check if item is purchased
function isPurchased(itemId) {
    return userData.purchasedItems.some(item => item.id === itemId);
}

// Reset all progress (for testing)
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
        localStorage.removeItem('tutoringUserData');
        location.reload();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadUserData);

// Export functions for use in other pages
window.tutoringApp = {
    addCoins,
    completeLesson,
    completeQuiz,
    playGame,
    purchaseItem,
    isPurchased,
    getUserData: () => userData,
    resetProgress
};
