// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FaGlobe, FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaUpload, FaFileAlt } from "react-icons/fa";

// const BookAppointment = () => {
//   const [selectedService, setSelectedService] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [consultationMode, setConsultationMode] = useState("video");
//   const [startDate, setStartDate] = useState(new Date());
//   const [selectedTime, setSelectedTime] = useState("");
//   const [clientInfo, setClientInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     currentCountry: "",
//     visaStatus: "",
//     notes: "",
//   });
//   const [files, setFiles] = useState([]);

//   const services = [
//     "Visa Application",
//     "Permanent Residency",
//     "Citizenship",
//     "Document Review",
//     "Appeal/Rejection Help",
//   ];

//   const countries = ["USA", "UK", "Canada", "Australia", "Germany", "Other"];

//   const timeSlots = [
//     "9:00 AM",
//     "10:00 AM",
//     "11:00 AM",
//     "1:00 PM",
//     "2:00 PM",
//     "3:00 PM",
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Appointment booked! We'll contact you shortly.");
//   };

//   const handleFileUpload = (e) => {
//     setFiles([...e.target.files]);
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-50">
//       {/* Hero Section with Background Image */}
//       <div className="relative bg-blue-900 h-64 md:h-80 overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-70"
//         ></div>
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-80"></div>
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
//           <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             Start Your Visa Journey Today
//           </h1>
//           <p className="text-xl text-blue-100 max-w-2xl">
//             Book a consultation with our immigration experts and get personalized guidance.
//           </p>
//         </div>
//       </div>

//       {/* Booking Form Card */}
//       <div className="max-w-4xl mx-auto -mt-12 md:-mt-20 px-4 sm:px-6 lg:px-8 mb-12">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           {/* Form Header */}
//           <div className="bg-blue-600 px-6 py-4">
//             <h2 className="text-2xl font-bold text-white flex items-center">
//               <FaCalendarAlt className="mr-2" /> Book Your Consultation
//             </h2>
//           </div>

//           {/* Form Body */}
//           <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
//             {/* Service & Country Row */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                   <FaFileAlt className="mr-2 text-blue-600" /> Service Needed *
//                 </label>
//                 <select
//                   required
//                   value={selectedService}
//                   onChange={(e) => setSelectedService(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">Select a service</option>
//                   {services.map((service) => (
//                     <option key={service} value={service}>
//                       {service}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                   <FaGlobe className="mr-2 text-blue-600" /> Destination Country *
//                 </label>
//                 <select
//                   required
//                   value={selectedCountry}
//                   onChange={(e) => setSelectedCountry(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">Select a country</option>
//                   {countries.map((country) => (
//                     <option key={country} value={country}>
//                       {country}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Consultation Mode */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Consultation Mode *
//               </label>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 {[
//                   { mode: "video", label: "Video Call", icon: "🎥" },
//                   { mode: "phone", label: "Phone Call", icon: "📞" },
//                   { mode: "in-person", label: "In-Person", icon: "🏢" },
//                 ].map(({ mode, label, icon }) => (
//                   <label
//                     key={mode}
//                     className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
//                       consultationMode === mode
//                         ? "border-blue-500 bg-blue-50"
//                         : "border-gray-300 hover:border-blue-300"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="consultationMode"
//                       checked={consultationMode === mode}
//                       onChange={() => setConsultationMode(mode)}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 mr-2"
//                     />
//                     <span className="text-gray-700">
//                       {icon} {label}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Date & Time Picker */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Date *
//                 </label>
//                 <DatePicker
//                   selected={startDate}
//                   onChange={(date) => setStartDate(date)}
//                   minDate={new Date()}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Time *
//                 </label>
//                 <select
//                   required
//                   value={selectedTime}
//                   onChange={(e) => setSelectedTime(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Choose a time slot</option>
//                   {timeSlots.map((time) => (
//                     <option key={time} value={time}>
//                       {time}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Client Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium text-gray-800 flex items-center">
//                 <FaUser className="mr-2 text-blue-600" /> Your Information
//               </h3>
//               <input
//                 type="text"
//                 placeholder="Full Name *"
//                 required
//                 value={clientInfo.name}
//                 onChange={(e) =>
//                   setClientInfo({ ...clientInfo, name: e.target.value })
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                     <FaEnvelope className="mr-2 text-blue-600" /> Email *
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="your@email.com"
//                     required
//                     value={clientInfo.email}
//                     onChange={(e) =>
//                       setClientInfo({ ...clientInfo, email: e.target.value })
//                     }
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                     <FaPhone className="mr-2 text-blue-600" /> Phone *
//                   </label>
//                   <input
//                     type="tel"
//                     placeholder="+1 (123) 456-7890"
//                     required
//                     value={clientInfo.phone}
//                     onChange={(e) =>
//                       setClientInfo({ ...clientInfo, phone: e.target.value })
//                     }
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//               <textarea
//                 placeholder="Briefly describe your case (optional)"
//                 value={clientInfo.notes}
//                 onChange={(e) =>
//                   setClientInfo({ ...clientInfo, notes: e.target.value })
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 rows="3"
//               />
//             </div>

//             {/* Document Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 <FaUpload className="mr-2 text-blue-600" /> Upload Documents (Optional)
//               </label>
//               <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <FaFileAlt className="w-8 h-8 mb-3 text-gray-400" />
//                     <p className="mb-2 text-sm text-gray-500">
//                       <span className="font-semibold">Click to upload</span> or drag and drop
//                     </p>
//                     <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
//                   </div>
//                   <input
//                     type="file"
//                     multiple
//                     onChange={handleFileUpload}
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//               {files.length > 0 && (
//                 <p className="mt-2 text-sm text-gray-600">
//                   {files.length} file(s) selected
//                 </p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
//             >
//               Confirm Appointment
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookAppointment;




import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiGlobe, FiCalendar, FiUser, FiMail, FiPhone, FiUpload } from 'react-icons/fi';

// Destination gallery images
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
  const [currentStep, setCurrentStep] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    service: '',
    country: '',
    date: new Date(),
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Rotate images every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % destinationImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-50 to-white p-8 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Begin Your <span className="text-blue-600">Global Journey</span>
            </h1>
            <p className="text-gray-600">Book a consultation with our visa experts</p>
          </div>

          {/* Progress Steps */}
          <div className="flex mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiGlobe className="mr-2 text-blue-500" /> What service do you need?
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select service</option>
                  <option value="visa">Visa Application</option>
                  <option value="pr">Permanent Residency</option>
                  <option value="citizenship">Citizenship</option>
                  <option value="document">Document Review</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiGlobe className="mr-2 text-blue-500" /> Destination Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select country</option>
                  <option value="canada">Canada</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="australia">Australia</option>
                </select>
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiCalendar className="mr-2 text-blue-500" /> Select Date
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={(date) => setFormData({...formData, date})}
                  minDate={new Date()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (9AM-12PM)</option>
                  <option value="afternoon">Afternoon (1PM-5PM)</option>
                  <option value="evening">Evening (6PM-8PM)</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg transition"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Info */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiUser className="mr-2 text-blue-500" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FiMail className="mr-2 text-blue-500" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FiPhone className="mr-2 text-blue-500" /> Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (___) ___-____"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiUpload className="mr-2 text-blue-500" /> Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Tell us about your situation..."
                ></textarea>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Image Gallery */}
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
    </div>
  );
};

export default BookAppointment;