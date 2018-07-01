// use let when you plan to reassign new values to a variable, and
let someVar = 'some var';
// use const when you don’t plan on reassigning new values to a variable.
const anotherVar = 'another var';



// Template literals
const student = {
    name: 'Richard Kalehoff',
    guardian: 'Mr. Kalehoff'
};

const teacher = {
    name: 'Mrs. Wilson',
    room: 'N231'
}

let message = `${student.name} please see ${teacher.name} in ${teacher.room} to pick up your report card.`;



// Destructuring values from an array
const point = [10, 25, -34];
const [x, y, z] = point;



// Destructuring values from an object
const gemstone = {
    type: 'quartz',
    color: 'rose',
    karat: 21.29
};

const {type, color, karat} = gemstone;



const circle = {
    radius: 10,
    color: 'orange',
    getArea: function() {
        return Math.PI * this.radius * this.radius;
    },
    getCircumference: function() {
        return 2 * Math.PI * this.radius;
    }
};

let {radius, getArea, getCircumference} = circle;
// getArea = NaN



// Object literal shorthand
let type = 'quartz';
let color = 'rose';
let carat = 21.29;
let gemstone = {type, color, carat};



// Shorthand method names
const gemstone = {
    type,
    color,
    carat,
    calculateWorth: function() {
        // will calculate worth of gemstone based on type, color, and carat
    }
};
// Becomes
let gemstone = {
    type,
    color,
    carat,
    calculateWorth() { ... }
};



// The for loop
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < digits.length; i++) {
    console.log(digits[i]);
}



// The for...in loop
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
    console.log(digits[index]);
}
// ATTENTION!
// Because for...in loops loop over all enumerable properties, this means if you add any additional properties to the
// array's prototype, then those properties will also appear in the loop.



// For...of loop
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
    console.log(digit);
}
// EXTRA: You can stop or break a for...of loop at anytime.



// Spread operator
const books = ["Don Quixote", "The Hobbit", "Alice in Wonderland", "Tale of Two Cities"];
console.log(...books);
// Prints: Don Quixote The Hobbit Alice in Wonderland Tale of Two Cities

const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
console.log(...primes);
// Prints: 2 3 5 7 11 13 17 19 23 29

// Combining arrays with concat
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = fruits.concat(vegetables);
console.log(produce);
// Prints: ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]
// Alternative:
const produce = [...fruits, ...vegetables];
console.log(produce);



// Rest parameter
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
// Prints: 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]

// Variadic functions
sum(1, 2);
sum(10, 36, 7, 84, 90, 110);
sum(-23, 3000, 575000);
function sum(...nums) {
    let total = 0;
    for (const num of nums) {
        total += num;
    }
    return total;
}