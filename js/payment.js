const totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 500;
document.getElementById('total-amount').innerText = totalAmount;
document.getElementById('total-amount-qr').innerText = totalAmount;

const paymentUrl = `https://example.com/pay?amount=${totalAmount}`;  // Example payment URL

const qrcode = new QRCode(document.getElementById('qrcode'), {
    text: paymentUrl,
    width: 256,
    height: 256
});

let timeLeft = 300;
const timeLeftDisplay = document.getElementById('time-left');

function updateTimer() {
    if (timeLeft >= 0) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeLeftDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeLeft--;
    } else {
        clearInterval(countdownTimer);
        showOrderConfirmation("Your order is placed!");
    }
}

const countdownTimer = setInterval(updateTimer, 1000);

function checkPaymentCompletion() {
    setTimeout(() => {
        clearInterval(countdownTimer);
        showOrderConfirmation();
    }, 10000);  // Stop the timer after 10 seconds
}

document.getElementById('pay-now').addEventListener('click', () => {
    document.getElementById('checkout-options').style.display = 'none';
    document.getElementById('qr-container').style.display = 'block';
    checkPaymentCompletion();
});

document.getElementById('pay-later').addEventListener('click', () => {
    document.getElementById('checkout-options').style.display = 'none';
    showOrderConfirmation("You selected Pay Later. Your order is placed!");
});

function showOrderConfirmation(message = "Your payment is completed!") {
    document.querySelector('#order-confirmation h2').innerText = message;
    document.getElementById('qr-container').style.display = 'none';
    document.getElementById('order-confirmation').style.display = 'block';
}

document.getElementById("self-pickup").addEventListener("click", function () {
    
    alert("You have selected Self Pick-Up.");
    
    window.location.href = "/self-pickup.html"; 
});

document.getElementById('delivery').addEventListener('click', () => {
    window.location.href = "/delivery.html"; 
    
});
