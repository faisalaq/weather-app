console.log('Starting app');

setTimeout(() => {
    console.log('Inside the callback');
}, 2000)

setTimeout(() => {
    console.log('Inside the callback two');
}, 0000)

console.log('ending app');