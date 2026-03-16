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

/*
primitive datatypes vs non primitive datatypes

Primitive types in JavaScript are the simplest, built-in data types that hold single, immutable values directly—not objects or complex structures.

Definition
Primitives represent basic values like string, number, boolean, null, undefined, symbol, and bigint. Unlike objects, they have no methods or properties of their own and store the actual value in memory (not a reference).

Key Traits
Immutable: Can't be altered in place; reassignment creates a new value.

Passed by value: Copying duplicates the value exactly.

Stack storage: Lightweight, allocated on the call stack for fast access.


Non-primitive types in JavaScript are complex data structures (aka reference types) that store collections of values and are mutable, unlike primitives.

Definition
Non-primitives encompass objects, arrays, and functions—everything that's not a primitive. They don't hold values directly but reference heap-allocated data via memory addresses.

Key Traits
Mutable: Can be modified in place (e.g., obj.key = 'new').

Passed by reference: Assignment copies the address, not data.

Heap storage: Dynamic size, managed by garbage collection.
*/
