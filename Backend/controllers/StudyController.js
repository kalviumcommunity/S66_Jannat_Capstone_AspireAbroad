const colleges=require('../colleges')
const getcolleges=async(req,res)=>{
    const {country}=req.query;
    if (!country) {
        return res.status(400).json({ message: 'country is required in the query.' });
    }
    try{
        const found = colleges.filter(college => college.country.toLowerCase() === country.toLowerCase());
        if (found){
            console.log(found)
            return res.status(200).json({found})
        }

    }catch (error) {
        console.error('Error fetching visa data:', error);
        res.status(500).json({ message: 'Server error. Could not fetch visa data.' });
      }


}
module.exports={getcolleges}