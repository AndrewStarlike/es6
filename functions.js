// Arrow functions (full name arrow function expressions)
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) {
    return name.toUpperCase();
});
// The same as:
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
    name => name.toUpperCase()
);
// the arrow function above uses concise body syntax because it's on one line and so it doesn't need a return statement

// when an arrow function is stored in a variable
const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream('chocolate', 'waffle');
//Prints: Here's your chocolate ice cream in a waffle cone.

// If you need more than just a single line of code in your arrow function's body, then you can use the "block body syntax".
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map( name => {
    name = name.toUpperCase();
    return `${name} has ${name.length} characters in their name`;
});



// "this" keyword recap in regular functions
const mySundae = new Sundae('Chocolate', ['Sprinkles', 'Hot Fudge']);
// In the code above, the value of this inside the Sundae constructor function is a new object because it was called with new.

// If the function is invoked with call/apply:
const result = obj1.printName.call(obj2);
// In the code above, the value of this inside printName() will refer to obj2 since the first parameter of call() is to
// explicitly set what this refers to.

data.teleport();
// In the code above, the value of this inside teleport() will refer to data.

teleport();
// In the code above, the value of this inside teleport() is either the global object or, if in strict mode, it's undefined.


// With regular functions, the value of this is set based on how the function is called. With arrow functions, the value
// of this is based on the function's surrounding context. In other words, the value of this inside an arrow function is
// the same as the value of this outside the function.
// constructor
function IceCream() {
    this.scoops = 0;
}
IceCream.prototype.addScoop = function() {
    setTimeout(function() {
        this.scoops++;
        console.log('scoop added!');
    }, 500);
};
const dessert = new IceCream();
dessert.addScoop();
// After running the code above, you'd think that dessert.scoops would be 1 after half a millisecond. But, unfortunately, it's not.
// The function passed to setTimeout() is called without new, without call(), without apply(), and without a context object.
// That means the value of this inside the function is the global object and NOT the dessert object. So what actually
// happened was that a new scoops variable was created (with a default value of undefined) and was then incremented
// (undefined + 1 results in NaN).

// One way around this is to use closure:
function IceCream() {
    this.scoops = 0;
}
IceCream.prototype.addScoop = function() {
    const cone = this; // sets `this` to the `cone` variable
    setTimeout(function() {
        cone.scoops++; // references the `cone` variable
        console.log('scoop added!');
    }, 0.5);
};
const dessert = new IceCream();
dessert.addScoop();

// let's replace the function passed to setTimeout() with an arrow function:
function IceCream() {
    this.scoops = 0;
}
IceCream.prototype.addScoop = function() {
    setTimeout(() => { // an arrow function is passed to setTimeout
        this.scoops++;
        console.log('scoop added!');
    }, 0.5);
};
const dessert = new IceCream();
dessert.addScoop();
// Since arrow functions inherit their this value from the surrounding context, this code works!
// When addScoop() is called, the value of this inside addScoop() refers to dessert. Since an arrow function is passed
// to setTimeout(), it's using its surrounding context to determine what this refers to inside itself. So since this
// outside of the arrow function refers to dessert, the value of this inside the arrow function will also refer to dessert.

// Now what do you think would happen if we changed the addScoop() method to an arrow function?
function IceCream() {
    this.scoops = 0;
}
IceCream.prototype.addScoop = () => { // addScoop is now an arrow function
    setTimeout(() => {
        this.scoops++;
        console.log('scoop added!');
    }, 0.5);
};
const dessert = new IceCream();
dessert.addScoop();
// Yeah, this doesn't work for the same reason - arrow functions inherit their this value from their surrounding context.
// Outside of the addScoop() method, the value of this is the global object. So if addScoop() is an arrow function, the
// value of this inside addScoop() is the global object. Which then makes the value of this in the function passed to
// setTimeout() also set to the global object!



// Default function parameters
function greet(name = 'Student', greeting = 'Welcome') {
    return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!



// Defaults and destructuring arrays
function createGrid([width = 5, height = 5] = []) {
    return `Generates a ${width} x ${height} grid`;
}

createGrid([]); // Generates a 5 x 5 grid
createGrid([2]); // Generates a 2 x 5 grid
createGrid([2, 3]); // Generates a 2 x 3 grid
createGrid([undefined, 3]); // Generates a 5 x 3 grid
createGrid(); // does not throw an error because the array has a default value = []



// Defaults and destructuring objects
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
    const scoopText = scoops === 1 ? 'scoop' : 'scoops';
    return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae({}); // Your sundae has 1 scoop with Hot Fudge toppings.
createSundae({scoops: 2}); // Your sundae has 2 scoops with Hot Fudge toppings.
createSundae({scoops: 2, toppings: ['Sprinkles']}); // Your sundae has 2 scoops with Sprinkles toppings.
createSundae({toppings: ['Cookie Dough']}); // Your sundae has 1 scoop with Cookie Dough toppin
createSundae(); // Your sundae has 1 scoop with Hot Fudge toppings.



// ES5 "Class" Recap

// Since ES6 classes are just a mirage and hide the fact that prototypal inheritance is actually going on under the hood,
// let's quickly look at how to create a "class" with ES5 code:
function Plane(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
}
// methods "inherited" by all instances
Plane.prototype.startEngines = function () {
    console.log('starting engines...');
    this.enginesActive = true;
};
const richardsPlane = new Plane(1);
richardsPlane.startEngines();
const jamesPlane = new Plane(4);
jamesPlane.startEngines();
// In the code above, the Plane function is a constructor function that will create new Plane objects. The data for a
// specific Plane object is passed to the Plane function and is set on the object. Methods that are "inherited" by each
// Plane object are placed on the Plane.prototype object. Then richardsPlane is created with one engine while jamesPlane
// is created with 4 engines. Both objects, however, use the same startEngines method to activate their respective engines.



// ES6 Classes

//Here's what that same Plane class would look like if it were written using the new class syntax:
class Plane {
    constructor(numEngines) {
        this.numEngines = numEngines;
        this.enginesActive = false;
    }

    startEngines() {
        console.log('starting engines…');
        this.enginesActive = true;
    }
}

// Static methods
class Plane {
    constructor(numEngines) {
        this.numEngines = numEngines;
        this.enginesActive = false;
    }

    static badWeather(planes) {
        for (plane of planes) {
            plane.enginesActive = false;
        }
    }

    startEngines() {
        console.log('starting engines…');
        this.enginesActive = true;
    }
}
// Static makes badWeather() a method that's accessed directly on the Plane class
Plane.badWeather([plane1, plane2, plane3]);

// Benefits of classes: All code that's needed for the class is contained in the class declaration. Instead of having the
// constructor function in one place, then adding methods to the prototype one-by-one, you can do everything all at once!

// When creating a new instance of a JavaScript class, the new keyword must be used
class Toy {
...
}

const myToy1 = Toy(); // throws an error
const myToy2 = new Toy(); // this works!

