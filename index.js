/* Your Code Here */

let createEmployeeRecord = function(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: [] 
    }
}

let createEmployeeRecords = function(employeesArray) {
    return employeesArray.map(function(employeeArray) {
        return createEmployeeRecord(employeeArray) 
    })
}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ') 
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ') 
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return this
}

let hoursWorkedOnDate = function(dateStamp) {
    let inEvent = this.timeInEvents.find(function(e) {
        return e.date === dateStamp
    })
    let outEvent = this.timeOutEvents.find(function(e) {
        return e.date === dateStamp
    })
    return parseInt(outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(dateStamp) {
    let hoursWorked = hoursWorkedOnDate.call(this, dateStamp)
    let payRate = this.payPerHour
    return parseFloat(hoursWorked * payRate)
}

let calculatePayroll = function(employeeRecords) {
    let i = 0;
    employeeRecords.forEach(employeeRecord => {
        let onePayroll = allWagesFor.call(employeeRecord)
        i += parseInt(onePayroll)
    })
    return i
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(e) {
        return e.firstName === firstName
    })
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}