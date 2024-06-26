// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

//clear R2
	@2
	M = 0
//var count = R0
	@0
	D = M
	@3
	M = D
//while count != 0	
(LOOP)
	@END
	D;JEQ
//R2 += R1
	@1
	D = M
	@2
	M = M + D
//count--
	@3
	MD = M - 1
	@LOOP
	0;JMP
(END)