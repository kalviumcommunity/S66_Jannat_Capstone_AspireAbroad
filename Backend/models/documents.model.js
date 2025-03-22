const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  visaType: { type: String, enum: ['Tourist', 'Work', 'Study', 'Permanent'], required: true },
  
  documents: {
    Passport: { type: String, required: true },
    ApplicationForm: { type: String, required: true },
    Photograph: { type: String, required: true },

    // Tourist visa fields
    FrequentTravelProof: { type: String, required: function() { return this.visaType === 'Tourist'; } },
    FinancialStabilityProof: { type: String, required: function() { return this.visaType === 'Tourist'; } },
    AccommodationTravelDetails: { type: String, required: function() { return this.visaType === 'Tourist'; } },
    PurposeOfVisitLetter: { type: String, required: function() { return this.visaType === 'Tourist'; } },
    
    // Work visa fields
    WorkExperience: { type: String, required: function() { return this.visaType === 'Work'; } },
    EducationExperience: { type: String, required: function() { return this.visaType === 'Work'; } },
    MedicalExam: { type: String, required: function() { return this.visaType === 'Work'; } },
    Skills: { type: String, required: function() { return this.visaType === 'Work'; } },
    EnglishTestScore: { type: String, required: function() { return this.visaType === 'Work'; } },
    GovernmentAgreement: { type: String, required: function() { return this.visaType === 'Work'; } },
    EmployerSponsorship: { type: String, required: function() { return this.visaType === 'Work'; } },
    ProofOfFunds: { type: String, required: function() { return this.visaType === 'Work'; } },
    RelationProof: { type: String, required: function() { return this.visaType === 'Work'; } },
    ExpressionOfInterest: { type: String, required: function() { return this.visaType === 'Work'; } },
    PointsTest: { type: String, required: function() { return this.visaType === 'Work'; } },
    
    // Study visa fields (Example: Add specific requirements here)
    admissionLetter: { type: String, required: function() { return this.visaType === 'Study'; } },
    tuitionFeeReceipt: { type: String, required: function() { return this.visaType === 'Study'; } },
    sop: { type: String, required: function() { return this.visaType === 'Study'; } },

    // // Permanent visa fields (Example: Add specific requirements here)
    residencyProof: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    backgroundCheck: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    EducationalDocuments: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    WorkExperience: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    LanguageTest: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    ProofOfFunds: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    MedicalExam: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    PoliceClearance: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    Marriage,FamilyProof: { type: String, required: function() { return this.visaType === 'Permanent'; } },
    ExpressionOfInterest: { type: String, required: function() { return this.visaType === 'Permanent'; } },
  }
});

module.exports = mongoose.model('document', documentSchema);
