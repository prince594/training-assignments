function calculator () {
    this.initialise = () => {
        bindPrograms();
    console.log('Hi! I am there');
    }

    function checkString (text){
        let strStart;
        let strEnd ;
        let temp;
        for (let i = 0; i < (text.length) /2 ; i++) {
            strStart = text[i];
            strEnd = text[(text.length-1) - i];
            if (strStart != strEnd) {
                temp = 1;
                break;    
            }
            else {
                temp = 0;
            }   
        }
        if (temp == 1) {  
            return `${text} string is not palindrone`;
        }
        else { 
            return `${text} string is palindrone`;
        }
    }
    // Program to Check if the provided number is prime.
    function primeCheck (num) {
        let demo;
        if ( num == 2) {
            return `${num} is a Prime Number.`;
        } 
        else if ( num < 1) {
            return `${num} is NOT a Prime Number.`;
        }
        else {
            for (let a = 2 ; a < (num/2) +1; ) {
                if ( num % a == 0 ) {
                    demo = 1;
                    break;
                }
                else {
                    demo = 0;
                }
                a++;       
            }
            if (demo == 1) {
            return `${num} is NOT a Prime Number.`;
            }
            else if (demo == 0) {
                return `${num} is a Prime Number.`;
            }    
        }   
    }
    function bindPrograms () {
        document.getElementById('buttonForText').addEventListener('click', (e) => {
            document.querySelector('p'). innerHTML = checkString(givenText.value);
            document.querySelector('#givenText').value = '';

        });
        document.getElementById('buttonForNumber').addEventListener('click', (e) => {
            document.querySelector('p').innerHTML = primeCheck(givenNumber.value);
            document.querySelector('#givenNumber').value = '';

        });
    }
}