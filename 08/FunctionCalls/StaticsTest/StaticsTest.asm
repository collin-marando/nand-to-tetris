//function Sys.init 0
(Sys.init)
D = 0
//push constant 6
@6
D = A
@SP
A = M
M = D
@SP
M = M+1
//push constant 8
@8
D = A
@SP
A = M
M = D
@SP
M = M+1
//call Class1.set 2
@ret0
D = A
@SP
A = M
M = D
@SP
M = M+1
@LCL
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@ARG
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@THIS
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@THAT
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@SP
D = M
@2
D = D-A
@5
D = D-A
@ARG
M = D
@SP
D = M
@LCL
M = D
@Class1.set
0;JMP
(ret0)
//pop temp 0 
@R5
D = A
@0
A = A+D
D = A
@R13
M = D
@SP
AM = M-1
D = M
@R13
A = M
M = D
//push constant 23
@23
D = A
@SP
A = M
M = D
@SP
M = M+1
//push constant 15
@15
D = A
@SP
A = M
M = D
@SP
M = M+1
//call Class2.set 2
@ret1
D = A
@SP
A = M
M = D
@SP
M = M+1
@LCL
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@ARG
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@THIS
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@THAT
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@SP
D = M
@2
D = D-A
@5
D = D-A
@ARG
M = D
@SP
D = M
@LCL
M = D
@Class2.set
0;JMP
(ret1)
//pop temp 0 
@R5
D = A
@0
A = A+D
D = A
@R13
M = D
@SP
AM = M-1
D = M
@R13
A = M
M = D
//call Class1.get 0
@ret2
D = A
@SP
A = M
M = D
@SP
M = M+1
@LCL
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@ARG
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@THIS
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@THAT
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@SP
D = M
@0
D = D-A
@5
D = D-A
@ARG
M = D
@SP
D = M
@LCL
M = D
@Class1.get
0;JMP
(ret2)
//call Class2.get 0
@ret3
D = A
@SP
A = M
M = D
@SP
M = M+1
@LCL
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@ARG
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@THIS
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@THAT
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
@SP
D = M
@0
D = D-A
@5
D = D-A
@ARG
M = D
@SP
D = M
@LCL
M = D
@Class2.get
0;JMP
(ret3)
//label WHILE
(WHILE)
//goto WHILE
@WHILE
0;JMP
//function Class1.set 0
(Class1.set)
D = 0
//push argument 0
@ARG
D = M
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
//pop static 0
@16
D = A
@0
A = A+D
D = A
@R13
M = D
@SP
AM = M-1
D = M
@R13
A = M
M = D
//push argument 1
@ARG
D = M
@1
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
//pop static 1
@16
D = A
@1
A = A+D
D = A
@R13
M = D
@SP
AM = M-1
D = M
@R13
A = M
M = D
//push constant 0
@0
D = A
@SP
A = M
M = D
@SP
M = M+1
//return
@LCL
D = M
@R13
M = D
@5
A = D-A
D = M
@R14
M = D
@SP
AM = M-1
D = M
@ARG
A = M
M = D
@ARG
D = M
@SP
M = D
M = M+1
@R13
D = M
@1
A = D-A
D = M
@THAT
M = D
@R13
D = M
@2
A = D-A
D = M
@THIS
M = D
@R13
D = M
@3
A = D-A
D = M
@ARG
M = D
@R13
D = M
@4
A = D-A
D = M
@LCL
M = D
@R14
A = M
0;JMP
//function Class1.get 0
(Class1.get)
D = 0
//push static 0
@16
D = A
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
//push static 1
@16
D = A
@1
A = A+D
D = M
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
//return
@LCL
D = M
@R13
M = D
@5
A = D-A
D = M
@R14
M = D
@SP
AM = M-1
D = M
@ARG
A = M
M = D
@ARG
D = M
@SP
M = D
M = M+1
@R13
D = M
@1
A = D-A
D = M
@THAT
M = D
@R13
D = M
@2
A = D-A
D = M
@THIS
M = D
@R13
D = M
@3
A = D-A
D = M
@ARG
M = D
@R13
D = M
@4
A = D-A
D = M
@LCL
M = D
@R14
A = M
0;JMP
//function Class2.set 0
(Class2.set)
D = 0
//push argument 0
@ARG
D = M
@0
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
//pop static 0
@16
D = A
@2
A = A+D
D = A
@R13
M = D
@SP
AM = M-1
D = M
@R13
A = M
M = D
//push argument 1
@ARG
D = M
@1
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
//pop static 1
@16
D = A
@3
A = A+D
D = A
@R13
M = D
@SP
AM = M-1
D = M
@R13
A = M
M = D
//push constant 0
@0
D = A
@SP
A = M
M = D
@SP
M = M+1
//return
@LCL
D = M
@R13
M = D
@5
A = D-A
D = M
@R14
M = D
@SP
AM = M-1
D = M
@ARG
A = M
M = D
@ARG
D = M
@SP
M = D
M = M+1
@R13
D = M
@1
A = D-A
D = M
@THAT
M = D
@R13
D = M
@2
A = D-A
D = M
@THIS
M = D
@R13
D = M
@3
A = D-A
D = M
@ARG
M = D
@R13
D = M
@4
A = D-A
D = M
@LCL
M = D
@R14
A = M
0;JMP
//function Class2.get 0
(Class2.get)
D = 0
//push static 0
@16
D = A
@2
A = A+D
D = M
@SP
A = M
M = D
@SP
M = M+1
//push static 1
@16
D = A
@3
A = A+D
D = M
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
//return
@LCL
D = M
@R13
M = D
@5
A = D-A
D = M
@R14
M = D
@SP
AM = M-1
D = M
@ARG
A = M
M = D
@ARG
D = M
@SP
M = D
M = M+1
@R13
D = M
@1
A = D-A
D = M
@THAT
M = D
@R13
D = M
@2
A = D-A
D = M
@THIS
M = D
@R13
D = M
@3
A = D-A
D = M
@ARG
M = D
@R13
D = M
@4
A = D-A
D = M
@LCL
M = D
@R14
A = M
0;JMP
