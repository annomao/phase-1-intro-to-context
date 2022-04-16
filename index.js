// Your code here
function createEmployeeRecord(employee) {
    return {
      firstName: employee[0],
      familyName: employee[1],
      title: employee[2],
      payPerHour: employee[3],
      timeInEvents: [],
      timeOutEvents: []
      }
  }
  
  function createEmployeeRecords(employees){
    return employees.map((employee) => createEmployeeRecord(employee))
  }
  
  function createTimeInEvent(object, date){
    let dateStamp = date.split(" ")
    let eventObj = {
      type: "TimeIn",
      hour: parseInt(dateStamp[1]),
      date: dateStamp[0]
    }
    object.timeInEvents.push(eventObj)
    return object
  }
  
  function createTimeOutEvent(object, date){
    let dateStamp = date.split(" ")
    let eventObj = {
      type: "TimeOut",
      hour: parseInt(dateStamp[1]),
      date: dateStamp[0]
    }
    object.timeOutEvents.push(eventObj)
    return object
  }
  
// let hoursWorkedOnDate = function(employee, soughtDate){
//     let inEvent = employee.timeInEvents.find(function(e){
//         return e.date === soughtDate
//     })

//     let outEvent = employee.timeOutEvents.find(function(e){
//         return e.date === soughtDate
//     })

//     return (outEvent.hour - inEvent.hour) / 100
// }

function hoursWorkedOnDate(object, date){
    let objDate = object.timeInEvents[0].date
    if(date === objDate){
      console.log (object.timeOutEvents[0].hour - object.timeInEvents[0].hour) / 100
    }
  }

  let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

  function wagesEarnedOnDate(object, date){
    //console.log(object)
    return object.payPerHour * hoursWorkedOnDate(object, date)
  }
  
//   function allWagesFor(object){
//     let timeInDates = object.timeInEvents
//     //console.log(object)
//     //console.log(timeInDates.date)
//     let dateCollection = timeInDates.map((date) => date.date)
//     console.log(dateCollection)
//     //XXXX collect all the dates w/ map. 
//     //reduce output from map w/ wagesearnedondate as callback
//     dateCollection.reduce(wagesEarnedOnDate(object, dateCollection[1]))
//     //wagesEarnedOnDate(object, date)
//   }
function allWagesFor(employee){
    let timeInDates = employee.timeInEvents.map((obj) => (obj.date))

    //console.log(object)
    //console.log(timeInDates.date)
    //let dateCollection = timeInDates.map((date) => date.date)
    
    //XXXX collect all the dates w/ map. 
    //reduce output from map w/ wagesearnedondate as callback
    
    //wagesEarnedOnDate(object, dateCollection[0]) + wagesEarnedOnDate
  
    let payOwed = timeInDates.reduce((obj, d2) => {
      return(obj + wagesEarnedOnDate(employee, d2))
    }, 0)
    return payOwed
    //wagesEarnedOnDate(object, date)
  }