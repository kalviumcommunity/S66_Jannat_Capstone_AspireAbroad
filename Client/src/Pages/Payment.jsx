import React, { useState, useEffect } from 'react';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import globe from '../assets/Globe.webp';

const VisaPayment = () => {
  const [approvalUrl, setApprovalUrl] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const startPayment = async () => {
    try {
      const response = await fetch('http://localhost:0710/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setApprovalUrl(data.approvalUrl);
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  const redirectToPayPal = () => {
    if (approvalUrl) {
      window.location.href = approvalUrl;
    }
  };

  return (
    <div className="relative min-h-screen">

      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${globe})`, backgroundPosition: 'center center' }}
      ></div>


      <div className="relative z-10">
        <MainNav />

        <div className="min-h-screen flex items-center justify-center p-4 mt-10">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-[#003366] text-white p-5 text-center">
              <h2 className="text-2xl font-bold">Visa Application Payment</h2>
              <p className="text-blue-100 mt-1">Secure Payment Portal</p>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Application Fee</h3>
                <p className="text-3xl font-bold text-[#B52721] mt-2">INR 10,000</p>
                <p className="text-gray-600 mt-3">
                  Complete your visa application by making the payment through our secure gateway.
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Service:</span>
                  <span className="font-medium">Standard Visa Processing</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-700">Payment Method:</span>
                  <span className="font-medium">PayPal</span>
                </div>
              </div>

              {/* Button */}
              {!approvalUrl ? (
                <button
                  onClick={startPayment}
                  className="w-full bg-[#003366] hover:bg-blue-800 text-white py-3 px-4 rounded font-semibold transition duration-200"
                >
                  Start Payment Process
                </button>
              ) : (
                <button
                  onClick={redirectToPayPal}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded font-semibold transition duration-200"
                >
                  Complete Payment on PayPal
                </button>
              )}

              {/* Secure Info */}
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>This is a secure payment processed by PayPal. Your information is protected.</p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="bg-gray-100 px-6 py-3 text-center text-xs text-gray-600">
              <p>Immigration Services Department • Official Government Portal</p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default VisaPayment;
