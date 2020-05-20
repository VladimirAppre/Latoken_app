const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	userName: { type: String, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
    createdAt: { type: Date, required: true },
});

// userSchema.statics.mostRecent = async function() {
//     return this.find().sort('createdAt').limit(5).exec();
// }



module.exports = mongoose.model('User', userSchema);
