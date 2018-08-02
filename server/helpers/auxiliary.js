
// Returns the current date as a string
export const getTheDate = () => {
  let d = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = "";
  date += months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear();
  return date;
}

// Returns if a user owns and ID
export const checkOwner = (entries, id) => {
  let ownsId = false;
  let index;
  for(var i = 0; i < entries.length; i++){
    if(entries[i]["id"] == id){
      ownsId = true;
      index = i;
      break;
    }
  }
  return [ownsId, index];
}
