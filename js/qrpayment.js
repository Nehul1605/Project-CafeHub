
const totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 500; 
document.getElementById('total-amount').innerText = totalAmount;


const paymentUrl = `https://example.com/pay?amount=${totalAmount}`;  


const qrcode = new QRCode(document.getElementById('qrcode'), {
    text: paymentUrl, 
    width: 256,       
    height: 256
});

let timeLeft = 300;  // 5 minutes = 300 seconds
const timeLeftDisplay = document.getElementById('time-left');

function updateTimer() {
    if (timeLeft >= 0) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

       
        timeLeftDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

       
        timeLeft--;

    } else {
     
        clearInterval(countdownTimer);
        showOrderConfirmation();
    }
}


const countdownTimer = setInterval(updateTimer, 1000);


function checkPaymentCompletion() {

    setTimeout(() => {

        clearInterval(countdownTimer);

        showOrderConfirmation();
    }, 10000); 
}


function showOrderConfirmation() {
    
    document.querySelector('.qr-container h1').innerText = "Payment Successful!";
    
    
    document.getElementById('qrcode').style.display = 'none';


    timeLeftDisplay.style.display = 'none';  

  
    document.getElementById('order-confirmation').style.display = 'block';
}




document.getElementById('delivery').addEventListener('click', () => {
    window.open('delivery.html', '_blank');
    
});

document.getElementById("self-pickup").addEventListener("click", function () {
    
    alert("You have selected Self Pick-Up.");
    
    window.location.href = "/self-pickup.html"; 
});

checkPaymentCompletion();
