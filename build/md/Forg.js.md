# ![forgJs logo](https://github.com/oussamahamdaoui/forgJs/raw/master/media/logo.png?raw=true)

ForgJs is a JavaScript lightweight object validator, it's my first contribution to the opensource community. As javascript became my favorite language for the back-end (bye PHP 👋)
I thought i could write a library that could validate JSON for both the front-end and the back-end. Thats how Forg.js was born.

### Here is a quick example:

```javascript

const { Validator, Rule } = require('@cesium133/forgjs');

const emailRule = new Rule({
    type: 'email',
    user: user => user === 'dedede',
    domain: domain => ['outlook', 'gmail', 'yahoo'].indexOf(domain) !== -1,
}, null);

const passwordRule = new Rule({
    type: 'password',
    minLength: 8,
    uppercase: 1,
    numbers: 1,
    matchesOneOf: ['@', '_', '-', '.', '!'],
}, null);

const userValidator = new Validator({
    age: new Rule({ type: 'int', min: 18, max: 99 }),
    dateOfBirth: new Rule({ type: 'date' }),
    array: new Rule({ type: 'array', of: new Rule({ type: 'string' }) }),
    email: emailRule,
    password: passwordRule
});

userValidator.test({
    age: 26,
    dateOfBirth: new Date(1995, 10, 3),
    array: ['1'],
    email: 'dedede@yahoo.fr;',
    password: 'ad1_A@@Axs',
}); /// returns true

```