import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const CountryFAQSection = () => {
  const countryFAQs = [
    {
      country: 'Canada',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      questions: [
        {
          q: "What are the processing times for Canadian visas?",
          a: "Visitor visas typically take 14-30 days, while work permits can take 8-12 weeks."
        },
        {
          q: "Do I need IELTS for Canada immigration?",
          a: "Yes, language testing is required for most permanent residence programs."
        },
        {
          q: "What is the Express Entry system?",
          a: "Canada's points-based system for skilled worker immigration."
        }
      ]
    },
    {
      country: 'United Kingdom',
      image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      questions: [
        {
          q: "What's the UK visa fee structure?",
          a: "Visitor visas start at £100, work visas at £625, and student visas at £363."
        },
        {
          q: "Can I switch visas within the UK?",
          a: "Some visas allow switching, but visitor visas typically don't permit this."
        },
        {
          q: "What is the Health Surcharge?",
          a: "£624/year fee granting access to NHS services during your stay."
        }
      ]
    },
    {
      country: 'Australia',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      questions: [
        {
          q: "How does Australia's points system work?",
          a: "Points are awarded for age, skills, English ability, and work experience."
        },
        {
          q: "What are the regional visa options?",
          a: "Special visas available for living/working outside major cities."
        },
        {
          q: "Is health insurance mandatory?",
          a: "Yes, all visa holders must maintain adequate health coverage."
        }
      ]
    },
    {
      country: 'United States',
      image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      questions: [
        {
          q: "What's the difference between H1B and L1 visas?",
          a: "H1B is for specialty occupations, L1 is for intracompany transfers."
        },
        {
          q: "How does the Green Card lottery work?",
          a: "Annual diversity visa program with 55,000 random selections."
        },
        {
          q: "What is ESTA authorization?",
          a: "Electronic system for visa-free travel from certain countries."
        }
      ]
    }
  ];

  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (countryIndex, qIndex) => {
    setExpandedItems(prev => ({
      ...prev,
      [`${countryIndex}-${qIndex}`]: !prev[`${countryIndex}-${qIndex}`]
    }));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-3">Country-Specific Visa FAQs</h2>
          <p className="text-xl text-gray-600">Essential information for your destination country</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {countryFAQs.map((country, countryIndex) => (
            <div 
              key={countryIndex} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={country.image} 
                  alt={country.country} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">{country.country}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {country.questions.map((question, qIndex) => (
                    <div key={qIndex} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <button
                        onClick={() => toggleItem(countryIndex, qIndex)}
                        className="w-full flex justify-between items-start text-left gap-3"
                      >
                        <span className="font-medium text-gray-800 flex-1">
                          {question.q}
                        </span>
                        <FiChevronDown 
                          className={`flex-shrink-0 text-gray-400 transition-transform ${
                            expandedItems[`${countryIndex}-${qIndex}`] ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      {expandedItems[`${countryIndex}-${qIndex}`] && (
                        <p className="mt-2 text-gray-600 pl-1">
                          {question.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryFAQSection;