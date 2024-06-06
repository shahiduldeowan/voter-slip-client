import moment from "moment";

const formatWithDayMonthTimeByDateString = (dateTime) => {
  return moment(dateTime).format("DD MMM, hh:mm:ss A");
};

const formatWithTimeByDateString = (dateTime) => {
  return moment(dateTime).format("hh:mm:ss A");
};

export { formatWithDayMonthTimeByDateString, formatWithTimeByDateString };
