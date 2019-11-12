const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth')
const router = new express.Router()


// signup
router.post('/users', async (req, res) => {
    const user = new User(req.body);
   try {
       await user.save();
       const token = await user.generateAuthToken();
       res.status(201).send({ user, token })
   } catch (error) {
       res.status(400).send(error)
   }
 });
 
 // login
 router.post('/users/login', async (req, res) => {   
     try {
         const user = await User.findByCredentials(req.body.email,req.body.password);
         const token = await user.generateAuthToken();    
         res.send({user, token}) // 
     } catch (error) {
         res.status(400).send()
     }
 })

// logout from one device
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
})

// logout from all devices

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
})

 // for all users
 router.get('/users', auth ,async (req, res) => {
     try {
         const users = await User.find({});
         res.send(users)
         
     } catch (error) {
         res.status(500).send()
     }
 })

// for self profile
 router.get('/users/me', auth ,async (req, res) => {
     res.send(req.user);
})

// read user by id
 router.get('/users/:id', async (req, res) => {
     const _id = req.params.id;
     try {
         const user = await User.findById(_id);
         if(!user) return res.status(404).send();
         res.send(user)
     } catch (error) {
         res.status(500).send()
     }
 })
 
 

 // update user details 
 router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isVaildOperation = updates.every(update => allowedUpdates.includes(update));
    if(! isVaildOperation) return res.status(400).send('Err: invalid operation');
    try {
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send();
    }
   
});

// update user details by id
//  router.patch('/users/:id', async (req, res) => {
//      const updates = Object.keys(req.body);
//      const allowedUpdates = ['name', 'email', 'password', 'age'];
//      const isVaildOperation = updates.every(update => allowedUpdates.includes(update));
//      if(! isVaildOperation) return res.status(400).send('Err: invalid operation');
//      try {
//          const user =  await User.findById(req.params.id);
//          updates.forEach(update => user[update] = req.body[update]);
//          await user.save();
//         //  const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
//          if(!user) return res.status(404).send();
//          res.send(user);
//      } catch (error) {
//          res.status(400).send();
//      }
    
//  });


 // delete user self
 router.delete('/users/me', auth ,async (req, res) => {
     try {
        //  const user = await User.findByIdAndDelete(req.user._id);
        //  if(!user) return res.status(404).send();
        await req.user.remove();
         res.send(req.user)
     } catch (error) {
         res.status(500).send()
     }
 });

 // delete by id
//   router.delete('/users/:id',async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);
//          if(!user) return res.status(404).send();
//          res.send(user)
//      } catch (error) {
//          res.status(500).send()
//      }
//  });

 module.exports = router