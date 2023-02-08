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
})



const calculate = document.querySelector(".calculate").addEventListener("click", function() {
    var valueString = document.querySelector("input[type=text").value + "=";
    var valueList = valueString.split("");
    console.log(valueList);

    var mathKey = ["+", "-", "*", "/", "%", "="];
    var index;
    var tempIndex = 0;
    var point;
    var number;
    var tempList = [];
    for (index = 0; index < valueList.length; index++) {
        for (point = 0; point < mathKey.length; point++) {
            if (valueList[index] === mathKey[point]) {
                console.log("index= " + index);
                console.log("point= " + point);
                number = valueString.substring(tempIndex, index);
                tempList.push(number);
                tempList.push(mathKey[point]);
                tempIndex = index + 1;
            }
        }
    }
    times(tempList);
    console.log("times function end:{}", tempList);
    divide(tempList);
    console.log("divide function end:{}", tempList);
    plus(tempList);
    console.log("plus function end:{}", tempList);
    minus(tempList);
    console.log("minus function end:{}", tempList);
    
    var finalIndex = tempList.length;
    var finalResult = tempList[finalIndex-2];
    document.querySelector("input[type=text").value = finalResult;
});

function times(tempList) {
    var i;
    for (i = 0; i < tempList.length; i++) {
        if (tempList[i] == "*") {
            if(tempList[i-2]=="-"){
                tempList.splice(i-2,2,'+',tempList[i-1]*-1);
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
            var result = Number(tempList[i - 1]) / Number(tempList[i + 1]);
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


