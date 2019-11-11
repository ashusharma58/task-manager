require('../src/db/mongoose');
const User = require('../src/models/user');


User.findByIdAndUpdate('5dab85bc525eb439be83cc17', {age: 25}).then(user => {
    console.log(user);
    return User.countDocuments({age:25})
}).then(result => {
    console.log(result);
    
}).catch(err => {
    console.log(err);
    
})