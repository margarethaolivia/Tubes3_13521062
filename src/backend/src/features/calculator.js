/* ------------------------------ File : calculator.js ------------------------------- */
/*           Find the result value of mathematical expression in user query            */

// isOperand function
// Return true if the token is a digit
function isOperand(token) {
    return /\d/.test(token)
}

// getLenOperand function
// Return the length of string that represent a number in the expression starting from start
function getLenOperand(expression, start) {
    var len = 0, i = start

    // While the string is still a number
    while (i < expression.length && (isOperand(expression[i]) || expression[i] == '.') ) {
        len++
        i++
    }

    return len
}

// stringToNumber function
// Return the number that represents the operand string
function stringToNumber(operand) {
    return parseFloat(operand)
}

// isOperator function
// Return true if the token is a valid mathematical operator (+, -, *, /, ^)
function isOperator(token) {
    return (token == '+') || (token == '-') || (token == '*') || (token == '/') || (token == '^')
}

// precedence function
// Return the number that represents the precedence/priority of operator ( ^ > * / > + - > other)
function precedence(token) {
    if (isOperator(token)) {
        if (token == '^') {
            return 3
        }
        else if (token == '*' || token == '/') {
            return 2
        }
        else {
            return 1
        }
    }
    else {
        return -1
    }
}

// applyOperator function
// Return the calculation value of applying operator to the first and second operand
// Throw exception when dividing with 0 or raising 0 to the power of 0
function applyOperator(operand1, operand2, operator) {
    if (operator == '+') {
        return operand1 + operand2
    }
    else if (operator == '-') {
        return operand1 - operand2
    }
    else if (operator == '*') {
        return operand1 * operand2
    }
    else if (operator == '/') {
        if (operand2 == 0) throw "Tidak bisa membagi dengan 0"
        return operand1 / operand2
    }
    else {
        if (operand1 == 0 && operand2 == 0) throw "Tidak bisa memangkatkan 0 dengan 0"
        return Math.pow(operand1, operand2)
    }
}

// evaluate function
// Return the value of evaluation expression from user query. Return exception string if expression not valid or cannot do the calculation
export function evaluate(expression) {
    // Declare and initialize all needed variable
    var opStack = [], valStack = [], i = 0,  factor = 1, end = false, openParen = false, operandJustNow = false, negative = false
    var token, operator, operand1, operand2, result, len

    try {
        // Start parsing through the expression
        while (i < expression.length && !end) {
            token = expression[i]
            
            // If token is an operand, get the full number value and push it to val stack
            if (isOperand(token)) {
                openParen = false
                operandJustNow = true

                len = getLenOperand(expression, i)
                valStack.push(stringToNumber(expression.substr(i, len)*factor))
                factor = 1

                i += len
            }
            // If token is an operator, process according to parsing state so far
            else if (isOperator(token)) {
                // If the operand is not - but the last token is (, throw exception
                if (openParen && token != '-') throw "Sintaks ekspresi matematika memiliki kesalahan"

                // If the operator is - preceded by no operand, the next operand will be negative
                if (!operandJustNow && token == '-') {
                    factor = -1
                }
                else {
                    // If the op stack is empty, push the operator no matter what
                    if (opStack.length == 0) {
                        opStack.push(token)
                    }
                    // If the op stack is not empty, process according to operator precedence
                    else {
                        // If this operator is higher in precedence than the top of op stack, push it
                        if (precedence(token) > precedence(opStack[opStack.length-1])) {
                            opStack.push(token)
                        }
                        // If this operator is lower in precedence, process the stack first before pushing
                        else {
                            // While the top operator is still higher or the same in precedence, process the stack and calculate value
                            while (precedence(opStack[opStack.length-1]) >= precedence(token) && opStack.length != 0) {
                                operand2 = valStack.pop()
                                operand1 = valStack.pop()
                                operator = opStack.pop()
                                valStack.push(applyOperator(operand1, operand2, operator))
                            }
                            // If the requirement to make the top value of val stack is fulfilled, change it to negative
                            if (negative) {
                                valStack[valStack.length-1] *= -1
                                negative = false
                            }
                            // Push the operator
                            opStack.push(token)
                        }
                    }
                }
                operandJustNow = false
                i++
            }
            // If the token if (, push it and changes some parsing state
            else if (token == '(') {
                openParen = true
                operandJustNow = false
                // If the last - is unary, the next operand should not be negative. Rather, the next expression in parenthesis should be negative
                if (factor == -1) {
                    negative = true
                    factor = 1
                }
                opStack.push(token)
                i++
            }
            // If the token is ), process the stack until it find the (
            else if (token == ')') {
                // If the ( appear right after ), throw exception
                if (openParen) throw "Sintaks ekspresi matematika memiliki kesalahan"

                // Process the stack and calculate value
                while (opStack.length !=0 && opStack[opStack.length-1] != '(' ) {
                    operand2 = valStack.pop()
                    operand1 = valStack.pop()
                    operator = opStack.pop()
                    valStack.push(applyOperator(operand1, operand2, operator))
                }
                // If the requirement to make the top value of val stack is fulfilled, change it to negative
                if (negative) {
                    valStack[valStack.length-1] *= -1
                    negative = false
                }
                
                // If the op stack is empty (does not find ( ), throw exception
                if (opStack.length == 0) throw "Sintaks ekspresi matematika memiliki kesalahan"

                // Pop the (
                opStack.pop()
                i++
            }
            // If the token is whitespace, parse the next token
            else if (token == ' ') {
                i++
            }
            // Other than that, stop the parsing
            else {
                end = true
            }
        }

        // Process the remaining element in stack and calculate value
        while (opStack.length != 0 && valStack.length > 1) {
            operator = opStack.pop()
            // If ( or ) still found in the stack, throw exception
            if (!isOperator(operator)) throw "Sintaks ekspresi matematika memiliki kesalahan"
            operand2 = valStack.pop()
            operand1 = valStack.pop()
            valStack.push(applyOperator(operand1, operand2, operator))
        }
        // If the requirement to make the top value of val stack is fulfilled, change it to negative
        if (negative) {
            valStack[valStack.length-1] *= -1
            negative = false
        }
        // If the op stack not empty or the val stack still have more than 1 element, throw exception
        if (valStack.length != 1 || opStack.length != 0) throw "Sintaks ekspresi matematika memiliki kesalahan"
        
        // Return the result
        result = valStack.pop()
        return result
    }
    catch (err) {
        // Catch exception and return it as exception string
        return err
    }
}