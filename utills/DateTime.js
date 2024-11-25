export const formatDateString = (inputDateString) => {
  const startDate = new Date(inputDateString);

  // Options for formatting
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  // Format the date to a string
  const formattedDate = startDate?.toLocaleString("en-US", options);

  return formattedDate;
};

export const formatDate = (inputDateString) => {
  const date = new Date(inputDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  // return
  let formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export function formatDateandTime(timestamp) {
  const createdAt = new Date(timestamp);

  const year = createdAt.getFullYear();
  const month = String(createdAt.getMonth() + 1).padStart(2, "0");
  const day = String(createdAt.getDate()).padStart(2, "0");
  const hours = String(createdAt.getHours() % 12 || 12).padStart(2, "0");
  const minutes = String(createdAt.getMinutes()).padStart(2, "0");
  const ampm = createdAt.getHours() >= 12 ? "pm" : "am";

  return `${year}/${month}/${day} -- ${hours}:${minutes} ${ampm}`;
}
