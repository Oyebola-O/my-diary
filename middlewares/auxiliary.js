
// Returns the current date as a string
export function getTheDate(){
  let d = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = "";
  date += months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear();
  return date;
}
