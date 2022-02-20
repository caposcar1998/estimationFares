const daysWeek = {
    'Monday': 1.0,
    'Tuesday': 0.95,
    'Wednesday': 0.9,
    'Thursday': 0.95,
    'Friday': 1.2,
    'Saturday': 1.3,
    'Sunday': 1.5
}

const hours = [
    {'turn':'12:00:00 am-09:59:00 am','value': 1.2},
    {'turn':'10:00:00 am-03:59:00 pm','value': 1.0},
    {'turn':'04:00:00 pm-07:59:00 pm','value': 1.5},
    {'turn':'08:00:00 pm-11:59:00 pm','value': 1.3}
]
    

module.exports = {
    "days": daysWeek,
    "hours": hours
};