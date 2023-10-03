let form = document.getElementById('form');
let inputs = form.querySelectorAll('[required]');
let submit = form.querySelectorAll('[type="submit"]')[0];
let feedback = document.getElementById('feedback');
let captchaText = document.getElementById('captcha');
let captchaSubmit = document.getElementById('captcha-submit');

captchaNum1 = Math.floor(Math.random() * 99) + 1;
captchaNum2 = Math.floor(Math.random() * 99) + 1;
captchaText.innerHTML = captchaNum1 + " + "+ captchaNum2 +" = ";

for(const input of inputs){
    input.addEventListener('input', onInput)
}

phoneValid = false;
emailValid = false;

function onInput(input){
    feedback.innerHTML = "";
    if(checkInputs()){
        submit.disabled = false;
        console.log('valid inputs');
    }

    if(input.target.type == "tel"){
        if(input.target.value.match(/^\d{10}$/)){
            input.target.style.backgroundColor = "green";
            phoneValid = true;
        }else {
            input.target.style.backgroundColor = "red";
            feedback.innerHTML = 'Invalide invoer';
        }
    }
    if(!input.target.checkValidity() && input.target.type != "tel"){
        input.target.style.backgroundColor = "red";
        feedback.innerHTML = 'Invalide invoer';
    }else if(input.target.type != "tel"){
        input.target.style.backgroundColor = "green";
    }
}

function checkInputs(){
    for(const input of inputs){
        if(!input.checkValidity()){
            return false;
        }
    }
    return phoneValid;

}

