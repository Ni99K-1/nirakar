// DOM elements
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
//grabbing buttons
const valueEl = document.querySelector('.value');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

//operators
const additionEl= document.querySelector('.addition');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');
const multiplicationEl = document.querySelector('.multiplication');
const subtractionEl = document.querySelector('.subtraction');

//numbers
const decimalEl = document.querySelector('.decimal');//watch this line..it might create bug later
//within bracket is grabbing on css side
const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');


//lets put them in array

const numberElArray =[
    number0El, number1El, number2El, number3El, number4El,
    number5El, number6El, number7El, number8El, number9El
];


//Variables

let valueStrInMemory = null;
let operatorInMemory = null;





//functions

/*const getValueAsStr= () => {
    const currentDisplayStr = valueEl.textContent;
    return currentDisplayStr.split(',').join('');//this operation will get rid of commas and split back strings
}*///OR we can reduce it to one line

const getValueAsStr = () => valueEl.textContent.split(',').join('');




//this function takes value as string and splits back to number

const getValueAsNum = () => {
   return parseFloat(getValueAsStr());
};

//this function will allow the more number of digits after the decimal point
const setStrAsValue = (valueStr) => {
    if(valueStr[valueStr.length -1] === '.'){
        valueEl.textContent += '.';
        return;
    }

    const [wholeNumStr, decimalStr] = valueStr.split('.');
    if (decimalStr){
        valueEl.textContent =
        parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    } else {
        valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
    }
};

//1==> this function listens to the number clicks and we also got rid of 0 while there is an input
const handleNumberClick = (numStr)=>{
    const currentValueStr = getValueAsStr();
    if(currentValueStr === '0'){
        setStrAsValue(numStr);
    }else {
        setStrAsValue(currentValueStr + numStr);
    }
};

//operations
const getResultOfOperationAsStr = () => {
    const currentValueNum = getValueAsNum();
    const valueNumInMemory = parseFloat(valueStrInMemory);
   
    let newValueNum;

    

    if (operatorInMemory === 'addition'){

        newValueNum = valueNumInMemory + currentValueNum;

    } else if (operatorInMemory === 'subtraction'){

        newValueNum = valueNumInMemory - currentValueNum;

    } else if (operatorInMemory === 'multiplication'){

        newValueNum = valueNumInMemory * currentValueNum;

    } else if (operatorInMemory === 'division'){

        newValueNum = valueNumInMemory / currentValueNum;
    }

    return newValueNum.toString();

};

const handleOperatorClick = (operation) =>{

   const currentValueStr = getValueAsStr();
 
    if(!valueStrInMemory){
        valueStrInMemory = currentValueStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }

    valueStrInMemory = getResultOfOperationAsStr();

    operatorInMemory = operation;

    setStrAsValue('0');
};

//Add event Listener to the functions

acEl.addEventListener('click',() => {
    setStrAsValue('0');
    valueStrInMemory = null;
    operatorInMemory = null;
});
pmEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const currentValueStr = getValueAsStr();

    if(currentValueStr ==='-0'){
        setStrAsValue('0');
        return;
    }

    if (currentValueNum >= 0) {
        setStrAsValue('-' + currentValueStr);
    } else {
        setStrAsValue(currentValueStr.substring(1));
    }
});

percentEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const newValueNum = currentValueNum / 100;
    setStrAsValue(newValueNum.toString());
    valueStrInMemory = null;
    operatorInMemory = null;
});

//add event listeners to operators

additionEl.addEventListener('click',() => {
    handleOperatorClick('addition');
});

subtractionEl.addEventListener('click',() => {
    handleOperatorClick('subtraction');
});

multiplicationEl.addEventListener('click',() => {
    handleOperatorClick('multiplication');
});

divisionEl.addEventListener('click',() => {
    handleOperatorClick('division');
});

equalEl.addEventListener('click',() => {
    if (valueStrInMemory) {
        setStrAsValue(getResultOfOperationAsStr());
        valueStrInMemory= null;
        valueNumInMemory = null;
    }
});

//adding Event Listeners to our numbers and decimal 
for(let i=0; i<numberElArray.length; i++) {
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
};

decimalEl.addEventListener('click', () => {
    const currentValueStr = getValueAsStr();
    if(!currentValueStr.includes('.')){
        setStrAsValue(currentValueStr + '.');
    }
});







//setup the time
const updateTime =()=>{

    const currentTime = new Date();

    let currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if(currentHour>12){
        currentHour -= 12;//this will make time to standard 12 hour format rather than 24 hr format
    }

    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');


}
setInterval(updateTime, 1000);
updateTime();
