// Achievement definitions
const achievementDefs = {
    firstLesson: { icon: '📖', name: 'First Steps', desc: 'Complete your first lesson', coins: 100 },
    tenLessons: { icon: '🎓', name: 'Dedicated Learner', desc: 'Complete 10 lessons', coins: 250 },
    firstQuiz: { icon: '🎯', name: 'Quiz Master Beginner', desc: 'Complete your first quiz', coins: 100 },
    tenQuizzes: { icon: '🏅', name: 'Quiz Champion', desc: 'Complete 10 quizzes', coins: 300 },
    firstGame: { icon: '🎮', name: 'Fun Learner', desc: 'Play your first learning game', coins: 50 },
    richStudent: { icon: '💰', name: 'Coin Collector', desc: 'Earn 1000 coins', coins: 500 },
    superRich: { icon: '💎', name: 'Crypto Learner', desc: 'Earn 5000 coins', coins: 1000 },
    weekStreak: { icon: '🔥', name: '7 Day Streak', desc: 'Visit 7 days in a row', coins: 500 }
};

// Update dashboard on load
function updateDashboard() {
    const userData = window.tutoringApp.getUserData();
    
    // Update stats
    document.getElementById('totalCoins').textContent = userData.coins;
    document.getElementById('totalLessons').textContent = userData.lessonsCompleted;
    document.getElementById('totalQuizzes').textContent = userData.quizzesCompleted;
    document.getElementById('totalGames').textContent = userData.gamesPlayed;
    document.getElementById('streakDays').textContent = userData.streakDays;
    document.getElementById('achievementCount').textContent = userData.achievements.length;
    
    // Update subject progress
    updateSubjectProgress(userData);
    
    // Update achievements
    updateAchievements(userData);
}

// Update subject progress bars
function updateSubjectProgress(userData) {
    const subjects = ['math', 'science', 'programming', 'gamedev'];
    const maxLessons = { math: 2, science: 2, programming: 2, gamedev: 2 }; // Match lesson count
    
    subjects.forEach(subject => {
        const completed = userData.progress[subject] || 0;
        const total = maxLessons[subject];
        const percentage = (completed / total) * 100;
        
        const progressBar = document.getElementById(`${subject}-progress`);
        const progressText = document.getElementById(`${subject}-text`);
        
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
        
        if (progressText) {
            progressText.textContent = `${completed}/${total} lessons`;
        }
    });
}

// Update achievements display
function updateAchievements(userData) {
    const container = document.getElementById('achievementsContainer');
    container.innerHTML = '';
    
    for (let key in achievementDefs) {
        const achievement = achievementDefs[key];
        const isUnlocked = userData.achievements.includes(key);
        
        const card = document.createElement('div');
        card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        
        card.innerHTML = `
            <div class="achievement-icon">${isUnlocked ? achievement.icon : '🔒'}</div>
            <div class="achievement-info">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.desc}</div>
            </div>
            <div class="achievement-reward">+${achievement.coins} 🪙</div>
        `;
        
        container.appendChild(card);
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', updateDashboard);
