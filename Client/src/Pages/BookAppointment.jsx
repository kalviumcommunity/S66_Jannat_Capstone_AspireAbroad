import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiGlobe, FiCalendar, FiUser, FiMail, FiPhone, FiUpload } from 'react-icons/fi';
import axios from 'axios';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

const destinationImages = [
  {
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    country: 'Canada',
    caption: 'Start your Canadian dream'
  },
  {
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
    country: 'United States',
    caption: 'Land of opportunities'
  },
  {
    url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    country: 'Australia',
    caption: 'Your new adventure awaits'
  },
  {
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    country: 'United Kingdom',
    caption: 'World-class education and opportunities'
  }
];

const BookAppointment = () => {
  const token = localStorage.getItem('Token');
  const userId = localStorage.getItem('userID');
  const Navigate=useNavigate()
  const [currentStep, setCurrentStep] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    service: '',
    country: '',
    date: new Date(),
    time: '',
    consultationMode: 'In Person meeting',
    notes: ''
  });
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:0710/appointment/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.appointments.length > 0) {
        const userData = response.data.appointments[0].user;
        setUser({
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          phonenumber: userData.phonenumber
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user data');
      console.error('Error fetching user:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token, userId]);

  // Rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % destinationImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        'http://localhost:0710/appointment',
        {
          service: formData.service,
          country: formData.country,
          date: formData.date,
          time: formData.time,
          consultationMode: formData.consultationMode,
          notes: formData.notes
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        toast.success('Appointment confirmed! We\'ll be in touch soon.');
        setInterval(()=>{
          Navigate('/dashboard')
        },[2000])
        setFormData({
          service: '',
          country: '',
          date: new Date(),
          time: '',
          consultationMode: 'In Person meeting',
          notes: ''
        });
        setCurrentStep(1);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
      toast.error('Failed to book appointment')
      console.error('Error submitting appointment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && currentStep === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <h3 className="text-lg font-medium text-red-800">Error</h3>
          <p className="text-red-600 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <MainNav/>

    <div className="min-h-screen flex mt-20">
      <div className="w-full md:w-1/2 bg-gradient-to-b p-8 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Begin Your <span className="text-[#B52721]">Global Journey</span>
            </h2>
            <p className="text-gray-600">Book a consultation with our visa experts</p>
          </div>

          <div className="flex mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex-1 flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${currentStep >= step ? 'bg-[#003366] text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${currentStep > step ? 'bg-[#003366]' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>

          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiGlobe className="mr-2 text-[#003366]" /> What service do you need?
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  >
                  <option value="">Select service</option>
                  <option value="Visa Application">Visa Application</option>
                  <option value="Permanent Residency">Permanent Residency</option>
                  <option value="Citizenship">Citizenship</option>
                  <option value="Document Review">Document Review</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiGlobe className="mr-2 text-[#003366]" /> Destination Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  >
                  <option value="">Select country</option>
                  <option value="Canada">Canada</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <button
                onClick={nextStep}
                disabled={!formData.service || !formData.country}
                className={`w-full py-3 px-4 rounded-lg transition ${!formData.service || !formData.country ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#003366] hover:bg-blue-700 text-white'}`}
                >
                Continue
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiCalendar className="mr-2 text-[#003366]" /> Select Date
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  >
                  <option value="">Select time</option>
                  <option value="Morning">Morning (9AM-12PM)</option>
                  <option value="Afternoon">Afternoon (1PM-5PM)</option>
                  <option value="Evening">Evening (6PM-8PM)</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg transition cursor-pointer"
                  >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!formData.date || !formData.time}
                  className={`flex-1 py-3 px-4 rounded-lg transition cursor-pointer ${!formData.date || !formData.time ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#003366] hover:bg-blue-700 text-white cursor-pointer'}`}
                  >
                  Continue
                </button>
              </div>
            </div>
          )}


          {currentStep === 3 && (
            <div className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Consultation Mode
                </label>
                <select
                  name="consultationMode"
                  value={formData.consultationMode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  >
                  <option value="In Person meeting">In Person meeting</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                  <option value="Live Chats Session">Live Chats Session</option>
                </select>
              </div>

        
              <div className="space-y-2 text-gray-700 bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-semibold text-gray-800">Your Information</h4>
                <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phonenumber}</p>
              </div>

      
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiUpload className="mr-2 text-[#003366]" /> Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Tell us about your case..."
                  ></textarea>
              </div>

 
              <div className="text-sm text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-medium mb-2">Appointment Summary:</h4>
                <ul className="list-disc ml-5 space-y-1">
                  <li><strong>Service:</strong> {formData.service || 'Not selected'}</li>
                  <li><strong>Country:</strong> {formData.country || 'Not selected'}</li>
                  <li><strong>Date:</strong> {formData.date?.toDateString() || 'Not selected'}</li>
                  <li><strong>Time:</strong> {formData.time || 'Not selected'}</li>
                  <li><strong>Mode:</strong> {formData.consultationMode || 'Not selected'}</li>
                </ul>
              </div>

    
              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg transition cursor-pointer"
                  >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 bg-[#003366] hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition cursor-pointer"
                  >
                  Continue
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Confirm Your Booking</h2>

              <div className="bg-gray-50 p-4 rounded-lg border text-sm text-gray-700 space-y-2">
              <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phonenumber}</p>
                <p><strong>Service:</strong> {formData.service}</p>
                <p><strong>Country:</strong> {formData.country}</p>
                <p><strong>Date:</strong> {formData.date.toDateString()}</p>
                <p><strong>Time:</strong> {formData.time}</p>
                <p><strong>Consultation Mode:</strong> {formData.consultationMode}</p>

                {formData.notes && (
                  <p><strong>Notes:</strong> {formData.notes}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg transition cursor-pointer"
                  >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`flex-1 py-3 px-4 cursor-pointer rounded-lg transition ${isLoading ? 'bg-[#B52721] cursor-not-allowed' : 'bg-[#B52721] hover:bg-red-600 text-white'}`}
                  >
                  {isLoading ? 'Booking...' : 'Confirm & Book'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>


      <div className="hidden md:block md:w-1/2 relative bg-gray-900">
        {destinationImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            >
            <img
              src={img.url}
              alt={img.country}
              className="w-full h-full object-cover"
              />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <p className="text-sm font-light mb-1">Dream Destination</p>
              <h3 className="text-3xl font-bold mb-2">{img.country}</h3>
              <p className="text-lg">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" style={{ top: '70px' }} autoClose={3000} />
    </div>
    <Footer/>
        </div>
    
  );
};

export default BookAppointment;