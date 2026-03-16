console.log("Hello World");

/*
IMMUTABILITY
immutability means that the data or object cannot be altered after creation.any change creates a new one instead.

eg: primitive data types (string,numbers,boolean) are immutable in javascript 
*/

let str = "hello";
str[0] = "H";

console.log(str);
/*even if we change the value to uppercase it didn't change this is immutability*/

/*
strings are immutable for thread safety, performance optimization and safety 
*/
