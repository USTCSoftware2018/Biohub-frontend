function getMonth (num) {
  let month=["January","February","March","April","May","June","July","August","September","October","November","December"]
  return month[num-1]
}

export function getTimeStamp (isostr) {
  let parts = isostr.match(/\d+/g)
  return new Date(getMonth(parts[1])+' '+parts[2]+','+parts[0]+' '+parts[3]+':'+parts[4]+':'+parts[5]).getTime()
}
