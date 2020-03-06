/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = function(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeInfoArray){
    return employeeInfoArray.map(employee => createEmployeeRecord(employee))
}

let createTimeInEvent = function(dateStamp){
    let parsedTime = dateStamp.split(' ')

    let event = {
        type: "TimeIn",
        hour: parseInt(parsedTime[1], 10),
        date: parsedTime[0]
    }

    this.timeInEvents.push(event)
    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, time] = dateStamp.split(' ')
    
    let event = {
        type: "TimeOut",
        hour: parseInt(time),
        date
    }
    this.timeOutEvents.push(event)
    return this
}

let hoursWorkedOnDate = function(date) {
    let start = this.timeInEvents.find(event => event.date === date)
    let end = this.timeOutEvents.find(event => event.date === date)
    return (end.hour - start.hour)/100
}

let wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(record => record.firstName === firstName)
}

let calculatePayroll = function(recordsArray){
    return recordsArray.reduce(function(memo, record){
        return memo + allWagesFor.call(record)
    }, 0)
}