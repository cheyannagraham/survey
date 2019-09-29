const main = () => {
    addEvents();
    const form_content = document.getElementById('form-content');
    form_content.innerHTML = '<fieldset data-next="2">Yo</fieldset>';

}

const addEvents = () => {
    let next_button = document.getElementById('next');
    next_button.addEventListener('click', () => change_form_content(next_button));
}

const change_form_content = (next_button) => {
    const form_content = document.getElementById('form-content');
    const next = document.querySelector('fieldset[data-next]').getAttribute('data-next');
    if(next == '5') {
        next_button.innerHTML = 'Submit'

    }
    fetch(`./forms/form_part_${next}.html`)
    .then(resp => resp.text())
    .then(resp => form_content.innerHTML = resp);
}

//add events after the dom is ready
document.addEventListener('DOMContentLoaded', main);