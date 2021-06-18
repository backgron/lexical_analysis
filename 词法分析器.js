var keyWords = ["main", "if", "else", "do", "while", "for", "switch", "case", "int", "double", "float", "login", "void"];
//判断是否为关键字
function isKeyWord(char) {
    if (keyWords.indexOf(char) != -1)
        return true;
    else
        return false;
}
//判断是否为标识符
function isLetter(char) {
    if (/^[a-zA-Z]{1,}[0-9]{0,}[a-zA-Z]{0,}$/.test(char))
        return true;
    else
        return false;
}
//判断是否为数字
function isDigit(char) {
    if (/^[0-9]{1,}$/.test(char))
        return true;
    else
        return false;
}
//判断是否为运算符
function isOperators(char) {
    if ((/^[!:+*-/=<>]$/).test(char))
        return true;
    else
        return false;
}
//判断是否为复杂运算符
function isTowOperators(char) {
    if (/(^>=$|^<=$|^!=$|^\+{2}$|^--$)/.test(char))
        return true;
    else
        return false;
}
//判断是否为界符
function isDelimiter(char) {
    if (/^[,;.\(\)\[\]\{\}\#]$/.test(char))
        return true;
    else
        return false;
}
//判断是否为空格或者tab
function isBlank(char) {
    if (/^[ \t]$/.test(char))
        return true;
    else
        return false;
}
//初始化代码
function initStringToArray(str) {
    //在界符和运算符两端加空格
    var newStr = '';
    for (var i = 0; i < str.length; i++) {
        var char = str[i];
        if (isOperators(str[i]) || isDelimiter(str[i])) {
            char = " " + str[i] + " ";
        }
        newStr += char;
        char = '';
    }
    //去掉多余的空格和换行
    if (newStr != "") {
        newStr = newStr.replace(/\s+/g, " ");
        //去掉开头和结束的空格
        newStr = newStr.trim();
        var arr = newStr.split(' ');
    }
    return arr;
}
//词法分析
function getElements(arr, json) {
    var elements = [];
    for (let i = 0; i < arr.length; i++) {
        var element = {};
        if (isDelimiter(arr[i])) {
            element.text = arr[i];
            element.value = json[arr[i]];
            element.type = "界符";
        } else if (isKeyWord(arr[i])) {
            element.text = arr[i];
            element.value = json[arr[i]];
            element.type = "关键字";
        } else if (isDigit(arr[i])) {
            element.text = arr[i];
            element.value = json.Num;
            element.type = "常量";
        } else if (isLetter(arr[i])) {
            element.text = arr[i];
            element.value = json.Letter;
            element.type = "标识符";
        } else if (isOperators(arr[i])) {
            if (i + 1 >= arr.length || !isTowOperators(arr[i] + arr[i + 1])) { //如果为最后一个字符或者 加上 下一个不是运算符 直接输出
                element.text = arr[i];
                element.value = json[arr[i]];
                element.type = "运算符";
            } else if (isTowOperators(arr[i] + arr[i + 1])) {
                element.text = (arr[i] + arr[i + 1]);
                element.value = json[arr[i] + arr[i + 1]];
                element.type = "运算符";
                i++;
            }
        } else {
            element.text = arr[i];
            element.value = 'error：The definition here is irregular';
            element.type = "错误";
        }
        elements.push(element);
    }
    return elements;
}