import moment from "moment";

const formatWithDayMonthTimeByDateString = (dateString) => {
    return moment(dateString).format("DD MMM, hh:mm:ss A")
};

export { formatWithDayMonthTimeByDateString };

