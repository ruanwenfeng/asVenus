

describe('matcher', () => {
  it ('toBe', () => {
    expect(3).toBe(3)
    expect(NaN).toBe(NaN)
  })

  it ('toEqual', () => {
    expect({name: 'sunny', age: 22}).toEqual({age: 22, name: 'sunny'})
    expect(['sunny', 22]).toEqual(['sunny', 22])
  })

  it('toBeNull', () => {
    expect(null).toBeNull()
  })

  it('toBeUndefined', () => {
    expect(undefined).toBeUndefined()
  })

  it('toBeDefined', () => {
    expect(1).toBeDefined()
  })

  it('toBeTruthy', () => {
    expect(true).toBeTruthy()
    expect('sunny').toBeTruthy()
    expect(1).toBeTruthy()
    expect([]).toBeTruthy()
  })

  it('toBeFalsy', () => {
    expect(false).toBeFalsy()
    expect('').toBeFalsy()
    expect(0).toBeFalsy()
  })

  it('toBeNaN', () => {
    expect(NaN).toBeNaN()
  })

  it('toHaveLength', () => {
    expect([1, 2, 3]).toHaveLength(3)
    expect('abcd').toHaveLength(4)
  })

  it('toBeGreaterThan', () => {
    expect(10).toBeGreaterThan(3)
  })

  it('toBeGreaterThanOrEqual', () => {
    expect(10).toBeGreaterThanOrEqual(3)
    expect(10).toBeGreaterThanOrEqual(10)
  })

  it('toBeLessThan', () => {
    expect(10).toBeLessThan(20)
  })

  it('toBeLessThanOrEqual', () => {
    expect(10).toBeLessThanOrEqual(20)
    expect(10).toBeLessThanOrEqual(10)
  })

  it('toMatch', () => {
    expect('mocha and jest').toMatch(/jest/)
  })

  it('toContain', () => {
    expect([1, 2, 3]).toContain(3)
    expect('mocha and jest').toContain('and')

  })
})