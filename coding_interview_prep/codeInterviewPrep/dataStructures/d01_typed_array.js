// Type	Each element size in bytes
// Int8Array	1
// Uint8Array	1
// Uint8ClampedArray	1
// Int16Array	2
// Uint16Array	2
// Int32Array	4
// Uint32Array	4
// Float32Array	4
// Float64Array	8

const byteSize = 128
const buffer = new ArrayBuffer(byteSize)
const i32View = new Int32Array(buffer)

console.log(i32View)

// another way - direct create

const i8 = new Int16Array(3)
console.log(i8)


// Note
// Typed arrays do not have some of the methods traditional arrays have such as .pop() or .push(). Typed arrays also fail Array.isArray() that checks if something is an array. Although simpler, this can be an advantage for less-sophisticated JavaScript engines to implement them.
