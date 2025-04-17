const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config({ path: './config/.env'})
const cors=require('cors')
const cookieParser=require('cookie-parser')
const MongoURL=process.env.URL
const PORT=process.env.PORT
const Australia=require('./routes/AustraliaRoutes')
const Canada=require('./routes/CanadaRoutes')
const UK=require('./routes/UKRoutes')
const USA=require('./routes/USARoutes')
const auth=require('./routes/UserRoutes')
const colleges=require('./routes/CollegesRoutes')
const app=express()
const multer = require('multer')
const Document=require('./models/documents.model')
const authenticate=require('./middleware/authenticate')
const payment=require('./routes/paypal')
const blog=require('./routes/BlogRouter')
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true 
  }));
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))
app.use('/Australia', Australia)
app.use('/Canada',Canada)
app.use('/USA',USA)
app.use('/UK',UK)
app.use('/',auth)
app.use('/',colleges)
app.use('/',payment)
app.use('/',blog)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

  // First declaration (unused)
  const upload = multer({ storage })  // Second declaration
   // First declaration (unused)

   const allFields = [
    'Passport', 'ApplicationForm', 'Photograph',
    'FrequentTravelProof', 'FinancialStabilityProof', 'AccommodationTravelDetails', 'PurposeOfVisitLetter',
    'WorkExperience', 'EducationExperience', 'MedicalExam', 'Skills', 'EnglishTestScore',
    'GovernmentAgreement', 'EmployerSponsorship', 'ProofOfFunds', 'RelationProof', 'ExpressionOfInterest',
    'PointsTest', 'AdmissionLetter', 'TuitionFeeReceipt', 'Sop',
    'ResidencyProof', 'BackgroundCheck', 'EducationalDocuments', 'LanguageTest', 'PoliceClearance', 'MarriageFamilyProof'
  ].map(name => ({ name, maxCount: 1 }));
  
  
  app.post('/upload-documents', authenticate, upload.fields(allFields), async (req, res) => {
    try {
      const { visaType, user } = req.body;
      const files = req.files;
  
      const documents = {};
      for (const key in files) {
        documents[key] = files[key][0].filename;
      }
  
      const newDoc = new Document({
        user,
        visaType,
        documents
      });
  
      await newDoc.save();
      res.json({ message: 'Documents uploaded successfully', data: newDoc });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to upload documents', details: err });
    }
  });
  
  app.get('/user-documents/:userID', authenticate, async (req, res) => {
    try {
      const userId=req.params.userID
      console.log(userId)
      const documents = await Document.find({ user: userId }).populate('user');
  
      res.status(200).json({ documents });
    } catch (err) {
      console.error('Error fetching user documents:', err);
      res.status(500).json({ error: 'Failed to fetch documents' });
    }
  });
  // app.get('/config/paypal',(req,res)=>{
  //   res.send(process.env.CLIENT)
  // })

app.listen(PORT,async()=>{
    try{
        await mongoose.connect(MongoURL)
        console.log("Connected to Database")
    }catch(error){
        console.log("Error is", error)
    }
    console.log(`listening on http://localhost:${PORT}`)
})