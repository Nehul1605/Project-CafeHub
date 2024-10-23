const isLoggedIn = localStorage.getItem("isLoggedIn");

 document.getElementById("signInBtn").addEventListener("click", function () {
     if (!isLoggedIn || isLoggedIn !== "true") {
         window.open('signIn.html', '_blank');
     }
 });

 document.getElementById("menuLink").addEventListener("click", function (event) {
     if (!isLoggedIn || isLoggedIn !== "true") {
         event.preventDefault();
         window.open('signIn.html', '_blank'); 
     } else {
         window.location.href = 'menu.html'; 
     }
 });

 document.getElementById("signInBtn").addEventListener("click", function () {
     window.open('signIn.html', '_blank'); 
 });