const mongoose = require('mongoose');

const VisaSchema = new mongoose.Schema({
  visaType:{type: String, required:true},
  visaCategory: { type: String, required: true },
  stay: { type: String, required: true },
  cost: { type: String, required: true },
  about: { type: String, required: true },
  eligibility: { type: [String], required: true },
});


const countries = ['Australia', 'Canada', 'UK', 'USA'];
const models = countries.reduce((acc, country) => {
  acc[`Visa${country}`] = mongoose.model(`Visa${country}`, VisaSchema, country.toLowerCase());
  return acc;
}, {});

module.exports = models;
