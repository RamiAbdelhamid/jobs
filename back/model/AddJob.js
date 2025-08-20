const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddJobSchema = new Schema({
    title: String,
    description: String,
    location: String,
    salary: Number,
    Number_of_working_days: Number,
    Number_of_working_hours: Number,
    Additional_benefits: String,
    Education_level: String,
    Experience_level: {
        type: mongoose.Schema.Types.Mixed, // يقبل أي نوع (نص أو رقم أو غيره)
      },
    language: String,
    driving_licence: String,
    vehicle_ownership: String,
    skills_required: String,
    Phone_number: Number,
    email: String,
    whatsapp_number: Number,
    status:{type:String,enum:['true','false'],default:'false'}, 
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},

});
module.exports = mongoose.model('AddJob', AddJobSchema);

