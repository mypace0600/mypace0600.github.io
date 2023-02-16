const inputNumbers = document.querySelectorAll(".numberKey");
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

let value = document.querySelector("#calculatedValue").innerHTML;

document.addEventListener('keydown',(event)=>{
    let pressedKey;
    if(event.key == "Enter"){
        pressedKey ="";
        let valueString = value + "=";
        inFixFormula(valueString);
        checkFormula(tempList);
        postFixFormula(tempList);
        calculateExcute(formula);
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

let historySave = [];
let mathKey = ["+", "-", "*", "/", "(", ")","="];
let tempList = [];
let formula = [];
let result = [];

const allClear = document.querySelector(".allClear").addEventListener("click", function() {
    value = "";
    document.querySelector("#calculatedValue").innerHTML = 0;
    tempList = [];
    formula = [];
    result = [];
    historySave = [];
})

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

const calculate = document.querySelector(".calculate").addEventListener("click", function() {
    let valueString = value + "=";
    inFixFormula(valueString);
    checkFormula(tempList);
    postFixFormula(tempList);
    value = calculateExcute(formula);
    document.querySelector("#calculatedValue").innerHTML = value;
});

function changePriority(a){
    console.log("함수에 입력된 값 :{}",a);
    if(a==="*" || a==="/"){
        return 1;
    } else if (a==="+" || a==="-"){
        return 2;
    }
}

function postFixFormula(tempList){
    let stackMathKey = [];
    for(let i = 0; i<tempList.length;i++){
        console.log("i :{}",i);
        console.log("tempList[i] :{}",tempList[i]);

        if(mathKey.indexOf(tempList[i])<0){
            formula.push(tempList[i]);
        } else {
            if(stackMathKey.length>0){
                if(tempList[i]==="("){
                    stackMathKey.push(tempList[i]);
                } else {
                    if(tempList[i]===")"){
                        stackMathKey.push(tempList[i]);
                        for(let t=stackMathKey.length-1;t>=0;t--){
                            if(stackMathKey[t]!=")" && stackMathKey[t]!="("){
                                formula.push(stackMathKey[t]);
                            } 
                        }
                        stackMathKey.pop();
                        stackMathKey.pop();
                        stackMathKey.pop();
                    } else if(stackMathKey[stackMathKey.length-1]!="("){
                        if(changePriority(stackMathKey[stackMathKey.length-1])>changePriority(tempList[i])){
                            stackMathKey.push(tempList[i]);
                        } else {
                            formula.push(stackMathKey[stackMathKey.length-1]);
                            stackMathKey.pop();
                            stackMathKey.push(tempList[i]);
                        }
                    } else {
                        stackMathKey.push(tempList[i]);
                    }
                }
            } else {
                stackMathKey.push(tempList[i]);
            }
        }
        console.log("formula :{}",formula);
        console.log("stackMathKey :{}",stackMathKey);

    }
    for(let i = stackMathKey.length-1;i>=0;i--){
        formula.push(stackMathKey[i]);
    }
    console.log("후위 표기법 :{}",formula);
    return formula;
}

function inFixFormula(valueString){
    // let valueString = document.querySelector("#calculatedValue").innerHTML + "=";
    let valueList = valueString.split("");
    let index;
    let tempIndex = 0;
    let number;
    
    for (index = 0; index < valueList.length; index++) {
        if (mathKey.indexOf(valueList[index])>=0) {
            number = valueString.substring(tempIndex, index);
            if(number!=""){
                tempList.push(number);
            }
            tempList.push(valueList[index]);
            tempIndex = index + 1;
        }
    }
    tempList.pop();
    console.log("tempList :{}",tempList);
    return tempList;
}

function calculateExcute(formula){
    let i = 0;
    while(i<formula.length){
        if(mathKey.indexOf(formula[i])<0){
            result.push(formula[i]);
        } else if (formula[i]==="+"){
            let len = result.length;
            let c = Number(result[len-2])+Number(result[len-1]);
            result.pop();
            result.pop();
            result.push(c.toString());
        } else if (formula[i]==="-"){
            let len = result.length;
            let c = Number(result[len-2])-Number(result[len-1]);
            result.pop();
            result.pop();
            result.push(c.toString());
        } else if (formula[i]==="*"){
            let len = result.length;
            let c = Number(result[len-2])*Number(result[len-1]);
            result.pop();
            result.pop();
            result.push(c.toString());
        } else if (formula[i]==="/"){
            let len = result.length;
            let c = Number(result[len-2])/Number(result[len-1]);
            result.pop();
            result.pop();
            result.push(c.toString());
        }
        i++;
        console.log("result :{}",result);
    }
    console.log("결과 :{}",result);
    return result[0];
}

    


const historyBtn = document.querySelector(".historyBtn").addEventListener("click", function() {
    alert(historySave);
})