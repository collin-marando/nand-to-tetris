
//Buffers
var char, sym;
var lineBuffer = "";

//Flags
var EOF;
var decl = false;

//Tables
var classSymTab = {};
var methodSymTab = {};

//Counters
var varIndexes = {"var": 0, "argument": 0, "static": 0, "field": 0};

//Global States
var className;

var lines, out;
function parse(code){
	lines = code.split(/[\n\r]+/g);
	
	out = [];
	sym = null;
	EOF = false;
	nextChar();
	subParse("parseClass", "class");
	return out;
}

var tabs = "";
function subParse(name, alias){
	alias = alias == undefined ? name : alias;
	console.log(alias+"Start");
	out.push(tabs+"<"+alias+">");
	tabs += "\t";
	window[name]();
	tabs = tabs.slice(1);
	out.push(tabs+"</"+alias+">");
	console.log(alias+"End");
}

function accept(type, value){
	if(sym.type == type && (value == undefined || sym.value == value)){
		nextSym();
	} else {
		if(value){
			console.error("Error: expected "+type+": "+value+", got "+sym.type+": "+sym.value);
		} else {
			console.error("Error: expected "+type+", got "+sym.type);
		}
		exit();
	}
}

function symIs(type, values){
	if(values){
		return sym.type == type && values.includes(sym.value);
	} else {
		return sym.type == type;
	}
}

//----------------------------PARSING: PROGRAM STRUCTURE-------------------------------

function parseClass(){
	nextSym();
	accept("keyword", "class");
	className = sym.value;
	accept("identifier");
	accept("symbol", "{");
	while(symIs("keyword", ["static", "field"])){
		subParse("classVarDec");
	}
	console.log(classSymTab);
	while(symIs("keyword", ["constructor", "function", "method"])){
		subParse("subroutineDec");
	}
	accept("symbol", "}");
}

function classVarDec(){
	decl = true;
	var kind = sym.value;
	nextSym();
	var type = sym.value;
	parseType();	
	classSymTab[sym.value] = {"kind": kind, "index" : varIndexes[kind]++, "type" : type };
	accept("identifier");
	while(symIs("symbol", ",")){
		nextSym();
		classSymTab[sym.value] = {"kind": kind, "index" : varIndexes[kind]++, "type" : type };
		accept("identifier");
	}
	accept("symbol", ";");
	console.log(classSymTab);
	decl = false;
}

function subroutineDec(){

	var kind = sym.value;
	nextSym();

	var type = sym.value;
	if(kind == "constructor" && type != className){
		console.log("Error: Constructor should return " + className + " type");
		exit();
	}

	if(symIs("keyword", "void")){
		nextSym();
	} else {
		parseType();
	}

	accept("identifier");
	accept("symbol", "(");
	subParse("parameterList");
	accept("symbol", ")");
	subParse("subroutineBody");
}

function parameterList(){
	decl = true;
	if(symIs("keyword", ["int", "char", "bool"]) || symIs("identifier")){
		var type = sym.value;
		parseType();
		methodSymTab[sym.value] = {"kind": "argument", "index" : varIndexes["argument"]++, "type" : type };
		accept("identifier");
		while(symIs("symbol", ",")){
			nextSym();
			var type = sym.value;
			parseType();
			methodSymTab[sym.value] = {"kind": "argument", "index" : varIndexes["argument"]++, "type" : type };
			accept("identifier");
		}
	}
	decl = false;
}

function subroutineBody(){
	accept("symbol", "{");
	while(symIs("keyword", "var")){
		subParse("varDec");
	}
	subParse("statements");
	accept("symbol", "}");

	console.log(methodSymTab);
	methodSymTab = {};
}

function varDec(){
	accept("keyword", "var");
	var type = sym.value;
	parseType();
	methodSymTab[sym.value] = {"kind": "var", "index" : varIndexes["var"]++, "type" : type };
	accept("identifier");
	while(symIs("symbol", ",")){
		nextSym();
		methodSymTab[sym.value] = {"kind": "var", "index" : varIndexes["var"]++, "type" : type };
		accept("identifier");
	}
	accept("symbol", ";");
}

function parseType(){
	if(symIs("keyword", ["int", "char", "boolean"])){
		nextSym();
	} else {
		accept("identifier");
	}
}

function varName(){
	accept("identifier");
}

//-----------------------------PARSING: STATEMENTS---------------------------------

function statements(){
	while(symIs("keyword", ["let","if","while","do","return"])){
		subParse(sym.value+"Statement");
	}
}

function letStatement(){
	nextSym();
	varName();
	if(symIs("symbol", "[")){
		nextSym();
		subParse("expression");
		accept("symbol", "]");
	}
	accept("symbol", "=");
	subParse("expression");
	accept("symbol", ";");
}

function ifStatement(){
	nextSym();
	accept("symbol", "(");
	subParse("expression");
	accept("symbol", ")");
	accept("symbol", "{");
	subParse("statements");
	accept("symbol", "}");
	if(symIs("keyword", "else")){
		nextSym();
		accept("symbol", "{");
		subParse("statements");
		accept("symbol", "}");
	}
}

function whileStatement(){
	nextSym();
	accept("symbol", "(");
	subParse("expression");
	accept("symbol", ")");
	accept("symbol", "{");
	subParse("statements");
	accept("symbol", "}");
}

function doStatement(){
	nextSym();
	subroutineCall();
	accept("symbol", ";");
}

function returnStatement(){
	nextSym();
	if(firstOfExpression()){
		subParse("expression");
	}
	accept("symbol", ";");
}


//-----------------------------PARSING: EXPRESSIONS---------------------------------

function firstOfExpression(){
	return symIs("integerConstant") || symIs("stringConstant") || symIs("keyword", ["true","false","null","this"]) || symIs("identifier") || symIs("symbol", ["(", "-", "~"]);
}

function expressionList(){
	if(firstOfExpression()){
		subParse("expression");
		while (symIs("symbol", ",")) {
			nextSym();
			subParse("expression");
		}
	}
}

function expression(){
	subParse("term");
	if(symIs("symbol", ["+","-","*","/","&amp;","|","&lt;","&gt;","="])){
		nextSym();
		subParse("term");
	}
}

function term(){
	if(symIs("integerConstant") || symIs("stringConstant") || symIs("keyword", ["true","false","null","this"])){
		nextSym();
	} else if (symIs("identifier")) {
		//varName/varName[] or subroutineCall, check symtab
		//if(symTab[sym.value].type == ...){ } else if
		accept("identifier");
		if(symIs("symbol", "[")){
			nextSym();
			subParse("expression");
			accept("symbol", "]");
		} else if (symIs("symbol", [".","("])) {
			if(symIs("symbol", ".")){
				nextSym();
				accept("identifier");
			}
			accept("symbol", "(");
			subParse("expressionList");
			accept("symbol", ")");
		}

	} else if (symIs("symbol", "(")) {
		nextSym();
		subParse("expression");
		accept("symbol", ")");
	} else if (symIs("symbol", ["-", "~"])){
		nextSym();
		subParse("term");
	}
}

function subroutineCall(){
	console.log("subCallStart");
	accept("identifier");
	if(symIs("symbol", ".")){
		nextSym();
		accept("identifier");
	}
	accept("symbol", "(");
	subParse("expressionList");
	accept("symbol", ")");
	console.log("subCallEnd");
}


//----------------------------------SCANNING---------------------------------------

var keywords = ["class", "constructor", "function", "method", "field", "static", "var", "int", "char", "boolean", "void", "true", "false", "null", "this", "let", "do", "if", "else", "while", "return"];
var xmlSyms = {"<": "&lt;", ">":"&gt;", '"':"&quot;", "&":"&amp;"};

var keywordPrintExclusions = ["field", "int"];

function nextSym(){
	if(sym){
		if(sym.type == "identifier"){
			var str;
			var declStr = decl ? "Definition: " : "Use: ";
			if(sym.value in methodSymTab){
				var info = methodSymTab[sym.value];
				str = declStr + info.kind + " " + info.index + ": " + info.type + " " + sym.value;
			} else if (sym.value in classSymTab){
				var info = classSymTab[sym.value];
				str = declStr + info.kind + " " + info.index + ": " + info.type + " " + sym.value;
			} else {
				str = sym.value;
			}

			console.log(str);
			out.push(tabs+str);

		} else {
			if(!decl || sym.type != "keyword" || !keywordPrintExclusions.includes(sym.value)){
				console.log(sym);
				out.push(tabs+"<"+sym.type+"> "+sym.value+" </"+sym.type+">");
			}
		}
	}

	sym = {};
	skipSep();
	if(isLetter(char)){
		var word = "";
		while(isLetter(char) || isNum(char) || char == "_"){
			word += char;
			nextChar();
		}

		if(keywords.includes(word)){
			sym.type = "keyword";
		} else {
			sym.type = "identifier";
		}
		sym.value = word;

	} else if (isNum(char)){
		var word = "";
		while(isNum(char)){
			word += char;
			nextChar();
		}

		sym.type = "integerConstant";
		sym.value = word;

	} else if (char == '"'){
		nextChar();
		var word = "";
		while(char != '"' && char != "\n"){
			word += char;
			nextChar();
		}
		match('"');

		sym.type = "stringConstant";
		sym.value = word;

	} else {
		sym.type = "symbol";
		sym.value = char in xmlSyms ? xmlSyms[char] : char;
		nextChar();
	}
}

function match(expectedChar){
	if(char == expectedChar){
		nextChar();
	} else {
		console.error("Match: Expected "+expectedChar);
	}
}

function skipSep(){
	while(/\s/.test(char) && !EOF){
		nextChar();
	}
}

function nextChar(){
	if(lineBuffer.length == 0){
		nextLine();
		if(EOF){ return; }
	}
	char = lineBuffer[0];
	lineBuffer = lineBuffer.slice(1);
	if(char == undefined){EOF = true;}
}


function nextLine(){
	while(lineBuffer.length == 0){
		if(lines.length == 0){ 
			EOF = true;
			return;
		}

		lineBuffer = lines[0];
		lines = lines.slice(1);
	}
}

function isLetter(char){
	return char.toLowerCase() >= 'a' && char.toLowerCase() <= 'z';
}

function isNum(char){
	return char >= '0' && char <= '9';
}