// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

//while true
(LOOP1)
	@KBD
	D = M
	@PRE
	D;JEQ
	D = -1
(PRE)
	@0
	M = D
	@8192
	D = A
	@1
	M = D
	@SCREEN
	D = A
	@2
	M = D
(FILL)
//set color
	@0
	D = M
//get pixel addr and inc ptr
	@2
	A = M
	M = D
	D = A + 1
	@2
	M = D
//dec counter and loop
	@1
	MD = M - 1
	@FILL
	D;JNE
	
	@LOOP1
	0;JMP