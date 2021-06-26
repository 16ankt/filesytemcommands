#!/usr/bin/env node

let fs = require("fs");

//input

let inputArr = process.argv.slice(2);
// console.log(inputArr);
//options
let optionArr=[];
let filesArr = [];
// identify options
for(let i = 0;i<inputArr.length;i++){
    let firstchar = inputArr[i].charAt(0);
    if(firstchar == "-"){
        optionArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
}
// check for invalid option i.e -n and -b both entered by the user
let isbothpresent =optionArr.includes("-b")&&optionArr.includes("-n");
if(isbothpresent == true){
console.log("Enter -n or -e both are not execute in same time")
return;
}
//existence
for(let i= 0 ; i< filesArr.length;i++){
    //data comes in buffer
 let isPresent = fs.existsSync(filesArr[i]);
 if(isPresent == false){
     console.log(`file ${filesArr[i]} is not present`);
     return;
 }

}

//read 
let content = "";
for(let i= 0 ; i< filesArr.length;i++){
    //data comes in buffer
 let buddercontent = fs.readFileSync(filesArr[i]);
 content +=buddercontent+"\r\n";

}
// console.log(content);
let contentArr =  content.split("\r\n");
console.log(contentArr);

let ispresent  = optionArr.includes("-s");
if(ispresent == true){
    for(let i = 1 ;i< contentArr.length;i++){
        if(contentArr[i] =="" && contentArr[i-1] == ""){
            contentArr[i] =null;
        }else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }
    let tempArr=[];
    for(let i = 0;i< contentArr.length;i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr =  tempArr ;
}
console.log("<---------------------->")
// console.log(contentArr.join("\n"));

// - n

// let isnpresent = optionArr.includes("-n");
// if(isnpresent == true){
//     for(let i = 0 ;i< contentArr;i++){
//         // contentArr[i]=`${i+1} ${contentArr[i]}`;
//         contentArr[i] = `${i + 1} ${contentArr[i]} `;
//     }
// }
// console.log(contentArr);
let isnPresent = optionArr.includes("-n");
if (isnPresent == true) {
    for (let i = 0; i < contentArr.length; i++) {
        contentArr[i] = `${i + 1} ${contentArr[i]} `;
    }
}
console.log(contentArr.join("\n"));

let isbPresent = optionArr.includes("-b");
if (isbPresent == true) {
    let counter = 1;
    for (let i = 0; i < contentArr.length; i++) {
      if(contentArr[i] !=null)
        // contentArr[i] = `${i + 1} ${contentArr[i]} `;
    contentArr[i]  = `${counter} ${contentArr[i]}`;
        counter++;
}
}
 console.log(contentArr.join("\n"));
