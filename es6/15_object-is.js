/**
 * +0 == -0  true
 * +0 === -0   true
 * NaN == NaN   false
 */

Object.is(NaN, NaN)
// true

Object.is(+0, -0)
// false