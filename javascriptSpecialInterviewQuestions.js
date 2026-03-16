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

/*
SYMBOLS IN JAVASCRIPT

Symbols create unique, immutable identifiers in JavaScript, mainly to avoid property name collisions on objects.

Primary Use Case
Use symbols as object keys for "hidden" or private-like properties that won't clash with string keys from other code. They're non-enumerable, so they skip standard for...in or Object.keys() loops.

const myKey = Symbol('secret');
const obj = { [myKey]: 'hidden value' };
console.log(obj[myKey]);  // 'hidden value'
console.log(Object.keys(obj));  // [] — skips symbols

Common Applications
Libraries/Frameworks: Add metadata without overriding user properties (e.g., React internals).

Well-known Symbols: Like Symbol.iterator for custom iterables, or Symbol.toStringTag for custom object tags.
​
Privacy: Pseudo-private fields in classes, safe for plugins or extensions
*/

/*
temporal dead zone in js 

The Temporal Dead Zone (TDZ) is the period in a block scope where let or const variables exist but cannot be accessed until their declaration line executes.

Definition
During TDZ, let/const vars are hoisted (memory allocated) but remain uninitialized—accessing them throws ReferenceError. It spans from block start to the declaration statement. var skips TDZ, defaulting to undefined.

console.log(a);    // ReferenceError: Cannot access 'a' before initialization
let a = 5;
console.log(a);    // 5 — TDZ ends here

Why It Exists
Prevents bugs from using half-hoisted vars; encourages block-scoping discipline.

Yes, exactly—TDZ applies only to let and const, not var.

Why the Difference
var gets hoisted and initialized to undefined, so you can access it early (prints undefined). let/const hoist to an uninitialized state, blocking access until declaration executes.

console.log(v);  // undefined (no TDZ)
var v = 1;

console.log(l);  // ReferenceError (TDZ active)
let l = 2;

*/

/*
This Keyword in javascript
*/
/*
The “this” keyword refers to the object that the function is a property of.

The value of the “this” keyword will always depend on the object that is invoking the function.\

The silly way to understand the “this” keyword is, whenever the function is invoked, check the object before the dot. The value of this . keyword will always be the object before the dot.

If there is no object before the dot, the value of this keyword will be the global object.
*/

const obj1 = {
  name: "ganesh",
  greet: function(){
    console.log(this.name);
  }
}

const fn2 = obj1.greet;

const obj2 = {
  name: "Sasi",
  fn2 
}

obj2.fn2()

/*
implicit and explicit object binding in javascript 
*/
/*
'this' keyword binding priority order

new keyword highest
function greet() {
  console.log(this.name);
}

new greet();

explicit binding
implicit binding
default binding 
*/

/*
implicit object binding happens automatically through dot notation or square bracket
explicit object binding happens through call,bind and apply 

example:
*/
const obj = {
  name: "Hello",
  greet: function(){
    console.log(this.name);
  }
}

obj.greet();
obj['greet']();

/*
Explicit Object Binding happens through call,bind and apply methods in javascript
*/

/*
Call,bind and apply methods in javascript
*/
/*Call Method*/
const obj = { name: "Ganesh" }

function Greet(age) {  
  console.log(this.name + " " +  age);
}

Greet.call(obj, 45);

/*apply method*/
/*diff b/w call and apply is apply takes the arguments in array form */
const obj2 = {
  name: "Ganesh2"
}

function greet2(age){
  console.log(this.name + " " + age);
}

greet2.apply(obj2,[33]);

/*
bind method
bind returns a new function which can be executed later 
*/
const obj3 = {
  name: "Ganesh3"
}

function greet3(age){
  console.log(this.name + " " + age);
}

const bindfunction = greet3.bind(obj3,22);
bindfunction(); //will output 22 
bindfunction(66); //will still output 22 because you've fixed the arguement with 22
/*
if you don't want to fix the arguement value to 22 
then when doing bind don't bind the 22 value pass it when needed or calling the bindfunction
*/

/*why arrow functions don't have explicit binding in javascript*/
/*
Arrow functions don't have call/bind/apply because they use LEXICAL this binding, not dynamic binding.

Why Arrow Functions Ignore call/bind/apply
Regular functions: this determined at runtime (dynamic) → call/bind/apply can change it
Arrow functions: this locked at creation time (lexical) → call/bind/apply ignored

const obj1 = { name: "ganesh" };
const obj2 = { name: "sasi" };

const regular = function() { console.log(this.name); };
const arrow = () => { console.log(this.name); };

regular.call(obj1);  // "ganesh" ✅ Dynamic this works
arrow.call(obj1);    // undefined ❌ Lexical this (global) locked

regular.call(obj2);  // "sasi" ✅ Works again
arrow.call(obj2);    // undefined ❌ Still global scope!


this in Object Methods (CRITICAL!)
Arrow functions as object methods = BROKEN this:

// ❌ WRONG - Arrow captures GLOBAL scope, not obj!
const obj = {
  name: "ganesh",
  greet: () => console.log(this.name)  // this = window/global
};
obj.greet();  // undefined (not "ganesh")

// ✅ CORRECT - Regular function gets obj context
const obj2 = {
  name: "sasi", 
  greet: function() { console.log(this.name); }  // this = obj2
};
obj2.greet();  // "sasi"


Visual Memory Model

REGULAR FUNCTION:
Runtime → Looks left of dot → Sets this = obj ✅

ARROW FUNCTION:  
Creation → Captures parent scope → Locks this FOREVER ❌
         ↓
Object method → Still has global this!

*/
