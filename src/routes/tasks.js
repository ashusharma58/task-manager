const Task =  require('../models/task');
const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks',auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send();
    }
})

// Get /task?completed=true
router.get('/tasks', auth,  async (req, res) => {
    try {
        // const tasks = await Task.find({ owner: req.user._id });
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send()
    }
})

// Get task with auth
// router.get('/tasks', auth,  async (req, res) => {
//     try {
//         // const tasks = await Task.find({ owner: req.user._id });
//         await req.user.populate('tasks').execPopulate()
//         res.send(req.user.tasks)
//     } catch (error) {
//         res.status(500).send()
//     }
// })

// Get task by id without auth

// router.get('/tasks/:id', async (req, res) => {
//     const _id = req.params.id
//     try {
//         const task = await Task.findById(_id);
//         if(!task) return res.status(404).send();
//         res.send(task)
//     } catch (error) {
//         res.status(500).send()
//     }
// });
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({  _id, owner: req.user._id })
        if(!task) return res.status(404).send();
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
});

// update task with auth 
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isVaildUpdate = updates.every(update => allowedUpdates.includes(update));
    if(!isVaildUpdate) return res.status(400).send('Err: invalid update')
    try {

        // const task = await Task.findById(req.params.id);
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id});
        updates.forEach(update =>  task[update] = req.body[update]);
        await task.save();
        if(!task) return res.status(404).send();
        res.send(task)
        
    } catch (error) {
        res.status(404).send()
    }
});


// update task without auth

// router.patch('/tasks/:id', async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['description', 'completed'];
//     const isVaildUpdate = updates.every(update => allowedUpdates.includes(update));
//     if(!isVaildUpdate) return res.status(400).send('Err: invalid update')
//     try {

//         const task = await Task.findById(req.params.id);
//         updates.forEach(update =>  task[update] = req.body[update]);
//         await task.save();
//         // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
//         if(!task) return res.status(404).send();
//         res.send(task)
        
//     } catch (error) {
//         res.status(404).send()
//     }
// });

// delete task with auth
router.delete('/tasks/:id', auth ,async (req, res) => {
    try {
        // const task =  await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id  })
        if(!task) return res.status(404).send();
        // await req.task.remove();
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
})

// delete task without auth
// router.delete('/tasks/:id', async (req, res) => {
//     try {
//         const task =  await Task.findByIdAndDelete(req.params.id);
//         if(!task) return res.status(404).send();
//         res.send(task);
//     } catch (error) {
//         res.status(500).send();
//     }
// })


module.exports = router