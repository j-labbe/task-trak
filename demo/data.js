// tasks eventually will be stored with the user login object
module.exports = {
    settings: {
        displayTime: true
    },
    tasks: [
        {
            id: 1,
            name: 'Demo Task 1',
            description: 'This is a demo task for demonstration purposes.',
            properties: {
                startDate: 'Friday, July 30, 2021',
                endDate: 'Monday, August 2, 2021',
                timeZone: 'America/New_York'
            }
        },
        {
            id: 2,
            name: 'Demo Task 2',
            description: 'This is another demo task for more demonstration purposes!',
            properties: {
                startDate: 'Friday, July 30, 2021',
                endDate: 'Monday, August 2, 2021',
                timeZone: 'America/New_York'
            }
        },
        {
            id: 3,
            name: 'Demo Task 3',
            description: 'This is one more demo task for even more demonstration purposes.',
            properties: {
                startDate: 'Friday, July 30, 2021',
                endDate: 'Monday, August 2, 2021',
                timeZone: 'America/New_York'
            }
        }
    ]
}