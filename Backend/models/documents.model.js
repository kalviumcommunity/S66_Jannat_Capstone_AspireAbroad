const mongoose = require('mongoose');

// Helper function to check if the field should be required based on visa types
const isRequiredForVisaTypes = (visaTypes) => {
  return function() {
    return visaTypes.includes(this.visaType);
  };
};

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  visaType: { type: String, enum: ['Tourist', 'Work', 'Study', 'Permanent'], required: true },
  
  documents: {
    Passport: { type: String, required: true },
    ApplicationForm: { type: String, required: true },
    Photograph: { type: String, required: true },

    
    FrequentTravelProof: { type: String, required: function() { return this.visaType === 'Tourist'; } },
    FinancialStabilityProof: { type: String, required: function() { return this.visaType === 'Tourist'; } },
    AccommodationTravelDetails: { type: String, required: function() { return this.visaType === 'Tourist'; } },
    PurposeOfVisitLetter: { type: String, required: function() { return this.visaType === 'Tourist'; } },
    
    
    WorkExperience: { type: String, required: isRequiredForVisaTypes('Work') },
    EducationExperience: { type: String, required: function() { return this.visaType === 'Work'; } },
    MedicalExam: { type: String, required: isRequiredForVisaTypes('Work') },
    Skills: { type: String, required: function() { return this.visaType === 'Work'; } },
    EnglishTestScore: { type: String, required: function() { return this.visaType === 'Work'; } },
    GovernmentAgreement: { type: String, required: function() { return this.visaType === 'Work'; } },
    EmployerSponsorship: { type: String, required: function() { return this.visaType === 'Work'; } },
    ProofOfFunds: { type: String, required: isRequiredForVisaTypes(['Work', 'Permanent']) },
    RelationProof: { type: String, required: function() { return this.visaType === 'Work'; } },
    ExpressionOfInterest: { type: String, required: isRequiredForVisaTypes(['Work', 'Permanent']) },
    PointsTest: { type: String, required: function() { return this.visaType === 'Work'; } },
    
    
    AdmissionLetter: { type: String, required: function() { return this.visaType === 'Study'; } },
    TuitionFeeReceipt: { type: String, required: function() { return this.visaType === 'Study'; } },
    Sop: { type: String, required: function() { return this.visaType === 'Study'; } },

    
    ResidencyProof: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    BackgroundCheck: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    EducationalDocuments: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    LanguageTest: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    PoliceClearance: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    MarriageFamilyProof: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    ExpressionOfInterest: { type: String, required: function() { return this.visaType === 'Permanent'; } },
  }
});

module.exports = mongoose.model('document', documentSchema);

