const add = document.querySelector(".add");
const minus = document.querySelector(".minus");
const personContainer = document.querySelector(".personContainer");
const form = document.querySelector("form");
const buttons = document.querySelector(".buttons");

var globalCount = 1;

function clone() {
  var cloned = personContainer.cloneNode(true);

  // Name
  cloned
    .querySelector("[data-name]")
    .setAttribute("name", `people[${globalCount + 1}][name]`);
  cloned.querySelector("[data-name]").value = "";

  // Education
  cloned
    .querySelector("[data-education]")
    .setAttribute("name", `people[${globalCount + 1}][education]`);
  cloned.querySelector("[data-education]").selectedIndex = "0";

  // Birthday
  cloned
    .querySelector("[data-birthday]")
    .setAttribute("name", `people[${globalCount + 1}][birthday]`);
  cloned.querySelector("[data-birthday]").value = "";

  // Marital Status
  cloned
    .querySelector("[data-maritalStatus]")
    .setAttribute("name", `people[${globalCount + 1}][maritalStatus]`);
  cloned.querySelector("[data-maritalStatus]").selectedIndex = "0";

  // Relationship
  cloned
    .querySelector("[data-relationship]")
    .setAttribute("name", `people[${globalCount + 1}][relationship]`);
  cloned.querySelector("[data-relationship]").selectedIndex = "0";

  // Gender
  const genderRadio = cloned.querySelectorAll("[data-gender]");

  genderRadio.forEach((radio) => {
    radio.setAttribute("name", `people[${globalCount + 1}][gender]`);
  });

  // Change Value per Person

  globalCount++;
  return cloned;
}
add.addEventListener("click", (e) => {
  form.insertBefore(clone(), buttons);
});

minus.addEventListener("click", (e) => {
  const generatedFields = form.querySelectorAll(".personContainer");
  if (generatedFields.length > 1) {
    generatedFields[generatedFields.length - 1].remove();
  }
});

// remove.addEventListener('click', (e) => {
//     form.
// })
