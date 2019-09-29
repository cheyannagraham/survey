const main = () => {
    addEvents();
    // Get first part of form
    update_form_view(1);
}

const addEvents = () => {
    let prev_button = document.getElementById('prev');
    prev_button.addEventListener('click', () => {
        const prev = document.querySelector('fieldset[data-prev]').getAttribute('data-prev');
        change_form_content(prev, prev_button);
    });
    
    let next_button = document.getElementById('next');
    next_button.addEventListener('click', () => {
        const next = document.querySelector('fieldset[data-next]').getAttribute('data-next');
        change_form_content(next, next_button);
    });
}

const change_form_content = (form, next_button) => {

    // Submit form
    if (form == 'end') {
        alert("end");
    }
    else if (form == 'beg') {
        alert('beg');
    }
    else {
        update_form_view(form);
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