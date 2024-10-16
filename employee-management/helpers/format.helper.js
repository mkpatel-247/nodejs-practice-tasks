import moment from "moment";

/**
 * Helper to format date.
 */
export const formatDate = (date) => {
    return moment(date).format("DD-MMM-YY");
};

/**
 * Format index in list.
 */
export const formatIndex = (index) => {
    return index + 1;
};
