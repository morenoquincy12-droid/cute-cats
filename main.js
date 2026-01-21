// Game State
let gameState = {
    screen: 'welcome', // 'welcome', 'grooming', 'result'
    money: 50,
    currentCat: null,
    groomingProgress: {
        bathed: false,
        brushed: false,
        fed: false,
        nailsTrimmed: false
    },
    happiness: 50,
    scratches: 0,
    feedback: ''
};

// Cat Data
const catBreeds = [
    {
        name: 'Whiskers',
        breed: 'Persian',
        problem: 'Has fleas and matted fur 🦟',
        needs: ['bathed', 'brushed'],
        personality: 'Grumpy but sweet',
        emoji: '😾'
    },
    {
        name: 'Mittens',
        breed: 'Siamese',
        problem: 'Very stinky and hungry 🤢',
        needs: ['bathed', 'fed'],
        personality: 'Vocal and demanding',
        emoji: '😸'
    },
    {
        name: 'Shadow',
        breed: 'Black Cat',
        problem: 'Dirty paws and long nails 🐾',
        needs: ['bathed', 'nailsTrimmed'],
        personality: 'Shy and gentle',
        emoji: '😺'
    },
    {
        name: 'Pumpkin',
        breed: 'Orange Tabby',
        problem: 'Covered in mud and hasn\'t eaten 🍂',
        needs: ['bathed', 'brushed', 'fed'],
        personality: 'Playful and energetic',
        emoji: '😻'
    },
    {
        name: 'Luna',
        breed: 'Russian Blue',
        problem: 'Tangled fur and overgrown claws ✂️',
        needs: ['brushed', 'nailsTrimmed'],
        personality: 'Elegant and picky',
        emoji: '😽'
    },
    {
        name: 'Simba',
        breed: 'Maine Coon',
        problem: 'Very dirty and starving 😿',
        needs: ['bathed', 'brushed', 'fed', 'nailsTrimmed'],
        personality: 'Big and friendly',
        emoji: '😺'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    render();
});

// Main Render
function render() {
    const app = document.getElementById('app');
    
    if (gameState.screen === 'welcome') {
        app.innerHTML = renderWelcome();
    } else if (gameState.screen === 'grooming') {
        app.innerHTML = renderGrooming();
    } else if (gameState.screen === 'result') {
        app.innerHTML = renderResult();
    }
}

// Welcome Screen
function renderWelcome() {
    return `
        <div class="container">
            <div class="welcome-screen">
                <div class="cat-emoji">🐱</div>
                <h1>Purrfect Paws</h1>
                <p class="subtitle">Pet Grooming Salon</p>
                
                <div class="info-box">
                    <h2>Welcome, Groomer! 🌸</h2>
                    <p>Help dirty kitties become clean and happy! Each cat needs special care based on their problem.</p>
                    
                    <div class="tools-list">
                        <p class="tool-title">Your Grooming Tools:</p>
                        <p>🛁 Bath - Removes dirt and fleas</p>
                        <p>✨ Brush - Detangles matted fur</p>
                        <p>🐟 Feed - Makes hungry cats happy</p>
                        <p>✂️ Trim Nails - Cuts overgrown claws</p>
                    </div>
                </div>

                <div class="money-display">
                    <span class="money-icon">💰</span>
                    <span>$${gameState.money}</span>
                </div>

                <button class="btn-start" onclick="startNewCustomer()">
                    🐾 Start Grooming!
                </button>
            </div>
        </div>
    `;
}

// Grooming Screen
function renderGrooming() {
    const cat = gameState.currentCat;
    const allNeeds = cat.needs.every(need => gameState.groomingProgress[need]);
    const isDirty = !allNeeds;
    
    return `
        <div class="container">
            <div class="game-screen">
                <div class="game-header">
                    <div class="cat-info">
                        <div class="cat-name">${cat.name}</div>
                        <div class="cat-breed">${cat.breed}</div>
                        <div class="cat-problem">${cat.problem}</div>
                    </div>
                    <div class="game-stats">
                        <div class="stat">
                            <div class="stat-label">Money</div>
                            <div class="stat-value">💰 $${gameState.money}</div>
                        </div>
                    </div>
                </div>

                <div class="cat-display">
                    <div class="cat-visual ${isDirty ? 'dirty' : 'clean'}">
                        <span style="font-size: 120px;">${cat.emoji}</span>
                        ${!isDirty ? '<div class="sparkles">✨</div>' : ''}
                    </div>
                </div>

                <div class="happiness-bar">
                    <div class="happiness-label">Cat Happiness: ${gameState.happiness}%</div>
                    <div class="bar-container">
                        <div class="bar-fill" style="width: ${gameState.happiness}%">
                            ${gameState.happiness >= 70 ? '😊' : gameState.happiness >= 40 ? '😐' : '😿'}
                        </div>
                    </div>
                </div>

                <div class="grooming-actions">
                    <button class="action-btn ${gameState.groomingProgress.bathed ? 'completed' : ''}" onclick="performAction('bathed')">
                        <span class="action-icon">🛁</span>
                        <div>Give Bath</div>
                    </button>
                    <button class="action-btn ${gameState.groomingProgress.brushed ? 'completed' : ''}" onclick="performAction('brushed')">
                        <span class="action-icon">✨</span>
                        <div>Brush Fur</div>
                    </button>
                    <button class="action-btn ${gameState.groomingProgress.fed ? 'completed' : ''}" onclick="performAction('fed')">
                        <span class="action-icon">🐟</span>
                        <div>Feed Treats</div>
                    </button>
                    <button class="action-btn ${gameState.groomingProgress.nailsTrimmed ? 'completed' : ''}" onclick="performAction('nailsTrimmed')">
                        <span class="action-icon">✂️</span>
                        <div>Trim Nails</div>
                    </button>
                </div>

                <div class="feedback-message">
                    ${gameState.feedback || 'Choose a grooming action!'}
                </div>

                <button class="finish-btn" onclick="finishGrooming()">
                    ✅ Finish Grooming
                </button>
            </div>
        </div>
    `;
}

// Result Screen
function renderResult() {
    return `
        <div class="container">
            <div class="result-screen">
                <div class="result-emoji">${gameState.resultEmoji}</div>
                <h2 class="result-title">${gameState.resultTitle}</h2>
                <p class="result-message">${gameState.resultMessage}</p>
                
                ${gameState.earned ? `<div class="earnings">💰 Earned: $${gameState.earned}</div>` : ''}
                ${gameState.gotScratched ? `<div class="scratch-message">😿 ${gameState.currentCat.name} scratched you!</div>` : ''}
                
                <div class="money-display">
                    <span class="money-icon">💰</span>
                    <span>Total: $${gameState.money}</span>
                </div>

                <button class="btn-next" onclick="startNewCustomer()">
                    🐾 Next Customer
                </button>
                <button class="btn-next" onclick="backToWelcome()">
                    🏠 Main Menu
                </button>
            </div>
        </div>
    `;
}

// Game Functions
function startNewCustomer() {
    const randomCat = catBreeds[Math.floor(Math.random() * catBreeds.length)];
    gameState.currentCat = randomCat;
    gameState.groomingProgress = {
        bathed: false,
        brushed: false,
        fed: false,
        nailsTrimmed: false
    };
    gameState.happiness = 50;
    gameState.feedback = '';
    gameState.screen = 'grooming';
    render();
}

function performAction(action) {
    const cat = gameState.currentCat;
    
    // If already done
    if (gameState.groomingProgress[action]) {
        gameState.happiness = Math.max(0, gameState.happiness - 15);
        gameState.feedback = `${cat.name} doesn't need that again! 😾`;
        render();
        return;
    }

    // Perform action
    gameState.groomingProgress[action] = true;
    gameState.happiness = Math.min(100, gameState.happiness + 25);
    
    const messages = {
        bathed: `${cat.name} is now sparkling clean! 🛁✨`,
        brushed: `${cat.name}'s fur is silky smooth! 🌟`,
        fed: `${cat.name} is purring with satisfaction! 😻`,
        nailsTrimmed: `${cat.name}'s claws are perfectly trimmed! ✂️`
    };
    
    gameState.feedback = messages[action];
    render();
}

function finishGrooming() {
    const cat = gameState.currentCat;
    const needed = cat.needs;
    const completed = needed.filter(need => gameState.groomingProgress[need]);
    const quality = (completed.length / needed.length) * 100;

    if (quality === 100) {
        // Perfect job!
        const earned = 30 + Math.floor(Math.random() * 20);
        gameState.money += earned;
        gameState.earned = earned;
        gameState.gotScratched = false;
        gameState.resultEmoji = '🌟';
        gameState.resultTitle = 'Perfect Job!';
        gameState.resultMessage = `${cat.name} looks amazing! The owner is thrilled!`;
    } else if (quality >= 50) {
        // Good job
        const earned = 15;
        gameState.money += earned;
        gameState.earned = earned;
        gameState.gotScratched = false;
        gameState.resultEmoji = '👍';
        gameState.resultTitle = 'Good Effort!';
        gameState.resultMessage = `${cat.name} looks better, but could use more care.`;
    } else {
        // Bad job - cat scratches!
        gameState.scratches += 1;
        gameState.earned = 0;
        gameState.gotScratched = true;
        gameState.resultEmoji = '😿';
        gameState.resultTitle = 'Oh No!';
        gameState.resultMessage = `${cat.name} wasn't happy with the grooming...`;
    }
    
    gameState.screen = 'result';
    render();
}

function backToWelcome() {
    gameState.screen = 'welcome';
    render();
}
