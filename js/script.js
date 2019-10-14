const main = () => {
	// https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	Array.prototype.toCapList = function() {
		return this.map(item => item.capitalize()).join(', ');
	}
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
	if (e && e.target.hasAttribute('required')) {
		const helperText = e.target.parentElement.querySelector(".helper-text");

		if (e.target.checkValidity()) {
			e.target.classList.remove("invalid");
			if (helperText) helperText.style.display = 'none';
			return false
		}
		else {
			e.target.classList.add("invalid");
			helperText.style.display = 'block';
			return true;
		}
		// return e.target.reportValidity();
	}
	// Validate required elements in current step
	// Required Elements have helper text
	if (!e) {
		Object.values(document.querySelectorAll('.show *[required]')).forEach(elem => {
			if (!elem.checkValidity()) {
				const helperText = elem.parentElement.querySelector(".helper-text");
				elem.classList.add("invalid");
				helperText.style.display = 'block';

				elem.reportValidity();
				return true;
			}
		});
	}
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
	let table = `
	<div class="table-responsive">
		<table class="table table-striped table-bordered">
			<thead class="thead-light">
				<th>Name</th>
				<th>Experience</th>
				<th>Skills</th>
				<th>Contact</th>
				<th>Comments</th>
			</thead>
			<tbody>`;

	for (result of formResults)
	{
		table += `
			<tr>
				<td>${(result.name).split(" ").toCapList()}</td>
				<td>${(result.focus).capitalize()}</td>
				<td>${(result["tech-stack"]).toCapList()}</td>
				<td>${(result.email).capitalize()}</td>
				<td>${(result.comments).capitalize()}</td>
			</tr>`
	}
	table += `
			</tbody>
		</table>
	</div>`;

	document.querySelector("#main").innerHTML = table;

}


//add events after the dom is ready
document.addEventListener("DOMContentLoaded", main);

// DONT FORGET TO SANITIZE TEXT!!!
// prevent values from being empty strings
// test with out JS
//style text in table
// add navbar to table and form
// I added the spans to show when forms is invalid. But i do this by selecting the next element and hiding it. 
// this logic causes the next sibling of checkboxes and radios to "hide" becaus their next sibling is another checkbox, not a helper text div


