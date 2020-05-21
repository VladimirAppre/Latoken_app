const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new mongoose.Schema({
  departament: Schema.Types.Mixed,
  email: { type: String },
  role: { type: String },
  task: { type: String },
  frequencyDoneYesterday: Schema.Types.Mixed,
  frequencyPerWeekPlan: Schema.Types.Mixed,
  timePerTaskMinutes: Schema.Types.Mixed,
  timePerformed: Schema.Types.Mixed,
  deviationInMinutes: Number,
  createdAt: { type: Date },
});
const Person = mongoose.model("Person", personSchema);

const userSchema = new mongoose.Schema({
  nick: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// userSchema.statics.mostRecent = async function() {
//     return this.find().sort('createdAt').limit(5).exec();
// }

// userSchema.statics.mostRecent = async function() {
//     return this.find().sort('createdAt').limit(5).exec();
// }

module.exports = { Person, User };
