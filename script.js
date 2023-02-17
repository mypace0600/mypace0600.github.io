// 계산 관련 필요한 배열 목록
let mathKey = ["+", "-", "*", "/", "(", ")","="];
let historySave = [];
let tempList = [];
let formula = [];
let result = [];
let temp = [];

// 현재 창에 입력된 값
let value = document.querySelector("#calculatedValue").innerHTML;

// 마우스 입력 인식
const clickKeys = document.querySelectorAll(".numberKey");
clickKeys.forEach(clickKeys => {
    clickKeys.addEventListener("click", function() {
        if (value != null) {
            value = value + clickKeys.innerHTML;
            document.querySelector("#calculatedValue").innerHTML = value;
        } else {
            document.querySelector("#calculatedValue").innerHTML = clickKeys.innerHTML;
        }
    })
})

// 키보드 입력 인식
document.addEventListener('keydown',(event)=>{
    let pressedKey;
    const numberKey = /[0-9]/;
    if(event.key == "Enter"){
        pressedKey ="";
        let valueString = value + "=";
        formulaSplit(valueString);
        postFixFormula(tempList);
        value = calculateExcute(formula);
        valueString += value;
        historySave.push(valueString);
        if(value==="error"){
            value = 0;
        }
        document.querySelector("#calculatedValue").innerHTML = value;
        tempList=[];
        formula=[];
        result=[];
    } else if (event.key == "Shift"){
        pressedKey= "";
    } else if(mathKey.indexOf(event.key)>=0||numberKey.test(event.key)){
        pressedKey = event.key;
    } else {
        pressedKey = "";
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
    formulaSplit(valueString);
    postFixFormula(tempList);
    value = calculateExcute(formula);
    valueString += value;
    historySave.push(valueString);
    if(value==="error"){
        value = 0;
    }
    document.querySelector("#calculatedValue").innerHTML = value;
    tempList=[];
    formula=[];
    result=[];
});

// 수식에서 숫자 연산자 구분
function formulaSplit(valueString){
    let valueList = valueString.split("");
    let tempIndex = 0;
    let number;
    
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
    disticntFormula();
}

// 중복 연산자 제거 및 연산자 연속입력 수정
function disticntFormula(){
    let tempA = [];
    let t = 0;
    while(tempList[0]==="+"||tempList[0]==="*"||tempList[0]==="/"){
        tempList.shift();
    }
    while(t<tempList.length){
        if(mathKey.indexOf(tempList[t])>=0&&mathKey.indexOf(tempList[t+1])>=0){
            if(tempList[t]===tempList[t+1]){
                tempA.push(tempList[t]);
                t+=2;
            } else if (changePriority(tempList[t])>=changePriority(tempList[t+1])){
                tempA.push(tempList[t+1]);
                t+=2;
            } else {
                tempA.push(tempList[t]);
                t++;
            } 
        } else {
            tempA.push(tempList[t]);
            t++;
        }
    }
    tempList = tempA;
    inFixFormula();
}

// 중위 표기법으로 정리
function inFixFormula(){
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
    return checkError(result[0]);
}

// 수식 오류 확인
function checkError(result){
    if(isNaN(result)){
        alert("수식 오류");
        return "error";
    } else {
        return result;
    }
}

// 전체 삭제
const allClear = document.querySelector(".allClear").addEventListener("click", function() {
    value = "";
    document.querySelector("#calculatedValue").innerHTML = 0;
    historySave = [];
    tempList = [];
    formula = [];
    result = [];
    temp = [];
    deleteModalHistory();
})

// 계산 history 모달창
const openModal = () =>{
    historySave.forEach(element => {
        let historyDiv = document.getElementById("history");
        let row = document.createElement("div");
        row.setAttribute("class","historyRow");
        row.innerHTML = element;
        historyDiv.appendChild(row);
    });
    document.querySelector(".modal").classList.remove("hidden");
}
const closeModal = () =>{
    document.querySelector(".modal").classList.add("hidden");
}
document.querySelector(".historyBtn").addEventListener("click", openModal);
document.querySelector(".closeBtn").addEventListener("click",closeModal);
document.querySelector(".bg").addEventListener("click", closeModal);


// history 모달 내용 삭제
function deleteModalHistory(){
    var rows = document.querySelectorAll(".historyRow");
    rows.forEach(element => element.remove());
}

// 버튼 마우스 오버 아웃 기능
const allKeys = document.querySelectorAll(".key");
allKeys.forEach(element=>{
    element.addEventListener('mouseover',(event)=>{
        element.classList.add("mouseOver");
    });
    element.addEventListener('mouseout',(event)=>{
        element.classList.remove("mouseOver");
    })
})