const main = () => {
	addEvents();
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
		isValid(e);
	});
};

const isValid = e => {
	// validate onchange
	if (e && e.target.checkValidity()) {
		return e.target.reportValidity();
	}
	// Validate current step
	return (!Object.values(document.querySelectorAll('.show *[required]'))
	.some(elem => {
		if (!elem.checkValidity()) {
			elem.reportValidity();
			return true;
		}
	}));
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
		document.getElementById('submit').style.display = 'inline';
		document.getElementById('next-btn').style.display = 'none';
	}
	else {
		document.getElementById('submit').style.display = 'none';
		document.getElementById('next-btn').style.display = 'inline';
	}
	if (moveTo.getAttribute('data-position') == 'finish') {
		document.getElementById('prev-btn').style.display = 'none';
		document.getElementById('submit').style.display = 'none';
		document.getElementById('next-btn').style.display = 'none';
	}
};

const formSubmit = (form) => {
	changeStep('next');
	const formValues = {
		name : form.querySelector("#name").value,
		email : form.querySelector("#email").value,
		age : form.querySelector("#number").value,
		experience : form.querySelector("#experience").value,
		focus : Object.values(form.querySelectorAll("input[name=focus]")).filter(elem => elem.checked)[0].value,
		'tech-stack' : Object.values(form.querySelectorAll("input[name=tech-stack]")).filter(elem => elem.checked).map(elem => elem.value),
		learn : form.querySelector("#dropdown").value,
		comments : form.querySelector("#comments").value,
	};
	saveFormValues(formValues);
	showResults();
};

const saveFormValues = (formValues) => {
	const formResults = JSON.parse(localStorage.getItem("survey-form-results"));

	if (formResults) {
		formResults.push(formValues);
		localStorage.setItem("survey-form-results", JSON.stringify(formResults));
	}
	else {
		localStorage.setItem("survey-form-results", JSON.stringify([formValues]));
	}
}

const showResults = () => {
	const formResults = JSON.parse(localStorage.getItem("survey-form-results"));

}

//add events after the dom is ready
document.addEventListener("DOMContentLoaded", main);

// DONT FORGET TO SANITIZE TEXT!!!
// prevent values from being empty strings

