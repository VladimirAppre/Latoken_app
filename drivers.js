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
  console.log('hello');
  const FrequencyPerWeek = await Person.aggregate(
    [{ $group: { _id: `$task`, count: { $sum: 1 } } }],
    function (err, results) {
      // Do something with the results
      console.log(results);
    }
  );
  // return dailyTasks;
}

//вывести людей которые работали больше 15 часов, или вывести, что таких нет
//нужно найти все задачи по одному email, сложить их Time performed и разделить на 60
//вернуть список email, если Time Perfomed > 15

// async function overfiveteen(data) {
//   const sumArray = await Person.find({ departament: data });
//   let newArr = [];
//   for (let i = 0; i < sumArray.length; i++) {
//     let email = sumArray[i].email;
//     let sumHours = 0;
//     for (let j = 0; j < sumArray.length; j++) {
//       if (email === sumArray[j].email) {
//         sumHours += sumArray[j].timePerfomed;
//       }
//        newArr.push({
//           email: email,
//           hours: sumHours,
//         });
//     }
//   }
//   return newArr;
// }

module.exports = {
  overdone,
  undone,
  //overfiveteen,
  dailydonetasks,
};
