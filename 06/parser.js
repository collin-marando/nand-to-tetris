function parse(code){
	var lines = code.split(/[\n\r]+/g);
	
	createLabelSymbols(lines);
	console.log(symbols);

	//Parse instructions
	var out = [];
	lines.forEach((line) => {
		if(line.length > 0){
			//Label
			if (line[0] == "("){
				out.push("");  //for display purposes only
			}
			//A instruction
			else if(line[0] == "@"){
				out.push(parseA(line));
			}
			//C instruction
			else {
				out.push(parseC(line));
			}
		}
	});
	return out;
}

function decToBin(dec){
    return (dec >>> 0).toString(2);
}

//------------------SYMBOLS------------------

var symbols = {
	R0: 0, R1: 1, R2: 2, R3: 3, R4: 4, R5: 5, R6: 6, R7: 7, R8: 8, 
	R9: 9, R10: 10, R11: 11, R12: 12, R13: 13, R14: 14, R15: 15,
	SCREEN: 16384,
	KBD: 24576,
	SP: 0, LCL: 1, ARG: 2, THIS: 3, THAT: 4,
}

function createLabelSymbols(lines){
	var linecount = 0;
	lines.forEach((line) => {
		if(line.length > 0 && line[0] == "("){
			symbols[line.replace(/[()]/g, "")] = linecount;
		} else {
			linecount++;
		}
	});
}

//--------------A-Instruction----------------

var ramAddr = 16;

function parseA(line){
	line = line.substr(1);
	var num;
	if(isNum(line[0])){
		num = parseInt(line);
	} else {
		if(!(line in symbols)){
			symbols[line] = ramAddr++;
		}
		num = symbols[line];
	}
	return pad16(decToBin(num));
}

function isNum(char){
	return char >= '0' && char <= '9';
}

function pad16(bin){
	return "0000000000000000".substr(bin.length) + bin;
}

//--------------C-Instruction----------------

function parseC(line){
	var a, c, d, j;
	if(line.includes("=")){
		var arr = line.split("=");
		d = arr[0];
		line = arr[1];
	}
	if(line.includes(";")){
		var arr = line.split(";");
		line = arr[0];
		j = arr[1];
	}
	c = line;
	a = c.includes("M")? "1": "0";
	return "111"+a+comp(c)+dest(d)+jump(j);
}

var compCodes = {
	"0": 	"101010",
	"1": 	"111111",
	"-1": 	"111010",
	"D": 	"001100",
	"A": 	"110000",
	"M": 	"110000",
	"!D": 	"001101",
	"!A": 	"110001",
	"!M": 	"110001",
	"-D": 	"001111",
	"-A": 	"110011",
	"-M": 	"110011",
	"D+1": 	"011111",
	"A+1": 	"110111",
	"M+1": 	"110111",
	"D-1": 	"001110",
	"A-1": 	"110010",
	"M-1": 	"110010",
	"D+A": 	"000010",
	"D+M": 	"000010",
	"D-A": 	"010011",
	"D-M": 	"010011",
	"A-D": 	"000111",
	"M-D": 	"000111",
	"D&A": 	"000000",
	"D&M": 	"000000",
	"D|A": 	"010101",
	"D|M": 	"010101",
}

var destCodes = {
	M: 	 "001",
	D: 	 "010",
	MD:  "011",
	A: 	 "100",
	AM:  "101",
	AD:  "110",
	AMD: "111",
}

var jumpCodes = {
	JGT: "001",
	JEQ: "010", 
	JGE: "011",
	JLT: "100",
	JNE:  "101",
	JLE: "110",
	JMP: "111",
}

function comp(c){
	return c? compCodes[c]: "000000";
}

function dest(d){
	return d? destCodes[d]: "000";
}

function jump(j){
	return j? jumpCodes[j]: "000";
}