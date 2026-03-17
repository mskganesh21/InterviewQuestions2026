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
/*
<!-- defer = "parse HTML first, run JS later" -->
<script defer src="app.js"></script>

<!-- async = "download in parallel, run when ready" -->
<script async src="analytics.js"></script>
*/

// function and variable with same name 

var x = 10;
console.log(x);

function x(){
  console.log(20);
}

x();

/*
at run time javascript hoists the variables and functions 
but function gets precedence over the variable
hence it becomes the function first 

at runtime 

function x(){
  console.log(20);
}

x=10;
console.log(x); //outputs 10
x(); //throws error that it is not a function 
*/

//currying in javascript

function add(a,b){
  return a+b;
}

console.log(add(2,3));

function add2(a){
  return function(b){
    return a+b;
  }
}

const answer = add2(2)(7);
console.log(answer);

✅ Creates "factories" for repetitive configs
✅ Cleaner JSX (no massive inline functions)
✅ Reusable API clients per environment
✅ Perfect for hooks: useCallback + currying
✅ Event handlers without .bind()


/*SCOPES OF VARIABLES IN JAVASCRIPT*/
/*
var has functional and global scope 
while 
let and const have block scope 

| Keyword | Scope Type            | Scope Boundary                   |
| ------- | --------------------- | -------------------------------- |
| var     | Function/Global scope | {} of functions or entire script |
| let     | Block scope           | {} of if, for, while, etc.       |
| const   | Block scope           | Same as let                      |

// FUNCTION SCOPE (var)
function test() {
  if (true) {
    var x = 1;     // Function-scoped
    let y = 2;     // Block-scoped  
    const z = 3;   // Block-scoped
  }
  console.log(x);    // ✅ 1 (var leaks out)
  // console.log(y); // ❌ ReferenceError
  // console.log(z); // ❌ ReferenceError
}

// BLOCK SCOPE (let/const)
if (true) {
  let a = 10;
  const b = 20;
}
// console.log(a); // ❌ ReferenceError - block ends!


for (var i = 0; i < 3; i++) {
  // i is accessible HERE (function scope)
}
console.log(i);  // 3 ✅ var survives loop

for (let j = 0; j < 3; j++) {
  // j is NOT accessible HERE (block scope)
}
// console.log(j); // ❌ ReferenceError
*/
/*
var = function scope (leaks everywhere)

let/const = block scope (stays contained)

// ❌ PROBLEMATIC - var "leaks" from loop
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);  // Closure captures i
}
// Output: 3, 3, 3  ❌ All print FINAL value!

// ✅ FIXED with let (block scope)
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
// Output: 0, 1, 2  ✅ Each iteration separate!

*/
/*
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
outputs: 3,3,3

Why does this happen? (simple explanation)
Step 1: var is NOT block-scoped

var is function-scoped, meaning there is only one shared i for the whole loop.

Think of it like:

There is just one variable i, and every iteration updates it.

Step 2: Loop runs FIRST

Step 3: setTimeout runs LATER

The callback inside setTimeout runs after 1 second, when the loop is already finished.

One-line intuition

var → one shared variable → all print same final value

let → new variable each loop → prints correct values
*/

/*ILLEGAL SHADOWING IN JAVASCRIPT*/
/*
Illegal shadowing occurs when you re-declare a variable from an outer scope using a different keyword in an inner scope. This is SyntaxError in modern JavaScript.

Legal Shadowing ✅
let x = 10;  // Outer scope

function example() {
  let x = 20;  // ✅ LEGAL - Same keyword shadows outer let
  console.log(x);  // 20
}

Illegal Shadowing ❌
// ❌ SYNTAX ERROR!
let x = 10;

function illegal() {
  var x = 20;  // ERROR: Can't redeclare 'x' with var
}

// ❌ SYNTAX ERROR!
const y = 30;

if (true) {
  var y = 40;  // ERROR: Can't shadow const with var
}

| From → To        | Status    | Reason                                 |
| ---------------- | --------- | -------------------------------------- |
| let → let        | ✅ Legal   | Same binding type                      |
| let → var        | ❌ Illegal | Different temporal behavior (hoisting) |
| const → Anything | ❌ Illegal | Constants can't be shadowed            |
| var → var        | ✅ Legal   | Same function scope                    |

✅ let → let
✅ var → var  
✅ const → const (but can't reassign anyway)

❌ let/const → var
❌ const → let/const  
❌ Function params → same name

Illegal shadowing prevents bugs from mixing hoisted var with block-scoped let/const!
*/

/*CLOSURES IN JAVASCRIPT*/
Closures are an ability of a function to remember the variables and functions that are declared in its outer scope.

This ability of a function to store a variable for further reference even after it is executed is called Closure.

function randomFunc(){
  var obj1 = {name:"Vivian", age:45};

  return function(){
    console.log(obj1.name + " is "+ "awesome"); // Has access to obj1 even when the randomFunc function is executed

  }
}

var initialiseClosure = randomFunc(); // Returns a function

initialiseClosure();  //when this function runs we'll still get the output as vivian is awesome 
//this ability is called closure 


/*PROTOTYPAL INHERITANCE IN JAVASCRIPT*/
All javascript objects inherit properties from a prototype. For example,
Date objects inherit properties from the Date prototype
Math objects inherit properties from the Math prototype
Array objects inherit properties from the Array prototype.
On top of the chain is Object.prototype. Every prototype inherits properties and methods from the Object.prototype.
A prototype is a blueprint of an object. The prototype allows us to use properties and methods on an object even if the properties and methods do not exist on the current object.

Consider an array 
let arr = [];
arr.push(2);
console.log(arr);

In the code above, as one can see, we have not defined any property or method called push on the array “arr” but the javascript engine does not throw an error.
The reason is the use of prototypes. As we discussed before, Array objects inherit properties from the Array prototype.
The javascript engine sees that the method push does not exist on the current array object and therefore, looks for the method push inside the Array prototype and it finds the method.

this is prototypal inheritance in javascript
