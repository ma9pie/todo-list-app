import moment from "moment";

export const formatDate = (date?: string) => {
  if (!date) return "-";
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};
