const Car = require('../example/car')


describe('mock',  ()  =>{
  let car

  beforeEach(() => car = new Car())

  it('行驶', () => {
    car.start(10)
    expect(car.oilMass).toBe(1)
  })

  it('加油', () => {
    car.addOil(1)
    expect(car.oilMass).toBe(11)
  })
})