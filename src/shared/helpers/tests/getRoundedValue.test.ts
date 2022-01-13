import {getRoundedValue} from "../getRoundedValue";

describe('getRoundedValue', () => {
    it('returns correctly rounded value with correspondent accuracy', () => {
        expect(getRoundedValue(5)).toBe(5)
        expect(getRoundedValue(3.473434)).toBe(3.47)
        expect(getRoundedValue(100.00)).toBe(100)
    })
})