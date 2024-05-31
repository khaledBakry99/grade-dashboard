export const dateFormatter = (dateStr) => {
  const dateObj = new Date(dateStr ? dateStr : "");
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  return formattedDate;
};
