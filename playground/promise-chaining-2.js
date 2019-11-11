require('../src/db/mongoose');
const Task = require('../src/models/task');


// Task.findByIdAndDelete('5dab8911dfe7263b13e2fe3b').then(task => {
//     console.log(task);
//     return Task.countDocuments({completed: false})
// }).then(result => {
//     console.log(result);
    
// }).catch(err => {
//     console.log(err);
    
// });

const deleteTaskAndCount = async (id, status) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({completed : status});
  return count;
}

deleteTaskAndCount('5dab655c81c5152e6e098ac1', false).then((result) => {
    console.log('result', result);
}).catch((err) => {
    console.log('err', err);
    
})