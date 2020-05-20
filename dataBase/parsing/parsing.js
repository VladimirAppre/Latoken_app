const fs = require('fs');
const mongoose = require("mongoose");
const { Person } = require('../models/schemas');

mongoose.connect(
  'mongodb://localhost:27017/latoken',
  {
    useNewUrlParser: true, useUnifiedTopology: true
  });

async function parserData(path){
  let file = fs.readFileSync(path, 'utf8')
  function csvToArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;    
    }
    return ret;
  };
  let clearFile = csvToArray(file)

  //  let regexp = /(?:^"|,")(""|[\w\W]*?)(?=",|"$)|(?:^(?!")|,(?!"))([^,]*?)(?=$|,)|(\r\n|\n)/g;

  for (let i = 1; i < clearFile.length - 1; i++) {
     const dataPerson =  clearFile[i]
    const email = dataPerson[3];
    
    if(typeof email === 'string') {
      const person = new Person({
        departament: dataPerson[0],
        email: dataPerson[3],
        role: dataPerson[4],
        task: dataPerson[5],
        frequencyDoneYesterday: dataPerson[6],
        frequencyPerWeekPlan: dataPerson[7],
        timePerTaskMinutes: dataPerson[8],
        timePerformed: dataPerson[9],
        deviationInMinutes: dataPerson[10],
        createdAt: Date.now(),
      })      
      await person.save()
    }
  }
}

parserData('../csv/Test task 2 - Person performance.csv');



