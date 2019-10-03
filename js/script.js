let formParts = [];
const formValues = {};

const main = () => {
	addEvents(formValues);
	getForms().then(res => {
		formParts = res;
		// Get first part of form
		updateFormView(0);
	});
};

const addEvents = () => {
	const prevBtn = document.getElementById("prev");
	prevBtn.addEventListener("click", () => {
		if (isValid()) {
			const prev = document
				.querySelector("fieldset[data-prev]")
				.getAttribute("data-prev");
			updateFormView(prev);
		}
	});

	const nextBtn = document.getElementById("next");
	nextBtn.addEventListener("click", () => {
		if (isValid()) {
			const next = document
				.querySelector("fieldset[data-next]")
				.getAttribute("data-next");
			updateFormView(next);
		}
	});

	form = document.getElementById("survey-form");
	form.addEventListener("submit", e => {
		e.preventDefault();
		isValid() && formSubmit(form);
	});

	form.addEventListener("change", e => {
		saveFormContent(e);
		isValid(e);
	});
};

const isValid = e => {
	// Validate onchange element
	if (e) {
		elem = e.target;
		if (!elem.checkValidity()) {
			elem.reportValidity();
			elem.classList.add("invalid");
			return false;
		} else {
			elem.classList.remove("invalid");
			return true;
		}
	}
	// Validate all step elements
	else {
		const formContent = document.getElementById("form-content");
		
		// Validate all checkbox groups
		const checkboxes = formContent.querySelectorAll('input[type=checkbox]');
		checkbox_groups_names = new Set([]);
		checkboxes.forEach(box => {
			checkbox_groups_names.add(box.name);
		});
		console.log(checkbox_groups_names)
		if (checkbox_groups_names.length > 0) {
			let valid_groups = [];
			checkbox_groups_names.forEach((idx,name) => {
				valid_groups[idx] = false;
				const boxes = formContent.querySelectorAll(`input[name=[${name}]`);
				boxes.some(box => {
					if (box.checked = true) {
						valid_groups[idx] = true;
						return true;
					}
				})
			});
			
			if (valid_groups.includes('false')) {
				
				return false;
			}
		}
		
		// Validate select & required
		let stepValid = true;
		const stepItems = formContent.querySelectorAll("input[required], select[required]");
		stepItems.forEach(elem => {
			if (!elem.checkValidity()) {
				elem.reportValidity();
				elem.classList.add("invalid");
				stepValid = false;
			} else {
				elem.classList.remove("invalid");
			}
		});
		return stepValid;
	}
};

const getForms = () => {
	const getData = n => {
		return fetch(`./forms/form_part_${n}.html`)
			.then(resp => resp.text())
			.then(html => {
				return html;
			});
	};

	return Promise.all([
		getData(0),
		getData(1),
		getData(2),
		getData(3),
		getData(4),
		getData(5)
	]).then(forms => forms);
};

const saveFormContent = e => {
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

	currentForm = document
		.querySelector("fieldset[data-current]")
		.getAttribute("data-current");
	currentContent = document.getElementById("form-content").innerHTML;
	formParts[currentForm] = currentContent;
};

const updateFormView = form => {
	const formContent = document.getElementById("form-content");
	formContent.innerHTML = formParts[form];

	const prevBtn = document.getElementById("prev");
	const nextBtn = document.getElementById("next");
	const submitBtn = document.getElementById("submit");

	// Hide prev button at beg of form only
	if (form == "0") {
		prevBtn.style.display = "none";
	} else {
		prevBtn.style.display = "inline";
	}
	// Show submit on last page of form only
	if (form == "4") {
		nextBtn.style.display = "none";
		submitBtn.style.display = "inline";
	} else {
		nextBtn.style.display = "inline";
		submitBtn.style.display = "none";
	}
};

const formSubmit = () => {
	const formContent = document.getElementById("form-content");
	formContent.innerHTML = formParts[5];
	document.getElementById("prev").style.display = "none";
	document.getElementById("submit").style.display = "none";
};

//add events after the dom is ready
document.addEventListener("DOMContentLoaded", main);

// DONT FORGET TO SANITIZE TEXT!!!
// HTML Validation NOT WORKING BC
// TODO: Save form state
// CHECK for globals in loops >(
	// enter submits form!!
	// require textarea, select,  
