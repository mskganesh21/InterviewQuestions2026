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


/*

Pass-by-Value vs Pass-by-Reference

| Aspect             | Pass-by-Value               | Pass-by-Reference      |
| ------------------ | --------------------------- | ---------------------- |
| What’s passed      | Value copy (new stack slot) | Address/reference      |
| Memory impact      | New location for copy       | Same original location |
| Original modified? | No                          | Yes geeksforgeeks+1    |

Initial:  x → [5] (address A)
          y → [5] (address B, copied value)

After y=7: x → [5] (address A, unchanged)
            y → [7] (address B updated)

*/
