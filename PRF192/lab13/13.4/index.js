//
// class carCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed += 10;
//     console.log(`accelerate ${this.make} - ${this.speed} `);
//   }
//   brake() {
//     this.speed -= 5;
//     console.log(`brake ${this.make} - ${this.speed} `);
//   }
//   get speedUS() {
//     console.log(`get: ${this.speed} km/h -> ${this.speed / 1.6} mile/h`);
//     return this.speed / 1.6;
//   }
//   set speedUS(speedUS) {
//     this.speed = speedUS;
//     console.log(`set: ${this.speed} km/h`);
//   }
// }

// const car1 = new carCl("BMW", 120);
// // console.log(car1);
// // car1.accelerate();
// // car1.brake();
// // car1.speedUS = 110;
// // console.log("speedUS: ", car1.speedUS);

// // const car2 = new carCl("Mercedes", 95);
// // console.log(car2);
// // car2.accelerate();
// // car2.accelerate();
// // car2.brake();
// // car2.accelerate();
// // console.log(car2);
// // car2.speedUS = 80;
// // console.log("speedUS: ", car2.speedUS);

class carCL {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`accelerate ${this.make} - ${this.speed} `);
  }
  brake() {
    this.speed -= 5;
    console.log(`brake ${this.make} - ${this.speed} `);
  }
  get speedUS() {
    console.log(`get: ${this.speed} km/h -> ${this.speed / 1.6} mile/h`);
    return this.speed / 1.6;
  }
  set speedUS(speedUS) {
    this.speed = speedUS;
    console.log(`set: ${this.speed} km/h`);
  }
}

class evCL extends carCL {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.charge = chargeTo;
    console.log("battery charged to: ", this.#charge);
  }
  accelerate(speed) {
    this.speed += speed;
    this.charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
  }
}

const Rivian = new evCL("Rivian", 120, 23);
// console.log(Tesla.#charge);
// console.log(Tesla.charge);
console.log(Rivian);
console.log(Rivian.brake());
Rivian.accelerate(20);
console.log(Rivian);

Rivian.chargeBattery(90);
console.log(Rivian);
