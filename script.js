// script.js
function generate() {
  let dictionary = "";
  if (document.getElementById("lowercaseCb").checked) {
    dictionary += "qwertyuiopasdfghjklzxcvbnm";
  }
  if (document.getElementById("uppercaseCb").checked) {
    dictionary += "QWERTYUIOPASDFGHJKLZXCVBNM";
  }
  if (document.getElementById("digitsCb").checked) {
    dictionary += "1234567890";
  }
  if (document.getElementById("specialsCb").checked) {
    dictionary += "!@#$%^&*()_+-={}[];<>:";
  }
  const length = document.querySelector('input[type="range"]').value;

  if (length < 1 || dictionary.length === 0) {
    document.querySelector('input[type="text"]').value = "";
    updateStrength(""); // Clear strength message
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const pos = Math.floor(Math.random() * dictionary.length);
    password += dictionary[pos];
  }

  document.querySelector('input[type="text"]').value = password;
  updateStrength(password); // Update strength message
}

function updateStrength(password) {
  let strength = "Weak"; // Default to weak
  const lengthCriteria = password.length >= 12;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-={}[\];:<>,.]/.test(password);

  if (lengthCriteria && hasUpper && hasLower && hasDigit && hasSpecial) {
    strength = "Strong";
  } else if (
    password.length >= 8 &&
    ((hasUpper && hasLower) || (hasDigit && hasLower) || (hasDigit && hasUpper))
  ) {
    strength = "Medium";
  }

  const commentElement = document.getElementById("comment");
  commentElement.textContent = strength + " Password";
  commentElement.style.color =
    strength === "Strong" ? "green" : strength === "Medium" ? "orange" : "red";
}

[
  ...document.querySelectorAll('input[type="checkbox"], button.generate'),
].forEach((elem) => {
  elem.addEventListener("click", generate);
});

document.querySelector('input[type="range"]').addEventListener("input", (e) => {
  document.querySelector("div.range span").innerHTML = e.target.value;
  generate();
});

document.querySelector("div.password button").addEventListener("click", () => {
  const pass = document.querySelector('input[type="text"]').value;
  navigator.clipboard.writeText(pass).then(() => {
    document.querySelector("div.password button").innerHTML = "copied!";
    setTimeout(() => {
      document.querySelector("div.password button").innerHTML = "copy";
    }, 1000);
  });
});

generate();
