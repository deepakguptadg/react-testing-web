import moment from 'moment'

export const getShowingDateText=(dateStr)=>{
  return  moment(dateStr).format("MM-DD-yyyy HH:mm")
}

export const getShowingYearMonthDate=(dateStr)=>{
  return  moment(dateStr).format("yyyy-DD-MM, h:mm")
}

export const currentDate=()=>{
  return  moment(new Date()).format('YYYY-MM-DD');
}

export const getShowingMonthDateYear=(dateStr)=>{
  return  moment(dateStr).format("MM/DD/YYYY HH:mm")
}