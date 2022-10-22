console.log([1, 'a', {}] == [1, 'a', {}]) // false
console.log({ value: 1 } == { value: 1 }) // false


Object.is('abc', 'abc');     // true
Object.is(window, window);   // true
Object.is({}, {});           // false

const foo = { p: 1 };
const bar = { p: 1 };
const baz = foo;

Object.is(foo, bar);         // false
Object.is(foo, baz);         // true