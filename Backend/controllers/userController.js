const users = require("../db/model/userSchema");

const signup = async (req,res) => {
    try {
        const { name,email,password } = req.body;
        const userExists = await users.findOne({email});
        if(userExists){
            res.status(200).json({msg:"user already exists"});
        }else{
            const user = await users.create({
                name,
                email,
                password
            });
            res.status(201).json({msg:"user created"});
        }
    } catch (err) {
        console.log(`an error occurred in signup:${err}`);
        res.status(500).json({msg:"an server error"});
    }
}

const login = async (req,res) => {
    try {
        const { email,password } = req.body;
        const userExists = await users.findOne({email});
        if(userExists){
            if(userExists.password === password){
                res.status(200).json({msg:"user login success",auth:true});
            }else{
                res.status(401).json({msg:"invalid credentials",auth:false});
            }
        }else{
            res.status(200).json({msg:"not a registered user",auth:false});
        }
    } catch (err) {
        console.log(`an error occurred in login:${err}`);
        res.status(500).json({msg:"an server error",auth:false});
    }
}

const boolConverter = (name) => {
    if(name === "true") return true;
    if(name === "false") return false;
}

const addProduct = async (req,res) => {
    try {
        const { email } = req.body;
        const { id } = req.params;
        let { add } = req.query;
        let updated;
        if(boolConverter(add)){
            console.log(add);
            updated = await users.findOneAndUpdate({email},{ $push:{ products:id } },{new:true});
        }else{
            console.log(add);
            updated = await users.findOneAndUpdate({email},{ $pull:{ products:id } },{new:true});
        }
        if(updated){
            res.status(201).json({msg:"product updated",auth:true,updated});
        }else{
            res.status(401).json({msg:"product not updated",auth:false});
        }
    } catch (err) {
        console.log(`an error occurred in adding products:${err}`);
        res.status(500).json({msg:"an server error",auth:false});
    }
}

const getAllProducts = async (req,res) => {
    try {
        const { email } = req.query;
        const userData = await users.findOne({email});
        if(userData){
            const { products } = userData;
            res.status(200).json({msg:"got all product",auth:true,products});
        }else{
            res.status(204).json({msg:"products not found",auth:true});
        }
    } catch (err) {
        console.log(`an error occurred in adding products:${err}`);
        res.status(500).json({msg:"an server error",auth:false});
    }
}


module.exports = { signup,login,addProduct,getAllProducts };
