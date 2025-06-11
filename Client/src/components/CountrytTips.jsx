import { useState } from 'react';
const accommodationsData = [/* ...your data... */];

// Tips data for each country
const countryTips = {
  Canada: [
    'Look for student housing near universities',
    'Winter heating costs can be significant',
    'Many apartments include utilities',
    'Consider suburbs for better prices',
  ],
  Australia: [
    'Shared housing is common in cities',
    'Check for "bills included" options',
    'Beach suburbs often have good transport',
    'Leases typically 6–12 months',
  ],
  UK: [
    'London is significantly more expensive',
    'Look for council tax band information',
    'Houseshare is very common',
    'Check transport links carefully',
  ],
  USA: [
    'Prices vary dramatically by neighborhood',
    'Many require credit checks',
    'Utilities often not included',
    'Short‑term leases available in many cities',
  ],
};

const Tips = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  


  // Determine tips to show:
  const tipsToDisplay = country
    ? { [country]: countryTips[country] }
    : countryTips;

  return (
    <div className=" bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ...your search form & results as before... */}
        {/* ====== Accommodation Tips Section ====== */}
        <div>
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(tipsToDisplay).map(([ctry, tips]) => (
              <div
                key={ctry}
                className="p-4 border border-gray-300 rounded-lg bg-white"
              >
                <h3 className="font-semibold text-lg mb-3">{ctry} Housing</h3>
                <ul className="space-y-2">
                  {tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
