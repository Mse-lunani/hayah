import Vaccines from "../vaccine.json";
import AddDaysToDate from "./Add";

const GetSchedule = (due_date) => {
  let days = [];

  Vaccines.forEach((element2) => {
    element2.schedule.forEach((element) => {
      days.push(element.day);
    });
  });
  days = [...new Set(days)];
  let mainschedule = [];
  for (let index = 0; index < days.length; index++) {
    let day = days[index];
    let day2 = AddDaysToDate(due_date, day);

    let schedule = [];
    Vaccines.forEach((element2) => {
      element2.schedule.forEach((element) => {
        if (element.day === day) {
          let v = {
            vaccine: element2.name,
            dosage: element.dose,
          };
          schedule.push(v);
        }
      });
    });
    let v = {
      day: day2.toDateString(),
      vaccines: schedule,
    };
    mainschedule.push(v);
  }
  console.log(mainschedule[0]);
  return mainschedule;
};
export default GetSchedule;
