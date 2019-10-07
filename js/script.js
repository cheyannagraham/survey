let formParts = [];
const formValues = {};

const main = () => {
	addEvents(formValues);
};

const addEvents = () => {
	const prevBtn = document.getElementById("prev-btn");
	prevBtn.addEventListener("click", () => {
			changeStep("prev");
	});

	const nextBtn = document.getElementById("next-btn");
	nextBtn.addEventListener("click", () => {
		if (isValid()) {
			changeStep("next");
		}
	});

	form = document.getElementById("survey-form");
	form.addEventListener("submit", e => {
		e.preventDefault();
		isValid() && formSubmit(form);
	});

	form.addEventListener("change", e => {
		isValid(e) && saveFormContent(e);
	});
};

const isValid = e => {
	// Validate current step
	return (!Object.values(document.querySelectorAll('.show *[required]')).some(elem => elem.checkValidity() == false));


	// Validate onchange element
	// if (e) {
	// 	elem = e.target;
	// 	if (!elem.checkValidity()) {
	// 		elem.reportValidity();
	// 		elem.classList.add("invalid");
	// 		return false;
	// 	} else {
	// 		elem.classList.remove("invalid");
	// 		return true;
	// 	}
	// } else {
	// 	// Validate all step elements on next/prev btn click
	// 	const formContent = document.getElementById("form-content");

	// 	// Validate all checkbox groups
	// 	const checkboxes = [...formContent.querySelectorAll("input[type=checkbox]")];
	// 	if (checkboxes.length > 0) {
	// 		const checkbox_groups_names = [...new Set(Object.values(checkboxes).map(box => box.name)).values()];
	// 		const checkbox_group_validity = [];
			
	// 		// iterate through check box groups
	// 		checkbox_groups_names.forEach((group_name, index) => {
	// 			checkbox_group_validity[index] = false;

	// 			// get boxes for single group by name
	// 			const boxes = checkboxes.filter(box => box.name == group_name);

	// 			// remove groups with atleast 1 checked value
	// 			checkbox_group_validity[index] = boxes.some(box => box.checked);
	// 		});
			
	// 		// Report validity error
	// 		if (checkbox_group_validity.includes(false)) {
	// 			document.getElementById("error").innerHTML = "Please select at least 1 checkbox";
	// 			return false;
	// 		} else {
	// 			document.getElementById("error").innerHTML = " ";
	// 		}
	// 	}

	// 	// Validate select & required
	// 	let stepValid = true;
	// 	const stepItems = formContent.querySelectorAll("input[required], select[required], textarea[required");
	// 	stepItems.forEach(elem => {
	// 		if (!elem.checkValidity()) {
	// 			elem.reportValidity();
	// 			elem.classList.add("invalid");
	// 			stepValid = false;
	// 		} else {
	// 			elem.classList.remove("invalid");
	// 		}
	// 	});
	// 	return stepValid;
	// }
};

// const getForms = () => {
// 	const getData = n => {
// 		return fetch(`./forms/form_part_${n}.html`)
// 			.then(resp => resp.text())
// 			.then(html => {
// 				return html;
// 			});
// 	};

// 	return Promise.all([
// 		getData(0),
// 		getData(1),
// 		getData(2),
// 		getData(3),
// 		getData(4),
// 		getData(5)
// 	]).then(forms => forms);
// };

const saveFormContent = e => {
	// elem = e.target;
	
	// //   Save Radio & checkboxes
	// if (["radio", "checkbox"].includes(elem.type)) {
	// 	if (elem.checked) {
			
	// 		// Uncheck other radio buttons
	// 		if (elem.type == "radio") {
	// 			const radios = document.querySelectorAll(`input[name=${elem.name}]`);
	// 			radios.forEach(item => {
	// 				item.removeAttribute("checked");
	// 			});
	// 		}
	// 		elem.setAttribute("checked", "");
	// 	} else {
	// 		elem.removeAttribute("checked");
	// 	}
		
	// 	// Save single selects
	// } else if (elem.type == "select-one") {
	// 	const options = document.querySelectorAll(`#${elem.id} option`);
	// 	options.forEach(item => {
	// 		if (item.value == elem.value) {
	// 			item.setAttribute("selected", elem.selected);
	// 		} else {
	// 			item.removeAttribute("selected");
	// 		}
	// 	});
		
	// 	// Save textarea's
	// } else if (elem.type == "textarea") {
	// 	document.getElementById(elem.id).innerHTML = e.target.value;
		
	// 	// save other inputs
	// } else {
	// 	elem.setAttribute("value", elem.value);
	// }

	// const currentForm = document.querySelector("fieldset[data-current]").getAttribute("data-current");
	// currentContent = document.getElementById("form-content").innerHTML;
	// formParts[currentForm] = currentContent;
};

const changeStep = direction => {
	const current_step = document.querySelector("div.form-step.show");
	const moveTo = direction == 'next' ? current_step.nextElementSibling : current_step.previousElementSibling;
	
	current_step.classList.remove("show");
	moveTo.classList.add("show");

	// Hide and show next, submit, prev buttons
	if (moveTo.getAttribute("data-position") != "beg") {
		document.getElementById('prev-btn').style.display = 'inline';
	}
	else {
		document.getElementById('prev-btn').style.display = 'none';
	}
	if (moveTo.getAttribute("data-position") == "end") {
		document.getElementById('submit-btn').style.display = 'inline';
		document.getElementById('next-btn').style.display = 'none';
	}
	else {
		document.getElementById('submit-btn').style.display = 'none';
		document.getElementById('next-btn').style.display = 'inline';
	}
};

const formSubmit = () => {
	const formContent = document.getElementById("form-content");
	formContent.innerHTML = formParts[5];
	document.getElementById("prev-btn").style.display = "none";
	document.getElementById("submit-btn").style.display = "none";
};

//add events after the dom is ready
document.addEventListener("DOMContentLoaded", main);

// DONT FORGET TO SANITIZE TEXT!!!
//validate visible form step only. 

