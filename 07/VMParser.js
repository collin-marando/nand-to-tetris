var tokens = {
	"local": "LCL",
	"argument": "ARG",
	"this": "THIS",
	"that": "THAT",
	"temp": "R5",
	"pointer": "R3",
	"static": "16",
}

var labelCounter = 0;		//Used for generating unique labels

var globalStaticCount = 0;	//Counts overall program static allocation
var classStaticCount = 0;	//Counts individual file static allocation

var out;
function parse(code){
	var lines = code.split(/[\n\r]+/g);	
	out = [];
	classStaticCount = 0;
	lines.forEach(line => {
		if(line.length > 0){
			out.push("//"+line);			//Print repective VM code as a comment
			var syms = line.split(" ");
			var cmd = syms[0];
			//Memory Access
			if(cmd == "push"){
				parsePush(syms[1], syms[2]);
			} else if (cmd == "pop"){
				parsePop(syms[1], syms[2]);
			} 
			//Program Flow
			else if (cmd == "label"){
				out.push("("+syms[1]+")");
			} else if (cmd == "goto") {
				out.push("@"+syms[1]);
				out.push("0;JMP");
			} else if (cmd == "if-goto"){
				popD();
				out.push("@"+syms[1]);
				out.push("D;JNE");
			} 
			//Subroutines
			else if (cmd == "function"){
				parseFunction(syms[1], syms[2]);
			} else if (cmd == "call"){
				parseCall(syms[1], syms[2]);
			} else if (cmd == "return"){
				parseReturn();
			} 
			//Stack Arithmetic
			else {
				parseArithmetic(cmd);
			}
			out.push(""); //newline for splitting up code chunks
		}
	});

	globalStaticCount += classStaticCount;
	return out;
}

function pushImmediate(value){
	out.push("@"+value);
	out.push("D = A");
	pushD();
}

function pushDirect(base, offset){
	visit(base, offset, true); 
	out.push("D = M");
	pushD();
}

function pushIndirect(base, offset){
	visit(base, offset, false); 
	out.push("D = M");
	pushD();
}

function pushD(){
	out.push("@SP");
	out.push("A = M");
	out.push("M = D");
	out.push("@SP");
	out.push("M = M+1");
}

function popD(){
	out.push("@SP");
	out.push("AM = M-1");
	out.push("D = M");
}

function popM(){
	out.push("@SP");
	out.push("AM = M-1");
}

function visit(base, offset, direct){
	out.push("@"+base);
	out.push("D = "+(direct?"A":"M"));
	out.push("@"+offset);
	out.push("A = A+D");
}

//-------------SUBROUTINES---------------

function parseFunction(name, localCount){
	out.push("("+name+")");
	out.push("D = 0");
	for(let i = 0; i < parseInt(localCount); i++){
		pushD();
	}
}

function parseCall(name, argCount){
	pushImmediate("ret"+labelCounter);
	pushDirect("LCL", 0);
	pushDirect("ARG", 0);
	pushDirect("THIS", 0);
	pushDirect("THAT", 0);
	//ARG = SP-numArgs-5
	out.push("@SP");
	out.push("D = M");
	out.push("@"+argCount);
	out.push("D = D-A");
	out.push("@5");
	out.push("D = D-A");
	out.push("@ARG");
	out.push("M = D");
	//LCL = SP
	copy("SP", "LCL"); 
	//goto func
	out.push("@"+name);
	out.push("0;JMP");
	//return address
	out.push("(ret"+labelCounter+")")
	labelCounter++;
}

function parseReturn(){
	//FRAME = LCL
	copy("LCL", "R13");
	//RET = *(FRAME-5)
	out.push("@5");
	out.push("A = D-A");
	out.push("D = M");
	out.push("@R14");
	out.push("M = D");
	//ARG* = pop()
	popD();
	out.push("@ARG");
	out.push("A = M");
	out.push("M = D");
	//SP = ARG+1
	copy("ARG", "SP");
	out.push("M = M+1");
	//restore segments
	restore("R13", "1", "THAT");
	restore("R13", "2", "THIS");
	restore("R13", "3", "ARG");
	restore("R13", "4", "LCL");
	//goto RET
	out.push("@R14");
	out.push("A = M");
	out.push("0;JMP");
}

//copy the value at src to dest
function copy(src, dest){
	out.push("@"+src);
	out.push("D = M");
	out.push("@"+dest);
	out.push("M = D");
}

/*restores a memory segment back to its previous value after a function return
* dest = *(ptr-offset)
*/
function restore(ptr, offset, dest){
	out.push("@"+ptr)
	out.push("D = M");
	out.push("@"+offset);
	out.push("A = D-A");
	out.push("D = M");
	out.push("@"+dest);
	out.push("M = D");
}

//------------MEMORY ACCESS--------------

function parsePush(type, offset){
	if(type == "constant"){
		pushImmediate(offset);
	} else if (type == "temp" || type == "pointer"){
		pushDirect(tokens[type], offset);
	} else if (type == "static") {
		var index = parseInt(offset);
		offset = ""+(index+globalStaticCount);
		pushDirect(tokens[type], offset);
		updateClassStaticCount(index);
	} else {
		pushIndirect(tokens[type], offset);
	}
}

function parsePop(type, offset){
	if(type == "temp" || type == "pointer"){
		visit(tokens[type], offset, true);
	} else if (type == "static") {
		var index = parseInt(offset);
		offset = ""+(parseInt(offset)+globalStaticCount);
		visit(tokens[type], offset, true);
		updateClassStaticCount(index);
	} else {
		visit(tokens[type], offset, false);
	}
	out.push("D = A");
	out.push("@R13");
	out.push("M = D");
	popD();
	out.push("@R13");
	out.push("A = M");
	out.push("M = D");
}

function updateClassStaticCount(index){
	if(index + 1 > classStaticCount){
		classStaticCount = index + 1;
	}
}

//-----------STACK ARITHMETIC------------

var ops = {
	"neg": "-D",
	"not": "!D",
	"add": "M+D",
	"sub": "M-D",
	"and": "M&D",
	"or": "M|D",
}

function parseArithmetic(cmd){
	popD();
	if(cmd == "neg" || cmd == "not"){ out.push("D = "+ops[cmd]); } 
	else {
		popM();
		if(cmd == "eq" || cmd == "lt" || cmd == "gt"){
			out.push("D = M-D");
			out.push("@TRUE"+labelCounter);
			out.push("D;J"+cmd.toUpperCase());
			out.push("D = 0");
			out.push("@END"+labelCounter);
			out.push("0;JMP");
			out.push("(TRUE"+labelCounter+")");
			out.push("D = -1");
			out.push("(END"+labelCounter+")");
			labelCounter++;
		} else {
			out.push("D = "+ops[cmd]);
		}
	}
	pushD();
}

