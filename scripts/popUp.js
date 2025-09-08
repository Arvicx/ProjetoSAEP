const loginBtn = document.getElementById('login');
const loginPopUp = document.getElementById('loginPop');
const closePop = document.getElementById('closePop');

loginBtn.addEventListener("click", ()=>{
    loginPopUp.style.display = "flex";
});

closePop.addEventListener("click", (event)=>{
    event.preventDefault();
    loginPopUp.style.display = "none";
});

const formLogin = document.getElementById("formLogin");
formLogin.addEventListener("submit", (event) =>{
    event.preventDefault();
    alert("Login Realizado!");
    loginPopUp.style.display = "none";
});