const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { Server } = require('socket.io');
const http = require('http');

const MongoURL = process.env.URL;
const PORT = process.env.PORT;

const Australia = require('./routes/AustraliaRoutes');
const Canada = require('./routes/CanadaRoutes');
const UK = require('./routes/UKRoutes');
const USA = require('./routes/USARoutes');
const auth = require('./routes/UserRoutes');
const colleges = require('./routes/CollegesRoutes');
const payment = require('./routes/paypal');
const blog = require('./routes/BlogRouter');
const appointment = require('./routes/Appointment');
const Document = require('./models/documents.model');
const authenticate = require('./middleware/authenticate');
const cloudinary=require('./middleware/cloudinary')
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   api_key:process.env.API_KEY,
//   cloud_name:process.env.CLOUD_NAME,
//   api_secret:process.env.API_SECRET,
// });

// module.exports = cloudinary;

const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://effulgent-lebkuchen-ac0277.netlify.app",
    "https://resonant-kangaroo-7b36ee.netlify.app"
  ],
  credentials: true
}));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(cookieParser());





app.use('/Australia', Australia);
app.use('/Canada', Canada);
app.use('/USA', USA);
app.use('/UK', UK);
app.use('/', auth);
app.use('/', colleges);
app.use('/', payment);
app.use('/', blog);
app.use('/', appointment);






app.post('/upload-documents', authenticate, async (req, res) => {
  try {
    const { user, visaType, files } = req.body; 
    if (!user || !visaType || !files) {
      return res.status(400).json({ message: 'Missing required data' });
    }

    const uploadedDocs = {};

    for (const docType in files) {
      const base64 = files[docType];
      if (base64) {
        const uploadRes = await cloudinary.uploader.upload(base64, {
          folder: `visa_documents/${visaType}/${user}`,
        });
        uploadedDocs[docType] = uploadRes.secure_url;
      }
    }

    const newDoc = new Document({
      user,
      visaType,
      documents: uploadedDocs,
    });

    await newDoc.save();

    res.status(200).json({ message: 'Documents uploaded successfully', data: newDoc });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload documents' });
  }
});

app.put('/update-documents/:docId', authenticate, async (req, res) => {
  try {
    const docId = req.params.docId;
    const { files, visaType } = req.body;  

    if (!files && !visaType) {
      return res.status(400).json({ message: 'No data provided to update' });
    }

    
    const document = await Document.findById(docId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    
    if (files) {
      for (const docType in files) {
        const base64 = files[docType];
        if (base64) {
          const uploadRes = await cloudinary.uploader.upload(base64, {
            folder: `visa_documents/${visaType || document.visaType}/${document.user}`,
          });
          document.documents[docType] = uploadRes.secure_url;
        }
      }
    }

    
    if (visaType) {
      document.visaType = visaType;
    }

    await document.save();

    res.status(200).json({ message: 'Document updated successfully', data: document });
  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).json({ error: 'Failed to update document' });
  }
});

app.get('/user-documents/:userID', authenticate, async (req, res) => {
  try {
    const userId = req.params.userID;
    const documents = await Document.find({ user: userId }).populate('user');
    res.status(200).json({ documents });
  } catch (err) {
    console.error('Error fetching user documents:', err);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://effulgent-lebkuchen-ac0277.netlify.app",
      "https://resonant-kangaroo-7b36ee.netlify.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});


io.on('connection', socket => {
  console.log('New client connected:', socket.id);

  socket.on('send_message', data => {
    io.emit('receive_message', data); 
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


server.listen(PORT, async () => {
  try {
    await mongoose.connect(MongoURL);
    console.log("✅ Connected to MongoDB Database");
    console.log(cloud_name);  // should print your actual cloud name

  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
  console.log(`Server listening on http://localhost:${PORT}`);
});
