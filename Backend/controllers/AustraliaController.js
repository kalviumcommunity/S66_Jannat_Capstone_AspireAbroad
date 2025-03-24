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
const getVisas = async (req, res) => {
    const { visaType } = req.query;
    
    if (!visaType) {
      return res.status(400).json({ message: 'Visa type is required in the query.' });
    }
  
    try {
      const visas = await VisaAustralia.find({ visaType });
      if (visas && visas.length > 0) {
        res.status(200).json({ visas });
      } else {
        res.status(404).json({ message: `No ${visaType} visa data found.` });
      }
    } catch (error) {
      console.error('Error fetching visa data:', error);
      res.status(500).json({ message: 'Server error. Could not fetch visa data.' });
    }
  };
  

module.exports={postVisa,getVisas}