//push constant 17
@17
D = A
@SP
A = M
M = D
@SP
M = M+1
//push constant 17
@17
D = A
@SP
A = M
M = D
@SP
M = M+1
//eq
@SP
AM = M-1
D = M
@SP
AM = M-1
D = M-D
@TRUE0
D;JEQ
D = 0
@END0
0;JMP
(TRUE0)
D = -1
(END0)
@SP
A = M
M = D
@SP
M = M+1
//push constant 17
@17
D = A
@SP
A = M
M = D
@SP
M = M+1
//push constant 16
@16
D = A
@SP
A = M
M = D
@SP
M = M+1
//eq
@SP
AM = M-1
D = M
@SP
AM = M-1
D = M-D
@TRUE1
D;JEQ
D = 0
@END1
0;JMP
(TRUE1)
D = -1
(END1)
@SP
A = M
M = D
@SP
M = M+1
//push constant 16
@16
D = A
@SP
A = M
M = D
@SP
M = M+1
//push constant 17
@17
D = A
@SP
A = M
M = D
@SP
M = M+1
//eq
@SP
AM = M-1
D = M
@SP
AM = M-1
D = M-D
@TRUE2
D;JEQ
D = 0
@END2
0;JMP
(TRUE2)
D = -1
(END2)
@SP
A = M
M = D
@SP
M = M+1
//push constant 892
@892
D = A
@SP
A = M
M = D
@SP
M = M+1
//push constant 891
@891
D = A
@SP
A = M
M = D
@SP
M = M+1
//lt
@SP
AM = M-1
D = M
@SP
AM = M-1
D = M-D
@TRUE3
D;JLT
D = 0
@END3
0;JMP
(TRUE3)
D = -1
(END3)
@SP
A = M
M = D
@SP
M = M+1
//push constant 891
@891
D = A
@SP
A = M
M = D
@SP
M = M+1
//push constant 892
@892
D = A
@SP
A = M
M = D
@SP
M = M+1
//lt
@SP
AM = M-1
D = M
@SP
AM = M-1
D = M-D
@TRUE4
D;JLT
D = 0
@END4
0;JMP
(TRUE4)
D = -1
(END4)
@SP
A = M
M = D
@SP
M = M+1
//push constant 891
@891
D = A
@SP
A = M
M = D
@SP
M = M+1
//push constant 891
@891
D = A
@SP
A = M
M = D
@SP
M = M+1
//lt
@SP
AM = M-1
D = M
@SP
AM = M-1
D = M-D
@TRUE5
D;JLT
D = 0
@END5
0;JMP
(TRUE5)
D = -1
(END5)
@SP
A = M
M = D
@SP
M = M+1
//push constant 32767
@32767
D = A
@SP
A = M
M = D
@SP
M = M+1
//push constant 32766
@32766
D = A
@SP
A = M
M = D
@SP
M = M+1
//gt
@SP
AM = M-1
D = M
@SP
AM = M-1
D = M-D
@TRUE6
D;JGT
D = 0
@END6
0;JMP
(TRUE6)
D = -1
(END6)
@SP
A = M
M = D
@SP
M = M+1
//push constant 32766
@32766
D = A
@SP
A = M
M = D
@SP
M = M+1
//push constant 32767
@32767
D = A
@SP
A = M
M = D
@SP
M = M+1
//gt
@SP
AM = M-1
D = M
@SP
AM = M-1
D = M-D
@TRUE7
D;JGT
D = 0
@END7
0;JMP
(TRUE7)
D = -1
(END7)
@SP
A = M
M = D
@SP
M = M+1
//push constant 32766
@32766
D = A
@SP
A = M
M = D
@SP
M = M+1
//push constant 32766
@32766
D = A
@SP
A = M
M = D
@SP
M = M+1
//gt
@SP
AM = M-1
D = M
@SP
AM = M-1
D = M-D
@TRUE8
D;JGT
D = 0
@END8
0;JMP
(TRUE8)
D = -1
(END8)
@SP
A = M
M = D
@SP
M = M+1
//push constant 57
@57
D = A
@SP
A = M
M = D
@SP
M = M+1
//push constant 31
@31
D = A
@SP
A = M
M = D
@SP
M = M+1
//push constant 53
@53
D = A
@SP
A = M
M = D
@SP
M = M+1
//add
@SP
AM = M-1
D = M
@SP
AM = M-1
D = M+D
@SP
A = M
M = D
@SP
M = M+1
//push constant 112
@112
D = A
@SP
A = M
M = D
@SP
M = M+1
//sub
@SP
AM = M-1
D = M
@SP
AM = M-1
D = M-D
@SP
A = M
M = D
@SP
M = M+1
//neg
@SP
AM = M-1
D = M
D = -D
@SP
A = M
M = D
@SP
M = M+1
//and
@SP
AM = M-1
D = M
@SP
AM = M-1
D = M&D
@SP
A = M
M = D
@SP
M = M+1
//push constant 82
@82
D = A
@SP
A = M
M = D
@SP
M = M+1
//or
@SP
AM = M-1
D = M
@SP
AM = M-1
D = M|D
@SP
A = M
M = D
@SP
M = M+1
//not
@SP
AM = M-1
D = M
D = !D
@SP
A = M
M = D
@SP
M = M+1
