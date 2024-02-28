function validateForm() {
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();

    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        return false;
    }

    var namePattern = /^[a-zA-Z ]+$/;

    if (!namePattern.test(name)) {
        document.getElementById('nameError').textContent = 'Name must contain only letters';
        return false;
    }

    var wordCount = name.trim().split(/\s+/).length;

    if (wordCount < 2) {
        document.getElementById('nameError').textContent = 'Name must have at least two words';
        return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email address';
        return false;
    }

    if (message === '') {
        document.getElementById('messageError').textContent = 'Message is required';
        return false;
    }

    saveDataLocally(name, email, message);

    var popup = document.querySelector('#message_modal');
    popup.style.display = "flex";

    var storedData = localStorage.getItem('formData');

    if (storedData) {
        var parsedData = JSON.parse(storedData);
        document.getElementById('storedName').textContent = parsedData.name;
        document.getElementById('storedEmail').textContent = parsedData.email;
        document.getElementById('storedMessage').textContent = parsedData.message;
    } else {
        document.getElementById('storedData').textContent = "No data stored.";
    }

    document.getElementById('closee').addEventListener('click', function() {
        popup.style.display = "none";
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    });

    return false;
}

function saveDataLocally(name, email, message) {
    var formData = {
        name: name,
        email: email,
        message: message,
    };

    localStorage.setItem('formData', JSON.stringify(formData));
}
