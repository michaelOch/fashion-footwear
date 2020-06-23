let signupbtn = document.getElementById("signupbtn");
let loginbtn = document.getElementById("loginbtn");

let div1 = document.getElementById("signup-form");
let div2 = document.getElementById("login-form");

loginbtn.style.borderBottom = "2px solid black";
loginbtn.style.color = "black";

signupbtn.addEventListener('click', displayText);

loginbtn.addEventListener('click', swapDisplay);

function displayText() {
  console.log("I am here");
  if(div1.style.display = "none") {
    console.log("Where exactly?");
    signupbtn.style.color = "black";
    signupbtn.style.borderBottom = "2px solid black";
    div1.style.display = "block";
    div2.style.display = "none";
    loginbtn.style.color="#A49E9E";
    loginbtn.style.borderBottom ="none";
  }
}

function swapDisplay() {
  console.log("You are here");
  if(div2.style.display = "none") {
    console.log("Where are you exactly?");
    loginbtn.style.color = "black";
    loginbtn.style.borderBottom = "2px solid black";
    div2.style.display = "block";
    div1.style.display = "none";
    signupbtn.style.color="#A49E9E";
    signupbtn.style.borderBottom ="none";
  }
}
