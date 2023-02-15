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

    let mathKey = ["+", "-", "*", "/", "(", ")","="];
    let index;
    let tempIndex = 0;
    let number;
    let tempList = [];
    
    for (index = 0; index < valueList.length; index++) {
        if (mathKey.indexOf(valueList[index])>=0) {
            console.log("tempIndex= " + tempIndex);
            console.log("index= " + index);
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

    let formula = [];
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
                    console.log("( 이 입력된 경우 무조건 stack에 push :{}",stackMathKey);
                } else {
                    if(tempList[i]===")"){
                        let index = stackMathKey.length;
                        while(index>0){
                            if(stackMathKey[index]==="("){
                                break;
                            } else {
                                formula.push(stackMathKey[index]);
                                stackMathKey.pop();
                                console.log(") 이 입력된 경우 (가 나올때 까지 stack에서 formula로 push :{}",formula);
                                console.log(") 이 입력된 경우 (가 나올때 까지 stack은 pop :{}",stackMathKey);
                                index--;
                            }
                        }
                    } else if(changePriority(stackMathKey[stackMathKey.length-1])>=changePriority(tempList[i])){
                        console.log("stackMathKey[stackMathKey.length-1]에 해당하는 값은 :{}",stackMathKey[stackMathKey.length-1]);
                        console.log("tempList[i]에 해당하는 값은 :{}",tempList[i]);
                        console.log(") 이 입력된 경우 (가 나올때 까지 stack은 pop :{}",stackMathKey);
                        stackMathKey.push(tempList[i]);
                        console.log("지금 우리 stack은 :{}",stackMathKey);
                    } else {
                        formula.push(stackMathKey[stackMathKey.length-1]);
                        stackMathKey.pop();
                        stackMathKey.push(tempList[i]);
                        console.log("지금 우리 formula눈  :{}",formula);
                        console.log("지금 우리 stack은 2 :{}",stackMathKey);
                    }
                }
            } else {
                stackMathKey.push(tempList[i]);
                console.log("연산자가 처음인 경우 무조건 stack에 push :{}",stackMathKey);
            }
        }
        console.log("formula :{}",formula);
        console.log("stackMathKey :{}",stackMathKey);

    }
    for(let i = stackMathKey.length-1;i>=0;i--){
        formula.push(stackMathKey[i]);
    }
    console.log("후위 표기법 :{}",formula);

});

function changePriority(a){
    console.log("함수에 입력된 값 :{}",a);
    if(a==="*" || a==="/"){
        return 1;
    } else if (a==="+" || a==="-"){
        return 2;
    }
}

    // checkFormula(tempList);
    // console.log("after checkFormula :{}",tempList);
    // times(tempList);
    // divide(tempList);
    // percent(tempList);
    // plus(tempList);
    // minus(tempList);

    // let finalIndex = tempList.length;
    // let finalResult = tempList[finalIndex-2];
    // console.log("finalResult :{}",finalResult);
    // console.log("finalResult type:{}",typeof(finalResult));
    // if(isNaN(finalResult)){
    //     alert("수식 오류!");
    //     finalResult=null;
    // }
    // document.querySelector("#calculatedValue").innerHTML = finalResult;
   
    // historySave.push(value+"="+finalResult+'\r\n');
    // value = finalResult;
    // });

// function checkFormula(tempList){
//     let i;
//     for (i=0;i<tempList.length;i++){
//         if(tempList[i] === "-"){
//             if(tempList[i-1] === "" && i === 1){
//                 tempList.splice(i-1,3,0,"+",tempList[i+1]*-1);
//             } else if (tempList[i-1] === "" && (tempList[i-2] === "*" || tempList[i-2] === "/")){
//                 tempList.splice(i-1,3,tempList[i+1]*-1,"*",1);
//             }
//         }
//     }
// }


// function times(tempList) {
//     let i;
//     for (i = 0; i < tempList.length; i++) {
//         if (tempList[i] === "*") {
//             if(tempList[i-2] ==="-"){
//                 tempList.splice(i-2,2,"+",tempList[i-1]*-1);
//             }
//             let result = Number(tempList[i - 1]) * Number(tempList[i + 1]);
//             tempList.splice(i - 1, 3, 0, '+', result);
//         }
//     }
// }

// function divide(tempList) {
//     let i;
//     for (i = 0; i < tempList.length; i++) {
//         if (tempList[i] === "/") {
//             if(tempList[i-2]==="-"){
//                 tempList.splice(i-2,2,"+",tempList[i-1]*-1);
//             }
//             let result = Number(tempList[i - 1]) / Number(tempList[i + 1]).toFixed(5);
//             tempList.splice(i - 1, 3, 0, '+', result);
//         }
//     }
// }

// function percent(tempList){
//     let i; 
//     for (i = 0; i < tempList.length; i++) {
//         if (tempList[i] === "%") {
//             let result = Number(tempList[i - 1]) % Number(tempList[i + 1]).toFixed(5);
//             tempList.splice(i - 1, 3, 0, '+', result);
//         }
//     }
// }

// function plus(tempList) {
//     let i;
//     for (i = 0; i < tempList.length; i++) {
//         if (tempList[i] === "+") {
//             let result = Number(tempList[i - 1] )+ Number(tempList[i + 1]);
//             tempList.splice(i - 1, 3, 0, '+', result);
//         }
//     }
// }

// function minus(tempList) {
//     let i;
//     for (i = 0; i < tempList.length; i++) {
//         if (tempList[i] === "-") {
//             let result = Number(tempList[i - 1]) - Number(tempList[i + 1]);
//             tempList.splice(i - 1, 3, 0, '+', result);
//         }
//     }
// }

// const historyBtn = document.querySelector(".historyBtn").addEventListener("click", function() {
//     alert(historySave);
// })

// function calculateExcute(){
//     let valueString = document.querySelector("#calculatedValue").innerHTML + "=";
//     let valueList = valueString.split("");
//     console.log("valueList :{}",valueList);

//     let mathKey = ["+", "-", "*", "/", "%", "="];
//     let index;
//     let tempIndex = 0;
//     let number;
//     let tempList = [];
    
//     for (index = 0; index < valueList.length; index++) {
//         if (mathKey.indexOf(valueList[index])>=0) {
//             console.log("tempIndex= " + tempIndex);
//             console.log("index= " + index);
//             number = valueString.substring(tempIndex, index);
//             tempList.push(number);
//             tempList.push(valueList[index]);
//             tempIndex = index + 1;
//         }
//     }
//     console.log("tempList :{}",tempList);

//     checkFormula(tempList);
//     console.log("after checkFormula :{}",tempList);
//     times(tempList);
//     divide(tempList);
//     percent(tempList);
//     plus(tempList);
//     minus(tempList);

//     let finalIndex = tempList.length;
//     let finalResult = tempList[finalIndex-2];
//     console.log("finalResult :{}",finalResult);
//     console.log("finalResult type:{}",typeof(finalResult));
//     if(isNaN(finalResult)){
//         alert("수식 오류!");
//         finalResult=null;
//     }
//     document.querySelector("#calculatedValue").innerHTML = finalResult;
   
//     historySave.push(value+"="+finalResult+'\r\n');
//     value = finalResult;
// }

// document.addEventListener('keydown',(event)=>{
//     let pressedKey;
//     if(event.key == "Enter"){
//         pressedKey ="";
//         calculateExcute();
//     } else if (event.key == "Shift"){
//         pressedKey= "";
//     } else {
//         pressedKey = event.key;
//     }
//     console.log("keyboard pressed :{}",pressedKey);
//     if (value != null) {
//         value = value + pressedKey;
//         document.querySelector("#calculatedValue").innerHTML = value;
//     } else {
//         document.querySelector("#calculatedValue").innerHTML = pressedKey;
//     } 
// })