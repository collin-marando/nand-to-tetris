//function Sys.init 0
(Sys.init)
D = 0
//push constant 4
@4
D = A
@SP
A = M
M = D
@SP
M = M+1
//call Main.fibonacci 1   
@ret5
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
@1
D = D-A
@5
D = D-A
@ARG
M = D
@SP
D = M
@LCL
M = D
@Main.fibonacci
0;JMP
(ret5)
//label WHILE
(WHILE)
//goto WHILE              
@WHILE
0;JMP
//function Main.fibonacci 0
(Main.fibonacci)
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
//push constant 2
@2
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
@TRUE6
D;JLT
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
//if-goto IF_TRUE
@SP
AM = M-1
D = M
@IF_TRUE
D;JNE
//goto IF_FALSE
@IF_FALSE
0;JMP
//label IF_TRUE          
(IF_TRUE)
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
//label IF_FALSE         
(IF_FALSE)
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
//push constant 2
@2
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
//call Main.fibonacci 1  
@ret7
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
@1
D = D-A
@5
D = D-A
@ARG
M = D
@SP
D = M
@LCL
M = D
@Main.fibonacci
0;JMP
(ret7)
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
//push constant 1
@1
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
//call Main.fibonacci 1  
@ret8
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
@1
D = D-A
@5
D = D-A
@ARG
M = D
@SP
D = M
@LCL
M = D
@Main.fibonacci
0;JMP
(ret8)
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
