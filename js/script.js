let formParts = [];
const form_values = {};

const main = () => {
  addEvents(form_values);
  get_forms().then(res => {
    formParts = res;
    // Get first part of form
    update_form_view(0);
  });
};

const addEvents = () => {
  const prev_button = document.getElementById("prev");
  prev_button.addEventListener("click", () => {
    const prev = document
      .querySelector("fieldset[data-prev]")
      .getAttribute("data-prev");
    // save_form_content(form_values);
    update_form_view(prev);
  });

  const next_button = document.getElementById("next");
  next_button.addEventListener("click", () => {
    const next = document
      .querySelector("fieldset[data-next]")
      .getAttribute("data-next");
    update_form_view(next);
  });

  form = document.getElementById("survey-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    form_submit(form);
  });
  form.addEventListener("change", save_form_content);
};

const get_forms = () => {
  const get_data = n => {
    return fetch(`./forms/form_part_${n}.html`)
      .then(resp => resp.text())
      .then(html => {
        return html;
      });
  };

  return Promise.all([
    get_data(0),
    get_data(1),
    get_data(2),
    get_data(3),
    get_data(4),
    get_data(5)
  ]).then(forms => forms);
};

const save_form_content = e => {
  elem = e.target;
  //   Save Radio & checkboxes
  if (["radio", "checkbox"].includes(elem.type)) {
    if (elem.checked) {
      // Uncheck other radio buttons
      if (elem.type == "radio") {
        const radios = document.querySelectorAll(`input[name=${elem.name}]`);
        radios.forEach(item => {
          item.removeAttribute("checked");
        });
      }
      elem.setAttribute("checked", "");
    } else {
      elem.removeAttribute("checked");
    }
    // Save single selects
  } else if (elem.type == "select-one") {
    const options = document.querySelectorAll(`#${elem.id} option`);
    options.forEach(item => {
      if (item.value == elem.value) {
        item.setAttribute("selected", elem.selected);
      } else {
        item.removeAttribute("selected");
      }
    });
    // Save textarea's
  } else if (elem.type == "textarea") {
    document.getElementById(elem.id).innerHTML = e.target.value;
    // save other inputs
  } else {
    elem.setAttribute("value", elem.value);
  }

  current_form = document
    .querySelector("fieldset[data-current]")
    .getAttribute("data-current");
  current_content = document.getElementById("form-content").innerHTML;
  formParts[current_form] = current_content;
};

const update_form_view = form => {
  const form_content = document.getElementById("form-content");
  form_content.innerHTML = formParts[form];

  const prev_button = document.getElementById("prev");
  const next_button = document.getElementById("next");
  const submit_button = document.getElementById("submit");

  // Hide prev button at beg of form onlyclear
  if (form == "0") {
    prev_button.style.display = "none";
  } else {
    prev_button.style.display = "inline";
  }
  // Show submit on last page of form only
  if (form == "4") {
    next_button.style.display = "none";
    submit_button.style.display = "inline";
  } else {
    next_button.style.display = "inline";
    submit_button.style.display = "none";
  }
};

const form_submit = () => {
  const form_content = document.getElementById('form-content');
  form_content.innerHTML = formParts[5];
  document.getElementById("prev").style.display = 'none'
  document.getElementById("submit").style.display = 'none'

};

//add events after the dom is ready
document.addEventListener("DOMContentLoaded", main);

// DONT FORGET TO SANITIZE TEXT!!!
// HTML Validation NOT WORKING BC
// TODO: Save form state
// CHECK for globals in loops >(
