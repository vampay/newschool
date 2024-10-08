const mongoose = require('mongoose');

const participateSchema = new mongoose.Schema({

    name: { type: String, required: true },
    surname: { type: String, required: true },
    major: { type: String, required: true },
    Boarding_point: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
}, 
{ timestamps: true, versionKey: false });




const Participate = mongoose.model('Participate', participateSchema);
module.exports = Participate;
