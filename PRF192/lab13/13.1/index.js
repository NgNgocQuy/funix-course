//
const car = function (make, speed) {
  this.make = make;
  this.speed = speed;
  this.accelerate = function () {
    this.speed += 10;
    console.log(`accelerate ${this.make} - ${this.speed} `);
  };
  this.brake = function () {
    this.speed -= 5;
    console.log(`brake ${this.make} - ${this.speed} `);
  };
};

const car1 = new car("BMW", 120);
console.log(car1);
console.log(car1.accelerate(), car1.brake());

const car2 = new car("Mercedes", 95);
console.log(car2);
console.log(car2.accelerate(), car2.brake());
