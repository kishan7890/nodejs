function Sum(a,b){
    console.log(a+b);
}

function sub(a,b){
    console.log(a-b);
}

function mult(a,b){
    console.log(a*b);
}
function divide(a,b){
    console.log(a/b);
}
// Asynchronous



console.log(process.argv)
let operation = process.argv[2]
let a = process.argv[3];
let b = process.argv[4];
const {
    randomInt,
} = require('node:crypto');


 if (operation=== "sum"){
        Sum(Number(a),Number(b));
 }else if(operation==="sub"){
    sub(Number(a),Number(b));
 }else if(operation==="mult"){
    mult(Number(a),Number(b));
 }else if(operation==="divide"){
    divide(Number(a),Number(b));
 }else if (operation==="random"){
    // randomInt(Number(a),Number(b))
    randomInt(Number(a),Number(b), (err, n) => {
        if (err) throw err;
        console.log(`Random number is  ${n}`);
      });
 }

 

