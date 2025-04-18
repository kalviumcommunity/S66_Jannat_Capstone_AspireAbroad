import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import MainNav from '../components/MainNav';
import { Link } from 'react-router-dom';

function Profile() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const [activeTab, setActiveTab] = useState('all');
  const baseUrl = 'http://localhost:710/uploads/';

  useEffect(() => {
    const storedUserId = localStorage.getItem('userID');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchDocuments(storedUserId);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchDocuments = async (id) => {
    const token = localStorage.getItem('Token');
    setLoading(true);
    try {
      const res = await fetch(`https://jannat-aspireabroad.onrender.com/user-documents/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      if (data.documents && Array.isArray(data.documents)) {
        setDocuments(data.documents);
        setUserDetails(data.documents[0]?.user || null);
      } else {
        alert('No documents found for this user');
      }
    } catch (err) {
      console.error('Error fetching documents:', err);
      alert('Failed to fetch documents. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments =
    activeTab === 'all'
      ? documents
      : documents.filter((doc) =>
          doc.visaType.toLowerCase().includes(activeTab)
        );

  return (
    <>
      <MainNav />
      <div className="min-h-screen bg-gray-50 text-gray-800 mt-20">
      {userDetails && (
  <div className="bg-white rounded-xl shadow-md p-6 mb-10 border-l-4 border-[#B52721]">
    <h2 className="text-2xl font-bold text-[#003366] mb-4 flex items-center">
      {/* Avatar */}
      <img
        src={userDetails.avatar || "https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png"} 
        alt="User Avatar"
        className="w-16 h-16 rounded-full border-2 border-[#003366] mr-4"
      />
      Applicant Information
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
      <div>
        <strong>Name:</strong> {userDetails.firstname} {userDetails.lastname}
      </div>
      <div>
        <strong>Email:</strong> {userDetails.email}
      </div>
      <div>
        <strong>Phone:</strong> {userDetails.phonenumber}
      </div>
      <div>
        <strong>Country of Residence:</strong> {userDetails.countryresidence}
      </div>
      <div>
        <strong>Destination:</strong> {userDetails.destination}
      </div>
      <div>
        <strong>Visa Type Applied:</strong> {userDetails.visaType}
      </div>
    </div>
  </div>
)}


        <div className="relative h-96 overflow-hidden">
          <img
            src="https://www.daslegal.co.in/wp-content/uploads/2024/06/Immigration-Law.jpg"
            alt="Immigration process"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-[#003366] to-transparent opacity-90"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Visa Application Portal
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mb-8">
              Track and manage your immigration documents in one secure place
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 -mt-16 relative z-20">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#003366]"></div>
            </div>
          ) : documents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center border-l-4 border-[#003366]">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <img
                      src="https://cdn-icons-png.freepik.com/256/13558/13558989.png?semt=ais_hybrid"
                      alt="Documents"
                      className="h-10 w-10"
                    />
                  </div>
                  <div>
                    <p className="text-gray-500">Total Documents</p>
                    <p className="text-2xl font-bold">
                      {documents.reduce(
                        (acc, doc) => acc + Object.keys(doc.documents).length,
                        0
                      )}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex items-center border-l-4 border-green-500">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <img
                      src="https://as2.ftcdn.net/jpg/03/48/04/77/1000_F_348047725_X0OwiDMfsXT4K0LacMWhn3IlCg0pzR4N.jpg"
                      alt="Visa Type"
                      className="h-10 w-10"
                    />
                  </div>
                  <div>
                    <p className="text-gray-500">Visa Type</p>
                    <p className="text-2xl font-bold capitalize">
                      {documents[0]?.visaType || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex items-center border-l-4 border-purple-500">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <img
                      src="https://5.imimg.com/data5/SELLER/Default/2023/9/347377774/CL/HK/FZ/11361687/visa-stamp-service.jpg"
                      alt="Status"
                      className="h-10 w-10"
                    />
                  </div>
                  <div>
                    <p className="text-gray-500">Application Status</p>
                    <p className="text-2xl font-bold text-purple-600">In Review</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                    {['all', 'tourist', 'study', 'work','permanent'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setActiveTab(type)}
                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer ${
                          activeTab === type
                            ? 'border-[#B52721] text-[#B52721]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {type === 'all'
                          ? 'All Documents'
                          : `${type.charAt(0).toUpperCase() + type.slice(1)} Visa`}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {filteredDocuments.map((doc, idx) => (
                    <div key={idx} className="mb-12 last:mb-0">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-[#003366]">
                          {doc.visaType} Visa Documents
                        </h3>
                        <span className="bg-blue-100 text-[#003366] px-3 py-1 rounded-full text-sm font-medium">
                          Applicant: {doc.user ? `${doc.user.firstname} ${doc.user.lastname}` : 'N/A'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(doc.documents).map(([docName, filename], i) => (
                          <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="p-5 bg-gray-50 border-b">
                              <h4 className="font-semibold text-lg capitalize">
                                {docName.replace(/([A-Z])/g, ' $1').trim()}
                              </h4>
                            </div>
                            <div className="p-5">
                              <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-gray-500 truncate">
                                  {filename}
                                </span>
                                <a
                                  href={`${baseUrl}${filename}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B52721] hover:text-red-600 text-sm font-medium"
                                  download
                                >
                                  Download
                                </a>
                              </div>

                              <div className="h-40 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                                {filename.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                  <img
                                    src={`${baseUrl}${filename}`}
                                    alt={docName}
                                    className="object-cover h-full w-full"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18c5b7e6e7b%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18c5b7e6e7b%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%22104.5%22%3EImage%20Preview%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
                                    }}
                                  />
                                ) : (
                                  <div className="text-center p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <p className="mt-2 text-sm text-gray-500">Document Preview</p>
                                    <p className="text-xs text-gray-400 mt-1">{filename.split('.').pop().toUpperCase()} File</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No documents found</h3>
              <p className="mt-2 text-gray-500">
                {userId
                  ? "We couldn't find any documents for your account."
                  : "Please login to view your documents."}
              </p>
            </div>
          )}
          
        </div>
        <div className='w-full flex justify-center items-center'>
        <button
              className="px-6 py-4 bg-[#003366] text-white rounded-md hover:bg-[#B52721] transition-all cursor-pointer " 
              >
                <Link to={'/payment'}>Proceed</Link>

            </button>
              </div>
        
        <Footer />
      </div>
    </>
  );
}

export default Profile;
