const fs = require("fs");
const mongoose = require("mongoose");
const { Person } = require("../models/schemas");
// require("dotenv").config;

mongoose.connect(`mongodb+srv://mikhail:elbrus@cluster0-hjq5d.mongodb.net/test?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//mongodb://localhost:27017/latoken
// mongodb+srv://mikhail:${process.env.mikhail_password}@cluster0-hjq5d.mongodb.net/test?retryWrites=true&w=majority
async function parserData(path) {
  let file = fs.readFileSync(path, "utf8");
  function csvToArray(text) {
    let p = "",
      row = [""],
      ret = [row],
      i = 0,
      r = 0,
      s = !0,
      l;
    for (l of text) {
      if ('"' === l) {
        if (s && l === p) row[i] += l;
        s = !s;
      } else if ("," === l && s) l = row[++i] = "";
      else if ("\n" === l && s) {
        if ("\r" === p) row[i] = row[i].slice(0, -1);
        row = ret[++r] = [(l = "")];
        i = 0;
      } else row[i] += l;
      p = l;
    }
    return ret;
  }
  let clearFile = csvToArray(file);  //  let regexp = /(?:^"|,")(""|[\w\W]*?)(?=",|"$)|(?:^(?!")|,(?!"))([^,]*?)(?=$|,)|(\r\n|\n)/g;

  for (let i = 2; i < clearFile.length - 1; i++) {
    const dataPerson = clearFile[i];
    const email = dataPerson[3];

    if (typeof email === "string" && email.length > 3) {
      const person = new Person({
        departament: dataPerson[0],
        email: dataPerson[3],
        role: dataPerson[4],
        task: dataPerson[5],
        frequencyDoneYesterday: (!isNaN(dataPerson[6]))? +dataPerson[6] : dataPerson[6],
        frequencyPerWeekPlan: (!isNaN(dataPerson[7]))? +dataPerson[7] : dataPerson[7],
        timePerTaskMinutes: (!isNaN(dataPerson[8]))? +dataPerson[8] : dataPerson[8],
        timePerformed: (!isNaN(dataPerson[9]))? +dataPerson[9] : dataPerson[9],
        deviationInMinutes: +dataPerson[10],
        createdAt: Date.now(),
      });
      await person.save();
    }
  }
}

parserData("../csv/Test task 2 - Person performance.csv");

module.exports = {parserData};
