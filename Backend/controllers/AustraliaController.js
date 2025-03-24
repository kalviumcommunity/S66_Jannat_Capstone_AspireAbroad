const {VisaAustralia}=require('../models/visas.model')

const postVisa=async(req,res)=>{
    const {visaType, visaCategory, cost, stay, about, eligibility}=req.body;
    if (!visaType || !visaCategory || !cost || !stay || !about || !eligibility) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try{
        const newVisa=new VisaAustralia({
            visaType,
            visaCategory,
            cost,
            stay,
            about,
            eligibility
        })
        await newVisa.save()
        res.status(201).json({ message: `${visaType} visa data added successfully!`, newVisa });
    }catch(error){
        console.error('Error adding visa data:', error);
        res.status(500).json({ message: 'Server error. Could not add visa data.' });
    }
}

module.exports={postVisa}