// Update wallet display
function updateWallet() {
    const userData = window.tutoringApp.getUserData();
    document.getElementById('walletCoins').textContent = `${userData.coins} Coins`;
    
    // Update purchased items
    updatePurchasedItems();
}

// Update purchased items display
function updatePurchasedItems() {
    const userData = window.tutoringApp.getUserData();
    
    userData.purchasedItems.forEach(item => {
        const itemElement = document.getElementById(`item-${item.id}`);
        if (itemElement) {
            itemElement.classList.add('purchased');
            const btn = itemElement.querySelector('.buy-btn');
            if (btn) {
                btn.disabled = true;
                btn.textContent = '✓ Owned';
                btn.classList.add('purchased-btn');
            }
        }
    });
}

// Purchase item
function purchaseItem(itemId, cost, itemName) {
    const success = window.tutoringApp.purchaseItem(itemId, cost);
    
    if (success) {
        // Update display
        const itemElement = document.getElementById(`item-${itemId}`);
        if (itemElement) {
            itemElement.classList.add('purchased');
            const btn = itemElement.querySelector('.buy-btn');
            if (btn) {
                btn.disabled = true;
                btn.textContent = '✓ Owned';
                btn.classList.add('purchased-btn');
            }
        }
        
        // Show success message
        showPurchaseSuccess(itemName);
        
        // Update wallet
        updateWallet();
    }
}

// Show purchase success notification
function showPurchaseSuccess(itemName) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00b09b, #96c93d);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        font-weight: bold;
        font-size: 1.1rem;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-size: 2rem;">✓</span>
            <div>
                <div>Purchase Successful!</div>
                <div style="font-size: 0.9rem; opacity: 0.9;">${itemName}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize shop on page load
document.addEventListener('DOMContentLoaded', () => {
    updateWallet();
});
