// Your code here
function createEmployeeRecord(record){
  return {
    firstName :record[0],
    familyName:record[1],
    title:record[2],
    payPerHour:record[3],
    timeInEvents:[],
    timeOutEvents:[]
  }
}
//function loops through an array of arrays with employee records
//and creates an employee object
function createEmployeeRecords(records){
  let employeeRecords = []
  for(const record of records){
    employeeRecords.push(createEmployeeRecord(record))
  }
  return employeeRecords
}

function createTimeInEvent(record, timeIn){
  const dateHour = timeIn.split(" ")
  const timeInObject = {
    type : "TimeIn",
    hour : Number(dateHour[1]),
    date: dateHour[0]
  }
  record.timeInEvents.push(timeInObject)
  return record
}
function createTimeOutEvent(record, timeIn){
  const dateHour = timeIn.split(" ")
  const timeInObject = {
    type : "TimeOut",
    hour : Number(dateHour[1]),
    date: dateHour[0]
  }
  
  record.timeOutEvents.push(timeInObject)
  return record
}

function hoursWorkedOnDate(record,time){
  const timeInArray  = record.timeInEvents
  const timeOutArray  = record.timeOutEvents
  let hourIn;
  let hourOut;
  
  for(const timeInObject of timeInArray){
    if(timeInObject.date=== time){
      hourIn = timeInObject.hour
    }
  }
  for(const timeOutObject of timeOutArray){
    if(timeOutObject.date=== time){
      hourOut = timeOutObject.hour
    }
  }
  return (hourOut - hourIn)/100
}

function wagesEarnedOnDate(record , time){
  const hoursWorked = hoursWorkedOnDate(record,time)
  const rate = record.payPerHour
  return hoursWorked * rate
}

function allWagesFor(record){
  let datesWorkedArray = record.timeInEvents
  let totalWages = 0
  const employeeWages = datesWorkedArray.map(dateRecord =>{
    let dateWorked = dateRecord.date
    return wagesEarnedOnDate(record ,dateWorked)
  })
  const totalEmployeeWage = employeeWages.reduce((previousValue,currentValue)=>{
    return previousValue + currentValue
  })
  return totalEmployeeWage
}

function calculatePayroll(records){
  let employeeWages = records.map(record =>{
    return allWagesFor(record)
  })
  
  const totalEmployeeWages = employeeWages.reduce((previousValue,currentValue)=>{
    return previousValue + currentValue
  })
  return totalEmployeeWages
}

