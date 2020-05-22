const { Person } = require('./dataBase/models/schemas');

//Топ 5 выполненных
async function overdone(data) {
  const overdone = await Person.find({ departament: data })
    .sort({ deviationInMinutes: -1 })
    .limit(5)
    .skip(0);

  return overdone;
}
//Топ 5 невыполненных
async function undone(data) {
  const undone = await Person.find({ departament: data })
    .sort({ deviationInMinutes: 1 })
    .limit(5)
    .skip(0);
  return undone;
}
//сколько ежедненвых задач (>4 в неделю) выполнено, сколько дб выполнено
//если (Frequency per week - plan / 5 > 4 ) = задача ежедневная
//если (Time performed > Frequency per week) задача пере-выполнена за 1 день, вместо недели

async function dailydonetasks(data) {
  //console.log('hello');
  const FrequencyPerWeek = await Person.aggregate(
    [{ $group: { _id: `$task`, count: { $sum: 1 } } }],
    function (err, results) {
      // Do something with the results
      // console.log(results);
    }
  );
  // return dailyTasks;
}

//вывести людей которые работали больше 15 часов, или вывести, что таких нет
//нужно найти все задачи по одному email, сложить их Time performed и разделить на 60
//вернуть список email, если Time Perfomed > 15

async function overfiveteen(data) {
  let objArray = await Person.find({ departament: data });
  let newArray = [];
  let keyValue = {};
  for (let counter = 0; counter < objArray.length; counter++) {
    let obj = objArray[counter];
    if (!keyValue[obj.email]) {
      keyValue[obj.email] = 0;
    }
    keyValue[obj.email] += obj.timePerfomed;
  }
  for (let key in keyValue) {
    newArray.push({ email: key, timePerfomed: keyValue[key] });
  }
  return newArray;
}

module.exports = {
  overdone,
  undone,
  overfiveteen,
  //dailydonetasks,
};
