
const startTime = process.hrtime.bigint();

let a_o = []
class O_test{
    constructor(v1,v2,v3){
        this.v1 = v1
        this.v2 = v2
        this.v3 = v3
    }
}
// Simulate some operation
for (let i = 0; i < 123123; i++) {
  // operation
    a_o.push(new O_test(1,'asdf', {n:"2"}))
}

// End time
const endTime = process.hrtime.bigint();

// Calculate duration in microseconds
const durationInMicroseconds = (endTime - startTime) / 1000n;

console.log(`Operation duration in microseconds: ${durationInMicroseconds}`);
