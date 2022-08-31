const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const street = document.querySelector("#street");
const city = document.querySelector("#city");
const province = document.querySelector("#province");
const username = document.querySelector("#username");
const form = document.querySelector(".form");
const formControls = document.querySelectorAll(".form-control");

form.addEventListener("submit", (e) => {
  checkInputs(e);
});

username.addEventListener("keypress", function (event) {
  var key = event.keyCode;
  if (key === 32) {
    event.preventDefault();
  }
});

password.addEventListener("keypress", function (event) {
  var key = event.keyCode;
  if (key === 32) {
    event.preventDefault();
  }
});

email.addEventListener("keypress", function (event) {
  var key = event.keyCode;
  if (key === 32) {
    event.preventDefault();
  }
});

function checkInputs(e) {
  let firstNameValue = firstName.value.trim();
  let lastNameValue = lastName.value.trim();
  let emailValue = email.value.trim();
  let passwordValue = password.value.trim();
  let streetValue = street.value.trim();
  let cityValue = city.value.trim();
  let provinceValue = province.value.trim();
  let usernameValue = username.value.trim();

  if (firstNameValue == "") {
    setErrorFor(firstName, "First Name is blank");
    e.preventDefault();
  } else {
    setSuccessFor(firstName);
  }

  if (lastNameValue == "") {
    setErrorFor(lastName, "Last Name is blank");
    e.preventDefault();
  } else {
    setSuccessFor(lastName);
  }

  if (emailValue == "") {
    setErrorFor(email, "Email is blank");
    e.preventDefault();
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)
  ) {
    setErrorFor(email, "That Email is invalid");
    e.preventDefault();
  } else {
    setSuccessFor(email);
  }

  if (usernameValue == "") {
    setErrorFor(username, "Username is blank");
    e.preventDefault();
  } else if (usernameValue.length < 4) {
    setErrorFor(username, "username should be atleast 4 characters");
    e.preventDefault();
  } else {
    setSuccessFor(username);
  }

  if (passwordValue == "") {
    setErrorFor(password, "Password is blank");
    e.preventDefault();
  } else if (passwordValue.length < 8) {
    setErrorFor(password, "Password should be atleast 8 characters");
    e.preventDefault();
  } else {
    setSuccessFor(password);
  }
  if (streetValue == "") {
    setErrorFor(street, "Street is blank");
    e.preventDefault();
  } else {
    setSuccessFor(street);
  }
  if (cityValue == "") {
    setErrorFor(city, "City is blank");
    e.preventDefault();
  } else {
    setSuccessFor(city);
  }
  if (provinceValue == "") {
    setErrorFor(province, "Password is blank");
    e.preventDefault();
  } else {
    setSuccessFor(province);
  }
}

function setErrorFor(input, message) {
  let formControl = input.parentElement;
  let span = formControl.querySelector("span");

  span.innerText = message;

  formControl.classList.add("error");
  formControl.classList.remove("success");
}
function setSuccessFor(input) {
  let formControl = input.parentElement;
  let span = formControl.querySelector("span");

  span.innerText = "Looks Good";

  formControl.classList.add("success");
  formControl.classList.remove("error");
}
