let g_expression = "";

function receiveInput(inputValue){
    //TODO replace operator if 2 in a row
    let currentValue = document.getElementById("resultBox").value;
    if(currentValue === "0"){
        document.getElementById("resultBox").value = inputValue;
        g_expression = inputValue;
    }
    else{
        document.getElementById("resultBox").value += inputValue;
        g_expression += inputValue;
    }
}

function clearEntry(){
    let element = document.getElementById("resultBox");
    let currentValue = element.value;
    if(currentValue.length <= 1){
        element.value = "0";
        g_expression = "0";
    }
    else{
        element.value = element.value.substring(0,element.value.length-1);
        g_expression = g_expression.substring(0,g_expression.length-1);
    }
}

function clearExpression(){
    document.getElementById("resultBox").value = "0";
    g_expression = "";
}

function evaluateExpression(){
    let expressionLabel = document.getElementById("previousExpressionLabel");
    let resultBox = document.getElementById("resultBox");
    let expression = g_expression;
    let result = "";
    try{
        if(expression === ""){
            resultBox.value = "0";
            return;
        }
        //Brackets
        let i = 0;
        let stack = [];
        while(i < expression.length)
        {
            if(expression.substring(i,i+1)==="("){
                stack.push(i);
            }
            if(expression.substring(i,i+1)===")"){
                if(stack.length<1){
                    throw "Right Bracket First Exception";
                }
                let temp = stack.pop();
                let temp_expression = expression.substring(temp+1,i-1);
                //empty expression
                if(temp_expression == "")
                {
                    throw "Empty Brackets Exception";
                }
                let temp_result = evaluate(temp_expression);
                expression.replace( expression.substring(temp,i) , temp_result);
            }
            i++;
        }
        result = evaluate(expression);
    }
    catch(e){
        console.log(e)
        expressionLabel.value = g_expression+"=ERROR";
        resultBox = "ERROR";
    }
    expressionLabel.value = g_expression;
    resultBox.value = result;
}

function evaluate(p_expression){
    let expression = p_expression;
    if(isOperator(expression.substring(0,1)) || isOperator(expression.substring(expression.length-1,expression.length))){
        throw "Operator as first or last element.";
    }
    //Mult/Div
    let i = 0;
    while(i < expression.length){
        console.log(i);
        let c = expression.substring(i,i+1);
        console.log(c);
        if(isOperator(c)){
            if(c === "*"){
                let startIndex = -1;
                let endIndex = -1;
                let num1 = "";
                let num2 = "";
                let j = i-1;
                while(j >= -1){
                    if(isOperator(expression.substring(j,j+1)) || j === -1){
                        num1 = expression.substring(j+1,i);
                        startIndex = j+1;
                        break;
                    }
                    j--;
                }
                j = i+1;
                while(j <= expression.length){
                    if(isOperator(expression.substring(j,j+1)) || j===p_expression.length){
                        num2 = expression.substring(i+1,j);
                        endIndex = j-1;
                        break;
                    }
                    j++;
                }
                console.log("Num1/Num2 " + num1 + " = " + num2 );
                if(isNumber(num1) && isNumber(num2)){
                    let temp_result = Number(num1) * Number(num2);
                    console.log("tempResult = " + temp_result);
                    expression = expression.replace( expression.substring(startIndex,endIndex+1) , temp_result );
                    console.log("expression = " + expression);
                    if(!isNumber(expression)){
                        console.log("recursion time");
                        expression = evaluate(expression);
                    }
                }
            }
            if(c === "/"){
                let startIndex = -1;
                let endIndex = -1;
                let num1 = "";
                let num2 = "";
                let j = i-1;
                while(j >= -1){
                    if(isOperator(expression.substring(j,j+1)) || j === -1){
                        num1 = expression.substring(j+1,i);
                        startIndex = j+1;
                        break;
                    }
                    j--;
                }
                j = i+1;
                while(j <= expression.length){
                    if(isOperator(expression.substring(j,j+1)) || j===p_expression.length){
                        num2 = expression.substring(i+1,j);
                        endIndex = j-1;
                        break;
                    }
                    j++;
                }
                if(isNumber(num1) && isNumber(num2)){
                    let temp_result = Number(num1) / Number(num2);
                    console.log("Num1/Num2 " + num1 + " = " + num2 );
                    console.log("tempResult = " + temp_result);
                    expression = expression.replace( expression.substring(startIndex,endIndex+1) , temp_result );
                    console.log("expression = " + expression);
                    if(!isNumber(expression)){
                        console.log("recursion time");
                        expression = evaluate(expression);
                    }
                }
            }
        }
        i++;
    }

    //Add/Subtract
    i = 0;
    while(i < expression.length){
        console.log(i);
        let c = expression.substring(i,i+1);
        if(isOperator(c)){
            if(c === "+"){
                let startIndex = -1;
                let endIndex = -1;
                let num1 = "";
                let num2 = "";
                let j = i-1;
                while(j >= -1){
                    if(isOperator(expression.substring(j,j+1)) || j === -1){
                        num1 = expression.substring(j+1,i);
                        startIndex = j+1;
                        break;
                    }
                    j--;
                }
                j = i+1;
                while(j <= expression.length){
                    if(isOperator(expression.substring(j,j+1)) || j===p_expression.length){
                        num2 = expression.substring(i+1,j);
                        endIndex = j-1;
                        break;
                    }
                    j++;
                }
                if(isNumber(num1) && isNumber(num2)){
                    let temp_result = Number(num1) + Number(num2);
                    console.log("Num1/Num2 " + num1 + " = " + num2 );
                    console.log("tempResult = " + temp_result);
                    expression = expression.replace( expression.substring(startIndex,endIndex+1) , temp_result );
                    console.log("expression = " + expression);
                    if(!isNumber(expression)){
                        console.log("recursion time");
                        expression = evaluate(expression);
                    }
                }
            }
            if(c === "-"){
                let startIndex = -1;
                let endIndex = -1;
                let num1 = "";
                let num2 = "";
                let j = i-1;
                while(j >= -1){
                    if(isOperator(expression.substring(j,j+1)) || j === -1){
                        num1 = expression.substring(j+1,i);
                        startIndex = j+1;
                        break;
                    }
                    j--;
                }
                j = i+1;
                while(j <= expression.length){
                    if(isOperator(expression.substring(j,j+1)) || j===p_expression.length){
                        num2 = expression.substring(i+1,j);
                        endIndex = j-1;
                        break;
                    }
                    j++;
                }
                if(isNumber(num1) && isNumber(num2)){
                    let temp_result = Number(num1) - Number(num2);
                    console.log("Num1/Num2 " + num1 + " = " + num2 );
                    console.log("tempResult = " + temp_result);
                    expression = expression.replace( expression.substring(startIndex,endIndex+1) , temp_result );
                    console.log("expression = " + expression);
                    if(!isNumber(expression)){
                        console.log("recursion time");
                        expression = evaluate(expression);
                    }
                }
            }
        }
        i++;
    }

    return expression;
}

function isOperator(p_char){
    if(p_char == "+" || 
        p_char == "-" || 
        p_char == "*" || 
        p_char == "/"){
        return true;
    }
    return false;
}

function isNumber(p_string){
    if(p_string.match(/^-{0,1}\d+$/)){
        return true;
    }
    if(p_string.match(/^\d+\.\d+$/)){
        return true;
    }
    return false;
}