import moment from "moment";

/**
 * Helper to format date.
 */
export const formatDate = (date) => {
    return moment(date).format("DD-MMM-YY");
};
