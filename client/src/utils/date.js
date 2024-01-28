export function formatDate(date) {
  console.log(date);
  date = date.toString().split("T");
  date[1] = date[1].slice(0, 5);

  return date[0] + " at " + date[1];
}
