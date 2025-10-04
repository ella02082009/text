import { generateToken } from "../utils/jwt.js";
import user from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
   const { email, fullname, password } = req.body
    try{
       if (password.length < 6) {
        return res.status(400).json({ message: "password must be atleast 6 characters"});
       }

      const user = await user.findOne({ email}) 

      if (user) return res.status(400).json({ message: "email already exists"});

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = new User ({
        fullname,
        email,
        password : hashedPassword
      }) 

      if(newUser){
        //generate jwt token
        generateToken(newUser._id, res)
        await newUser.save();
      } else{
        res.status(400).json({ messsage: "invalid user data"});
      }
        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });

    }catch(error){
        console.log("Error in signup controller", error.mesage);
        res.status(500).json({ message: " Internal Server error"});
    }
    
};

export const login = (req, res) => {
    res.send("login route");
};

export const logout = (req, res) => {
    res.send("logout route");
};