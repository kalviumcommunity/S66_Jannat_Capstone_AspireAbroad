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
        const defaultSteps = [
  { title: 'Application Submitted', comment: 'Your application has been received.', order: 1 },
  { title: 'Visa Application Payment', comment: 'Your payment for the visa application has been successfully received.', order: 2 },
  { title: 'Documents Verified', comment: 'Documents reviewed by the case officer.', order: 3 },
  { title: 'Background Check', comment: 'Background check is in process.', order: 4 },
  { title: 'Interview Scheduled', comment: 'Interview has been scheduled.', order: 5 },
  { title: 'Payment Completed', comment: 'All required visa fees have been paid successfully.', order: 6 },
  { title: 'Interview Completed', comment: 'You have completed the interview.', order: 7 },
  { title: 'Visa Approved', comment: 'Your visa has been approved!', order: 8 },
  { title: 'Visa Issued', comment: 'Visa is issued and sent to your address.', order: 9 }
];

        const newUser=new User({
            firstname,
            lastname,
            email,
            phonenumber,
            countryresidence,
            destination,
            visaType,
            password:hashedPassword,
            termsAccepted,
            steps: defaultSteps
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

const getUser = async (req, res) => {
    const userId = req.params.id; 
    try {
        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
const getAllUsersWithDetails = async (req, res) => {
    try {
        const users = await User.find()
            .populate("appointments")
            .populate("documents");

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// PUT /api/users/:userId/steps
const markStep = async (req, res) => {
  const { userId } = req.params;
  const { title, completed } = req.body; 

  if (!title || typeof completed !== 'boolean') {
    return res.status(400).json({ message: "Please provide 'title' and 'completed' in body." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const step = user.steps.find(s => s.title === title);
    if (!step) return res.status(404).json({ message: "Step not found with the given title" });

    step.completed = completed;
    step.completedAt = completed ? new Date() : null;

    await user.save();

    return res.status(200).json({
      message: `Step '${title}' marked as ${completed ? "completed" : "not completed"}`,
      updatedStep: step
    });
  } catch (error) {
    console.error("Error updating step:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
const admin=async(req,res)=>{
    
  const { password } = req.body;
  const Password = process.env.PASSWORD;

  try {
    if (password===Password) {
      res.status(200).json({ success: true, message: 'Welcome Admin!' });
    } else {
      res.status(401).json({ success: false, message: 'Incorrect password' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}




module.exports={enroll,login,getUser,getAllUsersWithDetails,markStep,admin}