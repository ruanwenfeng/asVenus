


module.exports = class Car {
  constructor () {
    this.oilMass  = 10
  }

  start (mileage) {
    this.oilMass = mileage * .1
  }

  addOil (rise) {
    this.oilMass += rise
  }

}