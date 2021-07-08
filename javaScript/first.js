console.log('Hi! I am there');

function checkString (text){
    let strStart;
    let strEnd ;
    let temp;

    for (let i = 0; i < (text.length) /2 ; i++) {
        strStart = text[i];
        strEnd = text[(text.length-1) - i];
        if (strStart != strEnd) {
            temp = 1;
            
        }
        else {
            temp = 0;
        }
        
    }
    if (temp == 1) {
        
        alert('Provided string is not palindrone');
        return 'Provided string is not palindrone';
    }
    else {
        
        alert('Provided string is palindrone');
        return 'Provided string is palindrone';
    }

}

// Program to Check if the provided number is prime.



function primeCheck (num) {
    let demo;
    if ( num == 2) {
        alert(`${num} is a Prime Number.`);
        return `${num} is a Prime Number.`;
    }
    
    else if ( num < 1) {
        alert(`${num} is NOT a Prime Number.`);
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
            alert(`${num} is NOT a Prime Number.`);
           return `${num} is NOT a Prime Number.`;
        }
        else if (demo == 0) {
            alert(`${num} is a Prime Number.`);
            return `${num} is a Prime Number.`;
        }
    }    
}

//var givenText = window.prompt('Enter Text to Check for palindrone');
//document.write(checkString(givenText));
