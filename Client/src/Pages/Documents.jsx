import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import globe from '../assets/Globe.webp';

const Documents = () => {
  const { id: visaTypeParam } = useParams(); // e.g., /documents/Work
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ user: '', visaType: '' });
  const [fileInputs, setFileInputs] = useState({});
  const [requiredDocs, setRequiredDocs] = useState([]);

  const visaDocuments = {
    Tourist: ['Passport', 'ApplicationForm', 'Photograph', 'FrequentTravelProof', 'FinancialStabilityProof', 'AccommodationTravelDetails', 'PurposeOfVisitLetter'],
    Work: ['Passport', 'ApplicationForm', 'Photograph', 'WorkExperience', 'EducationExperience', 'MedicalExam', 'Skills', 'EnglishTestScore', 'GovernmentAgreement', 'EmployerSponsorship', 'ProofOfFunds', 'RelationProof', 'ExpressionOfInterest', 'PointsTest'],
    Study: ['Passport', 'ApplicationForm', 'Photograph', 'AdmissionLetter', 'TuitionFeeReceipt', 'Sop'],
    Permanent: ['Passport', 'ApplicationForm', 'Photograph', 'ResidencyProof', 'BackgroundCheck', 'EducationalDocuments', 'LanguageTest', 'PoliceClearance', 'MarriageFamilyProof', 'ProofOfFunds', 'ExpressionOfInterest']
  };

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (userID) {
      setFormData(prev => ({ ...prev, user: userID }));
    }
    if (visaTypeParam && visaDocuments[visaTypeParam]) {
      setFormData(prev => ({ ...prev, visaType: visaTypeParam }));
      setRequiredDocs(visaDocuments[visaTypeParam]);
    }
  }, [visaTypeParam]);

  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    setFileInputs(prev => ({ ...prev, [docType]: file }));
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('user', formData.user);
    data.append('visaType', formData.visaType);

    for (let doc in fileInputs) {
      if (fileInputs[doc]) data.append(doc, fileInputs[doc]);
    }

    try {
      const token=localStorage.getItem('Token')
      console.log(token)
      const res = await fetch('http://localhost:0710/upload-documents', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });

      const result = await res.json();
      if (res.ok) {
        toast.success('Documents uploaded successfully!');
        setTimeout(() => navigate('/profile'), 2000);
      } else {
        toast.error(result.message || 'Upload failed.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Try again.');
    }
  };

  return (
    <>
      <MainNav />
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            background: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${globe})`,
            backgroundPosition: "65%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "120%",
            zIndex: "-1"
          }}
        ></div>

        <div className="min-h-screen flex items-center justify-center p-6 mt-10">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full">
            <h2 className="text-3xl font-bold text-[#003366] text-center mb-6">
              {visaTypeParam} Visa Document Submission
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* <div>
                <label htmlFor="user" className="block text-lg font-medium text-[#003366] mb-2">
                  User ID
                </label>
                <input
                  type="text"
                  name="user"
                  id="user"
                  value={formData.user}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                  required
                />
              </div> */}

              {/* Hidden/disabled visaType select input for safety */}
              <input type="hidden" name="visaType" value={formData.visaType} />

              {requiredDocs.map((doc, index) => (
                <div key={index}>
                  <label htmlFor={doc} className="block text-lg font-medium text-[#003366] mb-2">
                    {doc.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="file"
                    name={doc}
                    id={doc}
                    onChange={(e) => handleFileChange(e, doc)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                    required
                  />
                </div>
              ))}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#003366] text-white px-8 py-3 rounded-md hover:bg-[#B52721] transition-all"
                  
                >
                  Submit Documents
                </button>
              </div>
            </form>
          </div>
        </div>

        <ToastContainer position="top-right" style={{ top: '70px' }} autoClose={3000} />
        <Footer />
      </div>
    </>
  );
};

export default Documents;
