import { useState } from 'react';
import MainNav from '../components/MainNav';
import globe from '../assets/Globe.webp'

const examData = {
  IELTS: {
    description:
      'IELTS (International English Language Testing System) measures your English proficiency for study, migration, or work. It includes Listening, Reading, Writing, and Speaking modules.',
    tips: [
      'Familiarize yourself with the test format.',
      'Practice listening to various English accents.',
      'Time yourself while doing reading and writing tasks.',
      'Record and analyze your speaking responses.',
    ],
    resources: [
      { name: 'IELTS Official', url: 'https://www.ielts.org' },
      { name: 'IELTS Liz', url: 'https://ieltsliz.com' },
      { name: 'Cambridge Practice Tests', url: 'https://www.cambridgeenglish.org' },
    ],
  },
  PTE: {
    description:
      'PTE (Pearson Test of English) Academic assesses your English skills for studying abroad or immigration. It is computer-based and includes speaking, writing, reading, and listening.',
    tips: [
      'Use a good headset while practicing speaking.',
      'Work on typing speed for written sections.',
      'Understand how PTE AI scoring works.',
      'Practice with full-length mock tests.',
    ],
    resources: [
      { name: 'PTE Official', url: 'https://www.pearsonpte.com' },
      { name: 'E2 PTE', url: 'https://www.e2language.com' },
      { name: 'PTE Tutorials', url: 'https://ptetutorials.com' },
    ],
  },
  TOEFL: {
    description:
      'TOEFL (Test of English as a Foreign Language) is widely accepted for university admissions. It evaluates reading, listening, speaking, and writing skills.',
    tips: [
      'Read academic articles to prepare for reading passages.',
      'Take notes while listening.',
      'Practice writing essays within 30 minutes.',
      'Use online tools to simulate the test environment.',
    ],
    resources: [
      { name: 'TOEFL Official', url: 'https://www.ets.org/toefl' },
      { name: 'Notefull TOEFL', url: 'https://www.notefull.com' },
      { name: 'Magoosh TOEFL Blog', url: 'https://magoosh.com/toefl' },
    ],
  },
};

const ExamPreparation = () => {
  const [activeExam, setActiveExam] = useState('IELTS');

  const current = examData[activeExam];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${globe})`, backgroundPosition: '50% 9%' }}
        ></div>
        <div className='relative z-10'><MainNav/>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10 mt-25">
        <h2 className="text-3xl font-bold text-center text-[#003366] mb-8">
          Comprehensive Training for IELTS, PTE & TOEFL – Unlock Your Global Potential
        </h2>

        <div className="flex justify-center gap-4 mb-8">
          {Object.keys(examData).map((exam) => (
              <button
              key={exam}
              onClick={() => {
                  setActiveExam(exam);
                }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
                    activeExam === exam
                    ? 'bg-[#B52721] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    >
              {exam}
            </button>
          ))}
        </div>

    
          <>
            <p className="text-lg text-gray-700 mb-6">{current.description}</p>

            <div>
              <h2 className="text-xl font-semibold text-[#003366] mb-2">Tips for Preparation</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                {current.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#003366] mb-2">Useful Resources</h2>
              <ul className="space-y-2">
                {current.resources.map((res, idx) => (
                    <li key={idx}>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                      >
                      {res.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => alert("We will make it later")}
                className="bg-[#003366] text-white px-6 py-3 rounded-lg hover:bg-[#B52721] transition cursor-pointer"
                >
                Start Practice Now
              </button>
            </div>
          </>
       
      </div>
                  </div>
    </div>
  );
};

export default ExamPreparation;
