function Calendar () {
    this.initialise = () => {
        // check script
        mainExecution();
    }
    // To create a node element(Row)
    function createRow (index) {
        // Creating row element
        let rowElement = document.createElement('div');
        // Setting its attributes
        rowElement.setAttribute('class', 'row text-end justify-content-lg-center');
        rowElement.setAttribute('id', `parent${index}`);
        return rowElement;
    }
    // Creating Elements for each day 
    function calendarMaking (dateCollection) {
        const newArr = [];
        // To make a grid pattern and appending it to the DOM nodes
        while(dateCollection.length) newArr.push(dateCollection.splice(0,7));
        for( let i = 0; i < newArr.length; i++) {
            // To create rows which is going to contain columns
            document.getElementById('container').appendChild(createRow(i));
            for(let j = 0 ; j < newArr[i].length; j++) {
                // To display excluded dates in light color
                if( i === 0 && parseInt(newArr[i][j].innerHTML) > 10) {
                    newArr[i][j].setAttribute('style', 'color : #8E8EB0');
                }
                if(i === (newArr.length - 1) && parseInt(newArr[i][j].innerHTML) < 10) {
                    newArr[i][j].setAttribute('style', 'color : #8E8EB0');
                }
                // To append column elements to each row (created previously)
                document.getElementById(`parent${i}`).appendChild(newArr[i][j]);
            }
        }
    }
    // To create a node element(Column)
    function createCol () {
        // Creating element
        let colElement = document.createElement('div');
        // Setting its attribute
        colElement.setAttribute('class', 'col border');
        colElement.setAttribute('style', 'height : 70px');
        return colElement;
    }
    // Storing Days in a list
    function dayCollection (startDate, endDate, dateCollection) {
        // To calculate the number of days between startDate and endDate 
        let diffTime = endDate.getTime() - startDate.getTime();
        let numberOfDays = diffTime / (1000 * 3600 * 24);
        for( let i = 0; i <= numberOfDays; i++ ) {
            let element = createCol();
            // To set the day in each div(column) element
            element.innerHTML = `${startDate.getDate()}`;
            // To show sataurday and sunday with different color
            if((startDate.getDay() === 0) || (startDate.getDay() === 6)) {
                element.setAttribute('style', 'background-color : #DDEAFF; height : 70px');
            }
            // To append each div(or node) element to dateCollection array 
            dateCollection.push(element);
            // After completing each loop increasing the startDate by one day
            startDate.setDate(startDate.getDate() + 1);
        }    
    }
    // To collect dates for the calendar
    function datesCreation (date) {
        const dateCollection = [];
        const startDate = new Date(date);
        let endDate = new Date(date);
        // last date of previous month
        startDate.setDate(0);
        // To get the dates from previous month, If needs to be displayed
        if( startDate.getDay() != 6) {   // To check if last month ends with sataurday or not
            // To set start date for collecting last month's required dates
            startDate.setDate(startDate.getDate() - startDate.getDay());
            // To set end date for collecting last month's required dates
            endDate.setDate(0);
            // To get days between startDate and endDate, which are collected in dateCollection(Array)
            dayCollection(startDate, endDate, dateCollection);
            // To set startDate and endDate of current month
            endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 1);
            endDate.setDate(0);
            // To collect current month's days in dateCollection (appending)
            dayCollection(startDate, endDate, dateCollection);
            // To set dates and collect days from the next month (if next month's days are required)
            if (endDate.getDay() != 6) {
                console.log(endDate);
                endDate = new Date(startDate);
                endDate.setDate(7 - endDate.getDay());
                // To get next month's days
                dayCollection(startDate, endDate, dateCollection);
            }
            return dateCollection;
        }
        else {
            // To collect current month's days in dateCollection (appending)
            startDate.setDate(startDate.getDate() + 1);
            endDate.setMonth(endDate.getMonth() +1);
            endDate.setDate(0);
            dayCollection(startDate, endDate, dateCollection);
            // To set dates and collect days from the next month (if next month's days are required)
            if(endDate.getDay() != 6) {
                endDate = new Date(startDate);
                endDate.setDate(7 - endDate.getDay());
                dayCollection(startDate, endDate, dateCollection); 
            }
            return dateCollection;
        }
    }
    // To display today's date
    function displayDate(d) {
        date = d.toString().split(' ');
        document.getElementById('showDate').innerHTML = `${date[2]}, ${date[1]} ${date[3]} (${date[0]})`;
    }
    // To dislay Month,Year
    function displayMonth(d) {
        date = d.toString().split(' ');
        document.getElementById('showMonth').innerHTML = `${date[1]} ${date[3]}`;
    }
    // To clear Calendar
    function clearMonth () {
        let container = document.getElementById('container');
            while (container.firstChild) {
                container.removeChild(container.lastChild);
            }
    }
    //  Final executions
    function mainExecution () {
        console.log('Executing the main code');
        // Today's date
        let today = new Date();
        // To display today's date
        displayDate(today);
        // To display calendar
        calendarMaking(datesCreation(today));
        // Events
        document.getElementById('previous').addEventListener('click', (e) => {
            e.preventDefault();
            // To clear calendar
            clearMonth ();
            // Creating Previous month
            today.setMonth(today.getMonth() - 1);
            displayMonth(today);
            calendarMaking(datesCreation(today));
        });
        document.getElementById('next').addEventListener('click', (e) => {
            e.preventDefault();
            // To clear calendar
            clearMonth ();
            // Creating Next month
            today.setMonth(today.getMonth() + 1);
            displayMonth(today);
            calendarMaking(datesCreation(today));  
        });
    }
}