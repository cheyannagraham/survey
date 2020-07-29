const main = () => {
  // https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  String.prototype.sanitize = function () {
    return this.replace(/[</${()}[]|`]/g, "");
  };

  Array.prototype.toCapList = function (sep = " ") {
    return this.map((item) => item.capitalize()).join(sep);
  };
  addEvents();
};

const addEvents = () => {
  const prevBtn = document.getElementById("prev-btn");
  prevBtn.addEventListener("click", () => {
    changeStep("prev");
  });

  const nextBtn = document.getElementById("next-btn");
  nextBtn.addEventListener("click", () => {
    isValid() && changeStep("next");
  });

  const resetBtn = document.getElementById("reset-data-btn");
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("survey-form-results");
    showResults();
  });

  const form = document.getElementById("survey-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    isValid() && formSubmit(form);
  });

  form.addEventListener("change", (e) => {
    isValid(e);
  });

  const retakeBtn = document.getElementById("retake-btn");
  retakeBtn.addEventListener("click", () => {
    form.style.display = "block";
    form.reset();
    document.getElementById("table-div").style.display = "none";
    changeStep("start");
  });
};

const isValid = (e) => {
  // validate onchange
  if (e && e.target.hasAttribute("required")) {
    const helperText = e.target.parentElement.querySelector(".helper-text");

    if (e.target.checkValidity()) {
      e.target.classList.remove("invalid");
      if (helperText) helperText.style.display = "none";
      return true;
    } else {
      e.target.classList.add("invalid");
      helperText.style.display = "block";
      return false;
    }
  }
  // Validate required elements in current step
  // Required Elements have helper text
  if (!e) {
    let valid = true;
    Object.values(document.querySelectorAll(".show *[required]")).forEach(
      (elem) => {
        if (!elem.checkValidity()) {
          valid = false;
          const helperText = elem.parentElement.querySelector(".helper-text");
          elem.classList.add("invalid");
          helperText.style.display = "block";
        }
      }
    );
    return valid;
  }
};

const changeStep = (direction) => {
  const current_step = document.querySelector("div.form-step.show");
  const moveTo =
    direction == "start"
      ? document.getElementById("survey-form").querySelector(".form-step")
      : direction == "next"
      ? current_step.nextElementSibling
      : current_step.previousElementSibling;
  current_step.classList.remove("show");
  moveTo.classList.add("show");

  // Hide and show next, submit, prev buttons
  if (moveTo.getAttribute("data-position") != "beg") {
    document.getElementById("prev-btn").style.display = "inline";
  } else {
    document.getElementById("prev-btn").style.display = "none";
  }
  if (moveTo.getAttribute("data-position") == "end") {
    document.getElementById("submit").style.display = "inline";
    document.getElementById("next-btn").style.display = "none";
  } else {
    document.getElementById("submit").style.display = "none";
    document.getElementById("next-btn").style.display = "inline";
  }
};

const formSubmit = (form) => {
  const formValues = {
    name: form.querySelector("#name").value.split(" ").toCapList(),
    email: form.querySelector("#email").value.capitalize(),
    age: form.querySelector("#number").value,
    experience: form.querySelector("#experience").value,
    focus: Object.values(form.querySelectorAll("input[name=focus]"))
      .filter((elem) => elem.checked)[0]
      .value.capitalize(),
    "tech-stack": Object.values(form.querySelectorAll("input[name=tech-stack]"))
      .filter((elem) => elem.checked)
      .map((elem) => elem.value)
      .toCapList(", "),
    learn: form.querySelector("#dropdown").value,
    comments: form.querySelector("#comments").value.sanitize().capitalize(),
  };
  saveFormValues(formValues);
  showResults();
};

const saveFormValues = (formValues) => {
  const formResults = JSON.parse(localStorage.getItem("survey-form-results"));

  if (formResults) {
    formResults.push(formValues);
    localStorage.setItem("survey-form-results", JSON.stringify(formResults));
  } else {
    localStorage.setItem("survey-form-results", JSON.stringify([formValues]));
  }
};

const showResults = () => {
  const formResults = JSON.parse(localStorage.getItem("survey-form-results"));

  tableBody = formResults
    ? formResults
        .map(
          (result) =>
            `<tr>
              <td>${result.name}</td>
              <td>${result.focus}</td>
              <td>${result["tech-stack"]}</td>
              <td>${result.email}</td>
              <td>${result.comments}</td>
            </tr>`
        )
        .join("")
    : [];

  document.getElementById("survey-form").style.display = "none";
  document.getElementById("table-div").style.display = "block";
  document.getElementById("table-body").innerHTML = tableBody;
};

//add events after the dom is ready
document.addEventListener("DOMContentLoaded", main);
