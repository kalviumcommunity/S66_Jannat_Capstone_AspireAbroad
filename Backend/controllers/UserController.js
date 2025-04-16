const User=require('../models/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config({ path: '../config/.env' });
const enroll=async(req,res)=>{
    try{
        const { firstname, lastname, email, phonenumber, countryresidence, destination, visaType, password, termsAccepted } = req.body;
        if (!termsAccepted) {
            return res.status(400).json({ message: "You must agree to the terms and conditions" });
        }
        const userExists=await User.findOne({email})
        if (userExists) {
            return res.status(400).json({ message: 'User already exists, Please Login' });
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({
            firstname,
            lastname,
            email,
            phonenumber,
            countryresidence,
            destination,
            visaType,
            password:hashedPassword,
            termsAccepted
        })
        await newUser.save()
        res.status(200).json({message:" User Enrolled Successfully"
            ,newUser,
            success:true
        })
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}

const login = async (req, res) => {
    try {
        // const userID=req.user.userID
        const { firstname,lastname,email, password } = req.body;
        const found = await User.findOne({ email });
        if (!found) {
            return res.status(400).json({ message: "Email doesn't exist, SignUp first" });
        }
        const isMatch = await bcrypt.compare(password, found.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { userID: found._id, email: found.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        // res.cookie('token', token, {
        //     httpOnly: false,
        //     secure: false,
        //     sameSite: 'Lax',
        //     maxAge: 7 * 24 * 60 * 60 * 1000 
        // });
        // res.cookie("userID", userID,{
        //     httpOnly:false,
        //     maxAge: 24*60*60*1000
        // })
        // localStorage.setItem("userID", userID)
        res.status(200).json({
            message: "Login successful",
            user: { id: found._id, email: found.email },
            token: token,
            userID: found._id
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: error.message || "Something went wrong." });
    }
}

module.exports={enroll,login}