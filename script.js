const inputNumbers = document.querySelectorAll(".numberKey");
let value = document.querySelector("#calculatedValue").innerHTML;

inputNumbers.forEach(inputNumber => {
    inputNumber.addEventListener("click", function() {
        if (value != null) {
            value = value + inputNumber.innerHTML;
            document.querySelector("#calculatedValue").innerHTML = value;
        } else {
            document.querySelector("#calculatedValue").innerHTML = inputNumber.innerHTML;
        }
    })
})

const allClear = document.querySelector(".allClear").addEventListener("click", function() {
    value = "";
    document.querySelector("#calculatedValue").innerHTML = 0;
    historySave = [];
})

let historySave = [];

const calculate = document.querySelector(".calculate").addEventListener("click", function() {
    let valueString = document.querySelector("#calculatedValue").innerHTML + "=";
    let valueList = valueString.split("");
    console.log("valueList :{}",valueList);

    let mathKey = ["+", "-", "*", "/", "%", "="];
    let index;
    let tempIndex = 0;
    let number;
    let tempList = [];
    
    for (index = 0; index < valueList.length; index++) {
        if (mathKey.indexOf(valueList[index])>=0) {
            console.log("tempIndex= " + tempIndex);
            console.log("index= " + index);
            number = valueString.substring(tempIndex, index);
            tempList.push(number);
            tempList.push(valueList[index]);
            tempIndex = index + 1;
        }
    }
    console.log("tempList :{}",tempList);

    checkFormula(tempList);
    console.log("after checkFormula :{}",tempList);
    times(tempList);
    divide(tempList);
    percent(tempList);
    plus(tempList);
    minus(tempList);

    let finalIndex = tempList.length;
    let finalResult = tempList[finalIndex-2];
    console.log("finalResult :{}",finalResult);
    console.log("finalResult type:{}",typeof(finalResult));
    if(isNaN(finalResult)){
        alert("수식 오류!");
        finalResult=null;
    }
    document.querySelector("#calculatedValue").innerHTML = finalResult;
   
    historySave.push(value+"="+finalResult+'\r\n');
    value = finalResult;
});

function checkFormula(tempList){
    let i;
    for (i=0;i<tempList.length;i++){
        if(tempList[i] === "-"){
            if(tempList[i-1] === "" && i === 1){
                tempList.splice(i-1,3,0,"+",tempList[i+1]*-1);
            } else if (tempList[i-1] === "" && (tempList[i-2] === "*" || tempList[i-2] === "/")){
                tempList.splice(i-1,3,tempList[i+1]*-1,"*",1);
            }
        }
    }
}


function times(tempList) {
    let i;
    for (i = 0; i < tempList.length; i++) {
        if (tempList[i] === "*") {
            if(tempList[i-2] ==="-"){
                tempList.splice(i-2,2,"+",tempList[i-1]*-1);
            }
            let result = Number(tempList[i - 1]) * Number(tempList[i + 1]);
            tempList.splice(i - 1, 3, 0, '+', result);
        }
    }
}

function divide(tempList) {
    let i;
    for (i = 0; i < tempList.length; i++) {
        if (tempList[i] === "/") {
            if(tempList[i-2]==="-"){
                tempList.splice(i-2,2,"+",tempList[i-1]*-1);
            }
            let result = Number(tempList[i - 1]) / Number(tempList[i + 1]).toFixed(5);
            tempList.splice(i - 1, 3, 0, '+', result);
        }
    }
}

function percent(tempList){
    let i; 
    for (i = 0; i < tempList.length; i++) {
        if (tempList[i] === "%") {
            let result = Number(tempList[i - 1]) % Number(tempList[i + 1]).toFixed(5);
            tempList.splice(i - 1, 3, 0, '+', result);
        }
    }
}

function plus(tempList) {
    let i;
    for (i = 0; i < tempList.length; i++) {
        if (tempList[i] === "+") {
            let result = Number(tempList[i - 1] )+ Number(tempList[i + 1]);
            tempList.splice(i - 1, 3, 0, '+', result);
        }
    }
}

function minus(tempList) {
    let i;
    for (i = 0; i < tempList.length; i++) {
        if (tempList[i] === "-") {
            let result = Number(tempList[i - 1]) - Number(tempList[i + 1]);
            tempList.splice(i - 1, 3, 0, '+', result);
        }
    }
}

const historyBtn = document.querySelector(".historyBtn").addEventListener("click", function() {
    alert(historySave);
})

function calculateExcute(){
    let valueString = document.querySelector("#calculatedValue").innerHTML + "=";
    let valueList = valueString.split("");
    console.log("valueList :{}",valueList);

    let mathKey = ["+", "-", "*", "/", "%", "="];
    let index;
    let tempIndex = 0;
    let number;
    let tempList = [];
    
    for (index = 0; index < valueList.length; index++) {
        if (mathKey.indexOf(valueList[index])>=0) {
            console.log("tempIndex= " + tempIndex);
            console.log("index= " + index);
            number = valueString.substring(tempIndex, index);
            tempList.push(number);
            tempList.push(valueList[index]);
            tempIndex = index + 1;
        }
    }
    console.log("tempList :{}",tempList);

    checkFormula(tempList);
    console.log("after checkFormula :{}",tempList);
    times(tempList);
    divide(tempList);
    percent(tempList);
    plus(tempList);
    minus(tempList);

    let finalIndex = tempList.length;
    let finalResult = tempList[finalIndex-2];
    console.log("finalResult :{}",finalResult);
    console.log("finalResult type:{}",typeof(finalResult));
    if(isNaN(finalResult)){
        alert("수식 오류!");
        finalResult=null;
    }
    document.querySelector("#calculatedValue").innerHTML = finalResult;
   
    historySave.push(value+"="+finalResult+'\r\n');
    value = finalResult;
}

document.addEventListener('keydown',(event)=>{
    let pressedKey;
    if(event.key == "Enter"){
        pressedKey ="";
        calculateExcute();
    } else if (event.key == "Shift"){
        pressedKey= "";
    } else {
        pressedKey = event.key;
    }
    console.log("keyboard pressed :{}",pressedKey);
    if (value != null) {
        value = value + pressedKey;
        document.querySelector("#calculatedValue").innerHTML = value;
    } else {
        document.querySelector("#calculatedValue").innerHTML = pressedKey;
    } 
})