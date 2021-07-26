function formValidation() {
    this.initialise = () => {
        bindEvents();
    }
    // To create a new Input in the form
    function createInput () {
        let newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('class', 'form-control inputAdd');
        return newInput;
    }
    // To add input elements
    function addLines (event) {
        document.getElementById('address').appendChild(createInput());
    }

    // To remove input elements
    function removeLines (event) {
        length = document.getElementById('address').children.length;
        if (length > 2) {
            document.getElementById('address').removeChild(document.getElementById('address').children[length - 1]);
        }
    }
    // Validations
    // Check Fullname
    function checkName(e) {
        const regExp = /^[A-Za-z ]+$/;
        const nameError = document.querySelector('#nameError');
        if (e.value.trim() === '' ) {
            nameError.innerHTML = 'Fullname is required, please enter your full name';
            return false;
            }
        else {
            if (regExp.test(e.value.trim())) {
                nameError.innerHTML = '';
                console.log('Fullname accepted');
                return true;
            }
            else {
                nameError.innerHTML = 'Please enter a valid name. Name can\'t include number';
                console.log('name not ok');
                return false;
            }
        }
    }
    // Check Email
    function checkEmail(e) {
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailError = document.querySelector('#emailError');
        if (e.value.trim() === '') {
            emailError.innerHTML = 'Eamil is required, please enter your email';
            return false;
        } 
        else {
            if (regExp.test(e.value.trim())) {
                emailError.innerHTML = '';
                console.log('email accepted');
                return true;
            } 
            else {
            emailError.innerHTML = 'Please enter a valid email';
            return false;
            }
        }
    }
    //Check Input Password
    function checkPassword(e) {
        const regExp = /^[a-zA-Z0-9]+$/;
        const passwordError1 = document.querySelector('#passwordError1');
        if (e.value.trim() === '') {
            passwordError1.innerHTML = 'Password is required, please enter a password';
            return false;
        } 
        else {
            if (regExp.test(e.value.trim())) {
                passwordError1.innerHTML = '';
                console.log('password accepted');
                return true;
            } else {
                passwordError1.innerHTML = 'Accept only alphanumeric characters';
                return false;
            }
        }
    }   
    // 'Confirm Password' check
    function checkConfirmPassword(e,input) {
        let passwordError2 = document.querySelector('#passwordError2');
        if (e.value !== input.value) {
            passwordError2.innerHTML = 'Password does not match, please try again';
            return false;
        }
        else { 
            passwordError2.innerHTML = '';
            console.log('Password matched');
            return true;
        }
    }
    // Checks on submit
    function checkOnSubmit (e) {
        let test1 = checkName(loginForm['inputName']);
        let test2 = checkEmail(loginForm['inputEmail']);
        let test3 = checkPassword(loginForm['inputPassword1']);
        let test4 = checkConfirmPassword(loginForm['inputPassword1'], loginForm['inputPassword2']);
        if (!( test1 && test2 && test3 && test4 )) {
            // To prevent default behaviour (Submit)
            e.preventDefault(); 
            console.log('See the note and fill again');
            }
        else { 
            // Print 'Success' and 'Submit' form
            console.log('Thank you! Welcome to Newput');
        }
    }
    function bindEvents() {
        const loginForm = document.forms['loginForm'];
        loginForm.noValidate = true;
        // Individual input Checks
        loginForm['inputName'].addEventListener('keyup', (e) => {checkName(e.target);});
        loginForm['inputEmail'].addEventListener('blur', (e) => {checkEmail(e.target);});
        loginForm['inputPassword1'].addEventListener('keyup', (e) => {checkPassword(e.target);});
        loginForm['inputPassword2'].addEventListener('keyup', (e) => {checkConfirmPassword(e.target, loginForm['inputPassword1']);});

        // 'Final Check' before submission
        loginForm['submit'].addEventListener('click', (e) => {checkOnSubmit(e);});
        document.getElementById('removeLine').addEventListener('click', removeLines, false);
        document.getElementById('addLine').addEventListener('click', addLines, false);
    }
}