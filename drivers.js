const {Person, User} = require('./dataBase/models/schemas');
function overdone(data) {
  Person.find(
    { deportament: data },
    [
      'task',
      'frequencyDoneYesterday',
      'frequencyPerWeekPlan',
      'timePerTaskMinutes',
    ], // какие колонки вернуть
    {
      skip: 0,
      limit: 5, // топ 5 задач
      sort: {
        deviationInMinutes: 1, // сортируем от большего к меньшему
      },
    }
  );
}

function undone(data) {
  Person.find(
    { deportament: data },
    [
      'task',
      'frequencyDoneYesterday',
      'frequencyPerWeekPlan',
      'timePerTaskMinutes',
    ], // какие колонки вернуть
    {
      skip: 0,
      limit: 5, // топ 5 задач
      sort: {
        deviationInMinutes: -1, // сортируем от меньшего к большему
      },
    }
  );
}

module.exports = { overdone, undone };
