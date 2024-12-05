const inputSlider=document.querySelector("[data-lengthSlider]") 
const lengthDisplay=document.querySelector("[data-lengthNumber]")

const passwordDisplay=document.querySelector("[data-passwordDisplay]")
const copybtn=document.querySelector("[data-copy]")
const copyMsg=document.querySelector("[data-copyMsg]")
const uppercaseCheck=document.querySelector("#uppercase")
const lowercaseCheck=document.querySelector("#lowercase")
const numberCheck=document.querySelector("#number")
const symbolCheck=document.querySelector("#symbol")
const indicator=document.querySelector("[data-indicator]")
const generateBtn=document.querySelector(".generateButton")
const allCheckBox=document.querySelectorAll("input[type=checkbox]")
const symbols="!@#$%^&*()<>?:./\]["

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider()

function handleSlider(){
    inputSlider.value=passwordLength;
     lengthDisplay.innerText=passwordLength;

     inputSlider.style.backgroundSize= ((passwordLength/20)*100) + "% 100%";
}
setIndicator("#ccc")
function setIndicator(color) {
    indicator.style.backgroundColor= color;
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
    return symbols.charAt(getRndInteger(0,symbols.length));
}
function calStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked)hasUpper=true;
    if(lowercaseCheck.checked)hasLower=true;
    if(numberCheck.checked)hasNum=true;
    if(symbolCheck.checked)hasSym=true;

    if(hasUpper && hasLower && (hasNum||hasSym) && inputSlider.value>=8){
        setIndicator("#0f0");
    }else if( hasLower||hasUpper   &&   hasNum||hasSym   && inputSlider.value>=6){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00");
    }
}

async function copyContent(){
 try{
   await navigator.clipboard.writeText(passwordDisplay.value);
   copyMsg.innerText="copied";
 }catch(e){
   copyMsg.innerText="failed";
 }
 copyMsg.classList.add("active");
 setTimeout(()=>{
    copyMsg.innerText="";
 },2000);
}

function handlecheckboxchange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)checkCount++;
    })

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}
function shufflepassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxchange);
})
inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})
copybtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})
generateBtn.addEventListener('click',(e)=>{
if(checkCount<=0)return;
if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
}
password="";
let funcarr=[];
if(uppercaseCheck.checked)funcarr.push(generateUpperCase);
if(lowercaseCheck.checked)funcarr.push(generateLowerCase);
if(numberCheck.checked)funcarr.push(generateRandomNumber);
if(symbolCheck.checked)funcarr.push(generateSymbol);

for(let i=0;i<funcarr.length ;i++){
    password+=funcarr[i]();
}
for(let i=0;i<passwordLength-funcarr.length;i++){
    let ind=getRndInteger(0,funcarr.length )
    password+=funcarr[ind]();
}
password=shufflepassword(Array.from(password));
passwordDisplay.value=password;
calStrength();
})

