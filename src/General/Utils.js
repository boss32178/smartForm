
export function validateDate(year, month, day){
  let dateString = year+'-'+month+'-'+day;
  var d = convertStringToDate(year, month, day); 
  var dNum = d.getTime();
  if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0,10) === dateString;
};

export function convertStringToDate(year, month, day){
  //Javascript Date object - month goes from 0-11.
  return new Date(year, month-1, day); 
};