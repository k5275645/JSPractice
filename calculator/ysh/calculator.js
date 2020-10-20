let temp="0", k=0,res=0;
var array=[];
var numArray=[];
let oper1 = null;
let num1 = null, num2 = null;
var flag=0,answer=0, answer2=0, n1;
let fact=1;
//화면상단
function show(n1)
{
    temp=n1;
    document.getElementById('viewbar1').value += temp;
}
//연산자표시
function doOperator(operator)
{
	document.getElementById('viewbar1').value += operator;
	oper1 = operator;
}
//equal
function operate()
{
    //기본사칙연산
	if(flag==0)
	{
        var answer=document.getElementById('viewbar1').value;
        answer=answer.replace("(","");
        answer=answer.replace(")","");
        //합
        if(oper1 == '+')
        {
        	numArray = (answer.split('+'));
        	num1 = Number(numArray[0]); 
        	num2 = Number(numArray[1]);
        	document.getElementById('viewbar2').value = "num1="+num1;
        	document.getElementById('viewbar2').value += "num2="+num2;
        	document.getElementById('viewbar1').value = Number(num1 + num2);
        	num1 = Number(document.getElementById('viewbar1').value);
    	//빼기
        }
        else if(oper1 == '-')
        {
        	numArray = (answer.split('-'));
        	num1 = Number(numArray[0]); 
        	num2 = Number(numArray[1]);
        	document.getElementById('viewbar2').value = "num1="+num1;
        	document.getElementById('viewbar2').value += "num2="+num2;
        	document.getElementById('viewbar1').value = Number(num1 - num2);
        	num1 = Number(document.getElementById('viewbar1').value);
    	//곱하기
        }
        else if(oper1 == '*')
        {
        	numArray = (answer.split('*'));
        	num1 = Number(numArray[0]); 
        	num2 = Number(numArray[1]);
        	document.getElementById('viewbar2').value = "num1="+num1;
        	document.getElementById('viewbar2').value += "num2="+num2;
        	document.getElementById('viewbar1').value = Number(num1*num2);
        	num1 = Number(document.getElementById('viewbar1').value);
    	//나누기
        }
        else if(oper1 == '/')
        {
        	numArray = (answer.split('/'));
        	num1 = Number(numArray[0]); 
        	num2 = Number(numArray[1]);
        	document.getElementById('viewbar2').value = "num1="+num1;
        	document.getElementById('viewbar2').value += "num2="+num2;
        	document.getElementById('viewbar1').value = Number(num1/num2);
        	num1 = Number(document.getElementById('viewbar1').value);
        //에러
        }
        else
        {
        	calcForm.txt1.value="MATH ERROR";
        }
        
    }
	else if(flag==1)
	{
        k=0;
        answer=0;
        k=document.getElementById('viewbar1').value;
        k=k.replace("sin","");
        k=k.replace("(","");
        k=k.replace(")","");
        answer= Math.sin(k);
        calcform.txt1.value=answer;
        flag=0;
        answer=0;
    }
    else if(flag==2)
    {
        k=0;
        answer=0;
        k=document.getElementById('viewbar1').value;
        k=k.replace("cos","");
        k=k.replace("(","");
        k=k.replace(")","");
        answer= Math.cos(k);
        calcform.txt1.value=answer;
        flag=0;
        answer=0;
    }
    else if(flag==3)
    {
        k=0;
        answer=0;
        k=document.getElementById('viewbar1').value;
        k=k.replace("tan","");
        k=k.replace("(","");
        k=k.replace(")","");
        answer= Math.tan(k);
        calcform.txt1.value=answer;
        flag=0;
        answer=0;
    
    }
    else if(flag==4)
    {
        k=0;
        answer=0;
        k=document.getElementById('viewbar1').value;
        k=k.replace("sqrt","");
        k=k.replace("(","");
        k=k.replace(")","");
        answer=Math.sqrt(k);
        calcform.txt1.value=answer;
        flag=0;
        answer=0;
    }
    else if(flag==5)
    {
        k=0;
        answer=0;
        k=document.getElementById('viewbar1').value;
        k=k.replace("^3","");
        k=k.replace("(","");
        k=k.replace(")","");
        res=1;
        for(i=0;i<3;i++)
        {
            res=res*k;
        }
        answer=res;
        res=0;
        calcform.txt1.value=answer;
        flag=0;
        answer=0;
    }
    else if(flag==6){
        k=0;
        answer=0;
        k=document.getElementById('viewbar1').value;
        k=k.replace("^2","");
        k=k.replace("(","");
        k=k.replace(")","");
        res=1;
        for(i=0;i<2;i++)
        {
            res=res*k;
        }
        answer=res;
        res=0;
        calcform.txt1.value=answer;
        flag=0;
        answer=0;
    }
    else if(flag==7)
    {
        k=0;
        answer=0;
        k=document.getElementById('viewbar1').value;
        k=k.replace("^","");
        k=k.replace(a,"");
        k=k.replace("(","");
        k=k.replace(")","");
        answer=Math.pow(a,k);
        calcform.txt1.value=answer;
        answer=0;
        flag=0;
    }
    else if(flag==8)
    {
        k=0;
        answer=0;
        k=document.getElementById('viewbar1').value;
        k=k.replace("log","");
        k=k.replace("(","");
        k=k.replace(")","");
        answer=Math.log10(k);
        calcform.txt1.value=answer;
        answer=0;
        flag=0;
    }
    else if(flag==9)
    {
        k=0;
        answer=0;
        k=document.getElementById('viewbar1').value;
        k=k.replace("ln","");
        k=k.replace("(","");
        k=k.replace(")","");
        answer=Math.log(k);
        calcform.txt1.value=answer;
        answer=0;
        flag=0;
    }
    else if(flag==10)
    {
        k=0;
        answer=0;
        k=document.getElementById('viewbar1').value;
        k=k.replace("!","");
        k=k.replace("(","");
        k=k.replace(")","");
       
        for(i=k;i>0;i--)
        {
            fact=fact*i;
        }
        calcform.txt1.value=fact;
        fans=fact;
        fact=1;
        flag=0;
    }
    else if(flag==11)
    {
    	k=0;
    	answer=0;
    	k=document.getElementById('viewbar1').value;
    	k=k.replace("e","");
        k=k.replace("(","");
        k=k.replace(")","");
        if(k==0)
        {
        	k="1";
        }
    	answer=Number(k);
    	answer2=(answer*2.71828182846);
    	calcform.txt1.value=answer2;
    	answer=0;
    	answer2=0;
    	flag=0;
    }
    else if(flag==12)
    {
    	k=0;
    	answer=0;
    	k=document.getElementById('viewbar1').value;
    	k=k.replace("π","");
    	k=k.replace("(","");
    	k=k.replace(")","");
    	answer=Number(k);
    	answer2=(answer*3.141592653589793);
    	calcform.txt1.value=answer2;
    	answer=0;
    	answer2=0;
    	flag=0;
    }
    else
    {
        calcform.txt1.value="MATH ERROR";
    }
}

//AC
function reload(){
    document.location.reload();
}

//DEL
function del(){
    answer=document.getElementById('viewbar1').value;
    answer=answer.replace(answer[answer.length-1],"");
    calcform.txt1.value=answer;
}
// ()
function fbo()
{
    calcform.txt1.value+="(";
}
function fbc()
{
    calcform.txt1.value+=")";
}

//give sin flag value
function mysin()
{
    flag=1;
    calcform.txt1.value="sin";
}
//give cos flag value
function mycos()
{
    flag=2;
    calcform.txt1.value="cos";
}
//give tan flag value
function mytan()
{
   flag=3;
   calcform.txt1.value="tan";
}
//give sqrt flag value
function sqrt(){
    flag=4;
    calcform.txt1.value="sqrt";
}
//give cube flag value
function cube(){
    flag=5;
    calcform.txt1.value+="^3";
}
//give square flag value
function square(){
    flag=6;
    calcform.txt1.value+="^2";
}
//give pow flag value
function pow(){
    flag=7;
    a=document.getElementById('viewbar1').value;
    calcform.txt1.value+="^";
}
//give log flag value
function mylog(){
    calcform.txt1.value="log";
    flag=8;
}
//give ln flag value
function myln(){
    calcform.txt1.value="ln";
    flag=9;
}
//give fact flag value
function fact1(){
    calcform.txt1.value+="!";
    flag=10;
}
//give e flag value
function naturale(){
	calcform.txt1.value+="e";
	flag=11;
}
//give pi flag value
function pi(){
	calcform.txt1.value+="π";
	flag=12;
}