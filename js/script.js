const main = () => {
    addEvents();
    // Get first part of form
    update_form_view(1);
}

const addEvents = () => {
    let next_button = document.getElementById('next');
    next_button.addEventListener('click', () => change_form_content(next_button));
}

const change_form_content = (next_button) => {
    const next = document.querySelector('fieldset[data-next]').getAttribute('data-next');

    // Submit form
    if (next == 'end') {
        alert("end");
    }
    else {
        // Submit form on last page*** NO SUBMIT ACTION YET
        if(next == '5') {
            next_button.innerHTML = 'Submit'
        }
        update_form_view(next);
    }
}

const update_form_view = (form) => {
    fetch(`./forms/form_part_${form}.html`)
    .then(resp => resp.text())
    .then(resp => {
        const form_content = document.getElementById('form-content');
        form_content.innerHTML = resp;
    });
}

//add events after the dom is ready
document.addEventListener('DOMContentLoaded', main);

// DONT FORGET TO SANITIZE TEXT!!!