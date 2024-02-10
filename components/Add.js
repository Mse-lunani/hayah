import React from "react";

const AddDaysToDate = (date, daysToAdd) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + daysToAdd);
  return newDate;
};

export default AddDaysToDate;
