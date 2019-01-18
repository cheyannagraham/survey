

const addEvents = () => {
    const form = document.getElementById("survey-form");
    form.addEventListener('submit',(e) => {
        e.preventDefault();
        getFormData();
        form.reset();
        document.getElementById('name').focus();
    });
}

const getFormData = () => {
    const formData = new FormData(document.getElementById("survey-form"));
    formatFormData(formData);
}

const formatFormData = formData => {
    const name = formData.get('name'),
        focus = formData.get('focus'),
        xp = formData.get('xp'),
        stack = formData.getAll('tech-stack'),
        comments = formData.get('comments');
        
    if(stack.length > 1) {
        const lastItem = `and ${stack[stack.length-1]}`;
        stack.pop();
        stack.push(lastItem);
    }

    const display = `
    Hi ${name}!
    You are a ${focus} developer with ${xp} ${xp === 1 ? 'year' : 'years'} of experience.
    ${stack.length > 0 ? ('You are proficent in '+ (stack.length > 2 ?stack.join(', ') + '.': stack.join(' ') + '.')): ''}
    ${comments && 'Thank you for your comments!'}`;

    alert(display);
}

document.addEventListener("DOMContentLoaded",addEvents);