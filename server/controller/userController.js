// import express from 'express'; 
import user from '../model/userModel.js';

export const create = async (req, res) => {
    const { name, email, address } = req.body;
    try {
       const existingUser = await user.findOne({ email });
    if (existingUser) {
  return res.status(400).json({ message: "User already exists" });
}
const newUser = new user({ name, email, address });
const saveData = await newUser.save();
return res.status(201).json({ message: 'User created successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}
   
export const getAllUser = async (req, res) => {
    try {
        const userData = await user.find();
        if (!userData || userData.length === 0) {
            return res.status(500).json({ message: "no user found" });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const getUserById  =  async (req,res)=>{
    const id = req.params.id;
    try {
        const existuser=  await user.findById(id);
        if(!existuser) {
            return res.status(404).json({message: "usrer not exist"})
        }
        res.status(200).json(existuser);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

}
};

export const updateUSer = async (req, res)=>{

      const id = req.params.id;
    try {
        const existuser=  await user.findById(id);
        if(!existuser) {
            return res.status(404).json({message: "usrer not exist"})
        }
         const  updatedUser  = await user.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "User updated successfully", user: updatedUser  });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

}};


export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const existuser = await user.findById(id);
        if (!existuser) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
    