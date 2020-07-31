// const value = { body: 'test' };
// const validation = { body: 'string' };

// function validate(value, validationValue) {
//   let valueToTest = JSON.parse(JSON.stringify(value));

//   let validations = [];
//   Object.keys(valueToTest).forEach((key) => {
//     if (valueToTest.hasOwnProperty(key)) validations.push(true);

//   });
// }

const obj1 = { prop1: 'test', prop2: 'test' };
const obj2 = { prop2: 'test', prop1: 'test' };

console.log(JSON.stringify(obj1), JSON.stringify(obj2));
