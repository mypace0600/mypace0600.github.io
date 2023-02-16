// 계산 관련 필요한 배열 목록
let mathKey = ["+", "-", "*", "/", "(", ")","="];
let historySave = [];
let tempList = [];
let formula = [];
let result = [];

// 현재 창에 입력된 값
let value = document.querySelector("#calculatedValue").innerHTML;

// 마우스 입력 인식
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

// 키보드 입력 인식
document.addEventListener('keydown',(event)=>{
    let pressedKey;
    if(event.key == "Enter"){
        pressedKey ="";
        let valueString = value + "=";
        inFixFormula(valueString);
        postFixFormula(tempList);
        value = calculateExcute(formula);
        valueString += value;
        historySave.push(valueString);
        document.querySelector("#calculatedValue").innerHTML = value;
        tempList=[];
        formula=[];
        result=[];
    } else if (event.key == "Shift"){
        pressedKey= "";
    } else {
        pressedKey = event.key;
    }
    if (value != null) {
        value = value + pressedKey;
        document.querySelector("#calculatedValue").innerHTML = value;
    } else {
        document.querySelector("#calculatedValue").innerHTML = pressedKey;
    } 
})

// = 버튼 클릭 인식
const calculate = document.querySelector(".calculate").addEventListener("click", function() {
    let valueString = value + "=";
    inFixFormula(valueString);
    postFixFormula(tempList);
    value = calculateExcute(formula);
    valueString += value;
    historySave.push(valueString);
    document.querySelector("#calculatedValue").innerHTML = value;
    tempList=[];
    formula=[];
    result=[];
});

// 중위표기법으로 정리
function inFixFormula(valueString){
    let valueList = valueString.split("");
    let tempIndex = 0;
    let number;
    let temp = [];
    
    for (let i = 0; i < valueList.length; i++) {
        if (mathKey.indexOf(valueList[i])>=0) {
            number = valueString.substring(tempIndex, i);
            if(number!=""){
                tempList.push(number);
            }
            tempList.push(valueList[i]);
            tempIndex = i + 1;
        }
    }
    tempList.pop();
    let i=0;
    while(i<tempList.length){
        if(tempList[i]==="-"){
            if(i===0){
                temp.push(tempList[i+1]*-1);
                i+=2;
            } else if(tempList[i-1]==="*"||tempList[i-1]==="/"){
                temp.push(tempList[i+1]*-1);
                i+=2;
            } else if(temp[temp.length-1]==="+"){
                temp.pop();
                temp.push(tempList[i]);
                i++;
            } else if(temp[temp.length-1]==="-"){
                i++;
                continue;
            } else {
                temp.push(tempList[i]);
                i++;
            }
        } else {
            temp.push(tempList[i]);
            i++;
        }
    }
    tempList = temp;
    return tempList;
}

// 연산자 우선순위 확인
function changePriority(a){
    if(a==="*" || a==="/"){
        return 1;
    } else if (a==="+" || a==="-"){
        return 2;
    }
}

// 후위표기법으로 변환
function postFixFormula(tempList){
    let stackMathKey = [];
    for(let i = 0; i<tempList.length;i++){

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
    }
    for(let i = stackMathKey.length-1;i>=0;i--){
        formula.push(stackMathKey[i]);
    }
    return formula;
}

// 계산 실행
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
    }
    return result[0];
}

// 전체 삭제
const allClear = document.querySelector(".allClear").addEventListener("click", function() {
    value = "";
    document.querySelector("#calculatedValue").innerHTML = 0;
    tempList = [];
    formula = [];
    result = [];
    historySave = [];
})

// 계산 history 모달창

const openModal = () =>{
    document.querySelector(".modal").classList.remove("hidden");
}
const closeModal = () =>{
    document.querySelector(".modal").classList.add("hidden");
}
document.querySelector(".historyBtn").addEventListener("click", openModal);
document.querySelector(".closeBtn").addEventListener("click",closeModal);