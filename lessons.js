// Lesson content database
const lessons = {
    math: [
        {
            id: 'math-1',
            title: 'Quadratic Equations',
            content: `
                <div class="lesson-section">
                    <h3>What is a Quadratic Equation?</h3>
                    <p>A quadratic equation is a polynomial equation of degree 2. The standard form is:</p>
                    <div class="code-block">
                        <code>ax² + bx + c = 0</code>
                    </div>
                    <p>where a, b, and c are constants and a ≠ 0.</p>
                </div>
                
                <div class="lesson-section">
                    <h3>The Quadratic Formula</h3>
                    <p>To solve for x, we use the quadratic formula:</p>
                    <div class="code-block">
                        <code>x = (-b ± √(b² - 4ac)) / 2a</code>
                    </div>
                </div>
                
                <div class="lesson-section">
                    <h3>Example</h3>
                    <div class="example-box">
                        <p><strong>Solve: x² + 5x + 6 = 0</strong></p>
                        <p>Here, a = 1, b = 5, c = 6</p>
                        <p>x = (-5 ± √(25 - 24)) / 2</p>
                        <p>x = (-5 ± 1) / 2</p>
                        <p><strong>Solutions: x = -2 or x = -3</strong></p>
                    </div>
                </div>
            `
        },
        {
            id: 'math-2',
            title: 'Trigonometry Basics',
            content: `
                <div class="lesson-section">
                    <h3>The Three Main Ratios</h3>
                    <ul>
                        <li><strong>Sine (sin)</strong> = Opposite / Hypotenuse</li>
                        <li><strong>Cosine (cos)</strong> = Adjacent / Hypotenuse</li>
                        <li><strong>Tangent (tan)</strong> = Opposite / Adjacent</li>
                    </ul>
                </div>
                
                <div class="lesson-section">
                    <h3>SOH-CAH-TOA</h3>
                    <p>This mnemonic helps you remember the ratios:</p>
                    <ul>
                        <li><strong>S</strong>ine = <strong>O</strong>pposite / <strong>H</strong>ypotenuse</li>
                        <li><strong>C</strong>osine = <strong>A</strong>djacent / <strong>H</strong>ypotenuse</li>
                        <li><strong>T</strong>angent = <strong>O</strong>pposite / <strong>A</strong>djacent</li>
                    </ul>
                </div>
                
                <div class="lesson-section">
                    <h3>Common Angles</h3>
                    <div class="example-box">
                        <p>sin(30°) = 1/2</p>
                        <p>cos(60°) = 1/2</p>
                        <p>tan(45°) = 1</p>
                    </div>
                </div>
            `
        }
    ],
    science: [
        {
            id: 'science-1',
            title: 'Newton\'s Laws of Motion',
            content: `
                <div class="lesson-section">
                    <h3>The Three Laws</h3>
                    <ol>
                        <li><strong>First Law (Inertia):</strong> An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.</li>
                        <li><strong>Second Law (F=ma):</strong> Force equals mass times acceleration.</li>
                        <li><strong>Third Law (Action-Reaction):</strong> For every action, there is an equal and opposite reaction.</li>
                    </ol>
                </div>
                
                <div class="lesson-section">
                    <h3>Second Law in Detail</h3>
                    <div class="code-block">
                        <code>F = ma</code>
                    </div>
                    <p>Where:</p>
                    <ul>
                        <li>F = Force (Newtons)</li>
                        <li>m = mass (kilograms)</li>
                        <li>a = acceleration (m/s²)</li>
                    </ul>
                </div>
                
                <div class="lesson-section">
                    <h3>Real World Example</h3>
                    <div class="example-box">
                        <p><strong>Question:</strong> A 10 kg object accelerates at 5 m/s². What force is applied?</p>
                        <p><strong>Solution:</strong> F = ma = 10 × 5 = 50 Newtons</p>
                    </div>
                </div>
            `
        },
        {
            id: 'science-2',
            title: 'Chemical Bonding',
            content: `
                <div class="lesson-section">
                    <h3>Types of Chemical Bonds</h3>
                    <ul>
                        <li><strong>Ionic Bonds:</strong> Transfer of electrons between atoms (metal + nonmetal)</li>
                        <li><strong>Covalent Bonds:</strong> Sharing of electrons between atoms (nonmetal + nonmetal)</li>
                        <li><strong>Metallic Bonds:</strong> Sea of electrons shared among metal atoms</li>
                    </ul>
                </div>
                
                <div class="lesson-section">
                    <h3>Ionic Bonding Example</h3>
                    <div class="example-box">
                        <p><strong>NaCl (Table Salt)</strong></p>
                        <p>Sodium (Na) loses 1 electron → Na⁺</p>
                        <p>Chlorine (Cl) gains 1 electron → Cl⁻</p>
                        <p>They attract each other to form NaCl</p>
                    </div>
                </div>
                
                <div class="lesson-section">
                    <h3>Covalent Bonding Example</h3>
                    <div class="example-box">
                        <p><strong>H₂O (Water)</strong></p>
                        <p>Two hydrogen atoms share electrons with one oxygen atom</p>
                        <p>Forms H-O-H molecule</p>
                    </div>
                </div>
            `
        }
    ],
    programming: [
        {
            id: 'prog-1',
            title: 'JavaScript Basics',
            content: `
                <div class="lesson-section">
                    <h3>Variables and Data Types</h3>
                    <div class="code-block">
                        <code>
let name = "Jo";           // String<br>
let age = 17;              // Number<br>
let isStudent = true;      // Boolean<br>
let hobbies = ["coding", "gaming"];  // Array
                        </code>
                    </div>
                </div>
                
                <div class="lesson-section">
                    <h3>Functions</h3>
                    <div class="code-block">
                        <code>
function greet(name) {<br>
&nbsp;&nbsp;return "Hello, " + name + "!";<br>
}<br>
<br>
console.log(greet("Jo")); // "Hello, Jo!"
                        </code>
                    </div>
                </div>
                
                <div class="lesson-section">
                    <h3>Loops</h3>
                    <div class="code-block">
                        <code>
for (let i = 0; i < 5; i++) {<br>
&nbsp;&nbsp;console.log(i);<br>
}
                        </code>
                    </div>
                </div>
            `
        },
        {
            id: 'prog-2',
            title: 'Python Fundamentals',
            content: `
                <div class="lesson-section">
                    <h3>Python Syntax</h3>
                    <p>Python is known for its clean, readable syntax:</p>
                    <div class="code-block">
                        <code>
# Variables<br>
name = "Jo"<br>
age = 17<br>
<br>
# Print statement<br>
print(f"Hello, {name}!")<br>
<br>
# Lists<br>
games = ["Snake", "Pong", "Flappy Bird"]
                        </code>
                    </div>
                </div>
                
                <div class="lesson-section">
                    <h3>Functions in Python</h3>
                    <div class="code-block">
                        <code>
def calculate_coins(sessions):<br>
&nbsp;&nbsp;&nbsp;&nbsp;coins_per_session = 50<br>
&nbsp;&nbsp;&nbsp;&nbsp;total = sessions * coins_per_session<br>
&nbsp;&nbsp;&nbsp;&nbsp;return total<br>
<br>
print(calculate_coins(10))  # Output: 500
                        </code>
                    </div>
                </div>
            `
        }
    ],
    gamedev: [
        {
            id: 'gamedev-1',
            title: 'Game Design Principles',
            content: `
                <div class="lesson-section">
                    <h3>Core Game Design Elements</h3>
                    <ul>
                        <li><strong>Mechanics:</strong> The rules and systems that make the game work</li>
                        <li><strong>Dynamics:</strong> How the mechanics create gameplay</li>
                        <li><strong>Aesthetics:</strong> The emotional response from players</li>
                    </ul>
                </div>
                
                <div class="lesson-section">
                    <h3>The Game Loop</h3>
                    <div class="code-block">
                        <code>
while (gameRunning) {<br>
&nbsp;&nbsp;// 1. Handle Input<br>
&nbsp;&nbsp;processInput();<br>
&nbsp;&nbsp;<br>
&nbsp;&nbsp;// 2. Update Game State<br>
&nbsp;&nbsp;update();<br>
&nbsp;&nbsp;<br>
&nbsp;&nbsp;// 3. Render Graphics<br>
&nbsp;&nbsp;render();<br>
}
                        </code>
                    </div>
                </div>
                
                <div class="lesson-section">
                    <h3>Making Games Fun</h3>
                    <div class="example-box">
                        <p><strong>Key Principles:</strong></p>
                        <ul>
                            <li>Clear goals and feedback</li>
                            <li>Balanced challenge (not too easy, not too hard)</li>
                            <li>Meaningful player choices</li>
                            <li>Progression and rewards</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: 'gamedev-2',
            title: 'Collision Detection',
            content: `
                <div class="lesson-section">
                    <h3>Rectangle Collision (AABB)</h3>
                    <p>Axis-Aligned Bounding Box collision is simple and fast:</p>
                    <div class="code-block">
                        <code>
function checkCollision(rect1, rect2) {<br>
&nbsp;&nbsp;return rect1.x < rect2.x + rect2.width &&<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rect1.x + rect1.width > rect2.x &&<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rect1.y < rect2.y + rect2.height &&<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rect1.y + rect1.height > rect2.y;<br>
}
                        </code>
                    </div>
                </div>
                
                <div class="lesson-section">
                    <h3>Circle Collision</h3>
                    <div class="code-block">
                        <code>
function circleCollision(c1, c2) {<br>
&nbsp;&nbsp;let dx = c1.x - c2.x;<br>
&nbsp;&nbsp;let dy = c1.y - c2.y;<br>
&nbsp;&nbsp;let distance = Math.sqrt(dx*dx + dy*dy);<br>
&nbsp;&nbsp;return distance < c1.radius + c2.radius;<br>
}
                        </code>
                    </div>
                </div>
            `
        }
    ]
};

let currentSubject = '';
let currentLessonId = '';

// Show subject's lessons
function showSubject(subject) {
    currentSubject = subject;
    const modal = document.getElementById('lessonModal');
    const content = document.getElementById('lessonContent');
    const title = document.getElementById('lessonTitle');
    
    title.textContent = getSubjectName(subject);
    
    let html = '<div class="lesson-list">';
    lessons[subject].forEach(lesson => {
        html += `
            <div class="lesson-item" onclick="loadLesson('${lesson.id}')">
                <div class="lesson-item-title">${lesson.title}</div>
                <div class="lesson-item-reward">+50 Coins 🪙</div>
            </div>
        `;
    });
    html += '</div>';
    
    content.innerHTML = html;
    document.querySelector('.complete-btn').style.display = 'none';
    modal.style.display = 'block';
}

// Load specific lesson
function loadLesson(lessonId) {
    currentLessonId = lessonId;
    const lesson = findLesson(lessonId);
    
    if (lesson) {
        document.getElementById('lessonTitle').textContent = lesson.title;
        document.getElementById('lessonContent').innerHTML = lesson.content;
        document.querySelector('.complete-btn').style.display = 'block';
    }
}

// Find lesson by ID
function findLesson(lessonId) {
    for (let subject in lessons) {
        const lesson = lessons[subject].find(l => l.id === lessonId);
        if (lesson) return lesson;
    }
    return null;
}

// Complete lesson button
function completeLessonBtn() {
    if (currentLessonId) {
        const lesson = findLesson(currentLessonId);
        window.tutoringApp.completeLesson(currentSubject, lesson.title, 50);
        
        // Disable button
        const btn = document.querySelector('.complete-btn');
        btn.disabled = true;
        btn.textContent = '✓ Lesson Completed!';
        
        // Update progress
        updateProgress();
        
        setTimeout(() => {
            closeLesson();
        }, 2000);
    }
}

// Close lesson modal
function closeLesson() {
    document.getElementById('lessonModal').style.display = 'none';
    currentLessonId = '';
}

// Get subject display name
function getSubjectName(subject) {
    const names = {
        math: 'Mathematics',
        science: 'Science',
        programming: 'Programming',
        gamedev: 'Game Development'
    };
    return names[subject] || subject;
}

// Update progress displays
function updateProgress() {
    const data = window.tutoringApp.getUserData();
    
    for (let subject in lessons) {
        const progress = data.progress[subject] || 0;
        const totalLessons = lessons[subject].length;
        const percentage = (progress / totalLessons) * 100;
        
        const progressBar = document.getElementById(`progress-${subject}`);
        const lessonsText = document.getElementById(`lessons-${subject}`);
        
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
        
        if (lessonsText) {
            lessonsText.textContent = `${progress}/${totalLessons} lessons`;
        }
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('lessonModal');
    if (event.target == modal) {
        closeLesson();
    }
}

// Initialize progress on page load
document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
});
