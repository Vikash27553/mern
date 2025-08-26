import express from 'express';
import{create, getAllUser, getUserById, updateUSer,deleteUser} from '../controller/userController.js';

const route = express.Router();
route.post('/user', create);
route.get('/users', getAllUser);
route.get('/userid/:id', getUserById); 
route.put('/update/user/:id', updateUSer); 
route.delete('/delete/:id/', deleteUser );
route.get('/get', (req, res) => {
  res.status(200).json({ message: "User route is working" });
});

export default route;