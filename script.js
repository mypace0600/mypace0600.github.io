const inputNumbers = document.querySelectorAll(".numberKey");
var value = document.querySelector("input[type=text]").value;

inputNumbers.forEach(inputNumber => {
    inputNumber.addEventListener("click", function() {
        if (value != null) {
            value = value + inputNumber.innerHTML;
            document.querySelector("input[type=text]").value = value;
        } else {
            document.querySelector("input[type=text]").value = inputNumber.innerHTML;
        }
    })
})

const allClear = document.querySelector(".allClear").addEventListener("click", function() {
    value = "";
    document.querySelector("input[type=text]").value = "";
    historySave = [];
})

let historySave = [];

const calculate = document.querySelector(".calculate").addEventListener("click", function() {
    var valueString = document.querySelector("input[type=text").value + "=";
    var valueList = valueString.split("");
    console.log("valueList :{}",valueList);

    var mathKey = ["+", "-", "*", "/", "%", "="];
    var index;
    var tempIndex = 0;
    var number;
    var tempList = [];
    
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

    var finalIndex = tempList.length;
    var finalResult = tempList[finalIndex-2];
    console.log("finalResult :{}",finalResult);
    console.log("finalResult type:{}",typeof(finalResult));
    if(isNaN(finalResult)){
        alert("수식 오류!");
        finalResult=null;
    }
    document.querySelector("input[type=text").value = finalResult;
   
    historySave.push(value+"="+finalResult+'\r\n');
    value = finalResult;
});

function checkFormula(tempList){
    var i;
    for (i=0;i<tempList.length;i++){
        if(tempList[i]=="-"){
            if(tempList[i-1]=="" && i == 1){
                tempList.splice(i-1,3,0,"+",tempList[i+1]*-1);
            } else if (tempList[i-1]=="" && (tempList[i-2]=="*" || tempList[i-2]=="/")){
                tempList.splice(i-1,3,tempList[i+1]*-1,"*",1);
            }
        }
    }
}


function times(tempList) {
    var i;
    for (i = 0; i < tempList.length; i++) {
        if (tempList[i] == "*") {
            if(tempList[i-2]=="-"){
                tempList.splice(i-2,2,"+",tempList[i-1]*-1);
            }
            var result = Number(tempList[i - 1]) * Number(tempList[i + 1]);
            tempList.splice(i - 1, 3, 0, '+', result);
        }
    }
}

function divide(tempList) {
    var i;
    for (i = 0; i < tempList.length; i++) {
        if (tempList[i] == "/") {
            if(tempList[i-2]=="-"){
                tempList.splice(i-2,2,"+",tempList[i-1]*-1);
            }
            var result = Number(tempList[i - 1]) / Number(tempList[i + 1]).toFixed(5);
            tempList.splice(i - 1, 3, 0, '+', result);
        }
    }
}

function percent(tempList){
    var i; 
    for (i = 0; i < tempList.length; i++) {
        if (tempList[i] == "%") {
            var result = Number(tempList[i - 1]) % Number(tempList[i + 1]).toFixed(5);
            tempList.splice(i - 1, 3, 0, '+', result);
        }
    }
}

function plus(tempList) {
    var i;
    for (i = 0; i < tempList.length; i++) {
        if (tempList[i] == "+") {
            var result = Number(tempList[i - 1] )+ Number(tempList[i + 1]);
            tempList.splice(i - 1, 3, 0, '+', result);
        }
    }
}

function minus(tempList) {
    var i;
    for (i = 0; i < tempList.length; i++) {
        if (tempList[i] == "-") {
            var result = Number(tempList[i - 1]) - Number(tempList[i + 1]);
            tempList.splice(i - 1, 3, 0, '+', result);
        }
    }
}

const historyBtn = document.querySelector(".historyBtn").addEventListener("click", function() {
    alert(historySave);
})