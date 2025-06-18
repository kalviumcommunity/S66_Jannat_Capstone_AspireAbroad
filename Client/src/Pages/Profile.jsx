import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import MainNav from '../components/MainNav';
import { Link } from 'react-router-dom';
import globe from '../assets/Globe.webp';

function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [editing, setEditing] = useState({}); 

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
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
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

 
  const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  const filteredDocuments =
  activeTab === 'all'
    ? documents
    : documents.filter((doc) =>
        doc.visaType.toLowerCase().includes(activeTab)
      );



  const handleFileChange = async (e, docId, docName) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditing((prev) => ({
        ...prev,
        [docId]: {
          ...(prev[docId] || {}),
          [docName]: reader.result,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async (docId, docName) => {
    const token = localStorage.getItem('Token');
    const base64 = editing[docId]?.[docName];
    if (!base64) return alert('Please select a file.');

    try {
      const res = await fetch(`https://jannat-aspireabroad.onrender.com/update-documents/${docId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          files: {
            [docName]: base64,
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Document updated successfully');
        fetchDocuments(userId); 
        setEditing((prev) => ({ ...prev, [docId]: { ...prev[docId], [docName]: null } }));
      } else {
        alert(data?.error || 'Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Error updating document');
    }
  };

  return (
    <>
      <div className='relative min-h-screen '>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
          style={{ backgroundImage: `url(${globe})`, backgroundPosition: '50% 9%' }}
        ></div>

        <div className='relative z-10'>
          <MainNav />

          <div className="w-full p-8 text-[#003366] font-sans min-h-screen mt-20">
   
            {userDetails && (
              <section className="w-full mx-auto bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 p-10 border-2 border-[#B52721] mb-10">
                <div className="flex-shrink-0">
                  <img
                    src={
                      userDetails.avatar ||
                      'https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png'
                    }
                    alt="User Avatar"
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#B52721] object-cover shadow-md"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
                    {userDetails.firstname} {userDetails.lastname}
                  </h2>
                  <ul className="space-y-3 text-lg">
                    <li><span className="font-semibold">Email:</span> {userDetails.email}</li>
                    <li><span className="font-semibold">Phone:</span> {userDetails.phonenumber}</li>
                    <li><span className="font-semibold">Country of Residence:</span> {userDetails.countryresidence}</li>
                    <li><span className="font-semibold">Destination:</span> {userDetails.destination}</li>
                    <li><span className="font-semibold">Visa Type Applied:</span> {userDetails.visaType}</li>
                  </ul>
                </div>
              </section>
            )}

            {/* DOCUMENT STATS */}
            <section className="mb-10">
              <h2 className="text-4xl font-bold mb-3">Visa Application Portal</h2>
              <p className="text-gray-700 text-lg max-w-3xl">
                Track and manage your immigration documents in one secure place
              </p>
            </section>

            {/* FILTER TABS */}
            {loading ? (
              <p className="text-center text-lg">Loading documents...</p>
            ) : documents.length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-8 mb-10 text-center">
                  <div className="bg-[#B52721] text-white rounded-lg p-6 shadow-md">
                    <p className="uppercase tracking-wider font-semibold mb-2">Total Documents</p>
                    <p className="text-3xl font-bold">
                      {documents.reduce(
                        (acc, doc) => acc + Object.keys(doc.documents).length,
                        0
                      )}
                    </p>
                  </div>
                  <div className="bg-[#003366] text-white rounded-lg p-6 shadow-md">
                    <p className="uppercase tracking-wider font-semibold mb-2">Visa Type</p>
                    <p className="text-3xl font-bold">{documents[0]?.visaType || 'N/A'}</p>
                  </div>
                  <div className="bg-[#B52721] text-white rounded-lg p-6 shadow-md">
                    <p className="uppercase tracking-wider font-semibold mb-2">Application Status</p>
                    <p className="text-3xl font-bold">In Review</p>
                  </div>
                </div>


                {/* DOCUMENT LIST */}
                <div className="space-y-12">
                  {filteredDocuments.map((doc) => (
                    <div key={doc._id} className="border-2 border-[#B52721] rounded-lg p-8 bg-white shadow-lg">
                      <h3 className="text-2xl font-bold text-[#B52721] mb-4">{doc.visaType} Visa Documents</h3>

                      <div className="flex flex-wrap gap-8">
                        {Object.entries(doc.documents).map(([docName, fileUrl], i) => {
                          const fakeDate = new Date();
                          fakeDate.setDate(fakeDate.getDate() - i);
                          const formattedDate = fakeDate.toLocaleDateString();

                          return (
                            <div key={i} className="w-[320px] flex flex-col items-center">
                              <p className="font-semibold text-[#003366] text-lg mb-1 text-center">
                                {docName.replace(/([A-Z])/g, ' $1').trim()}
                              </p>
                              <p className="text-sm text-gray-600 mb-2 text-center">
                                Uploaded: {formattedDate}
                              </p>

                              {isImage(fileUrl) ? (
                                <img
                                  src={fileUrl}
                                  alt={docName}
                                  className="w-[300px] h-[240px] object-cover rounded-md border border-gray-300"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/300x240?text=No+Preview';
                                  }}
                                />
                              ) : (
                                <div className="text-gray-500 italic text-center text-lg p-8 border rounded-md w-[300px] h-[240px] flex items-center justify-center">
                                  <p>Preview Not Available</p>
                                </div>
                              )}

                              {/* Edit Button + File Input */}
                              <div className="mt-3 flex flex-col items-center gap-2">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileChange(e, doc._id, docName)}
                                  className="text-sm"
                                />
                                <button
                                  onClick={() => handleUpdate(doc._id, docName)}
                                  className="bg-[#003366] text-white px-4 py-1 rounded hover:bg-[#B52721]"
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-700 text-xl">
                <p>No documents found.</p>
                <p>{userId ? "We couldn't find any documents for your account." : 'Please login to view your documents.'}</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                to={'/payment'}
                className="inline-block bg-[#003366] text-white font-bold px-10 py-4 rounded-md text-lg hover:bg-[#B52721] transition"
              >
                Proceed
              </Link>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default Profile;
