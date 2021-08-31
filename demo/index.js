// tasks eventually will be stored with the user login object
// Progress: 0 = not started, 1 = in progress, 2 = completed
module.exports = {
    uid: 1,
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
                timeZone: 'America/New_York',
                tags: [
                    {
                        urgent: true,
                        name: "Needs review"
                    },
                    {
                        urgent: false,
                        name: "Expedited"
                    }
                ]
            },
            progress: 0
        },
        {
            id: 2,
            name: 'Demo Task 2',
            description: 'This is another demo task for more demonstration purposes!',
            properties: {
                startDate: 'Friday, July 30, 2021',
                endDate: 'Monday, August 2, 2021',
                timeZone: 'America/New_York',
                tags: [
                    {
                        urgent: true,
                        name: "Needs review"
                    },
                    {
                        urgent: true,
                        name: "Expedited"
                    }
                ]
            },
            progress: 1
        },
        {
            id: 3,
            name: 'Demo Task 3',
            description: 'This is one more demo task for even more demonstration purposes.',
            properties: {
                startDate: 'Friday, July 30, 2021',
                endDate: 'Monday, August 2, 2021',
                timeZone: 'America/New_York',
                tags: [
                    {
                        urgent: false,
                        name: "Needs review"
                    },
                    {
                        urgent: false,
                        name: "Expedited"
                    }
                ]
            },
            progress: 2
        },
        {
            id: 4,
            name: 'Demo Task 4',
            description: 'Demo Task 4 description',
            properties: {
                startDate: 'Friday, July 30, 2021',
                endDate: 'Monday, August 2, 2021',
                timeZone: 'America/New_York',
                tags: [
                    {
                        urgent: true,
                        name: "Needs review"
                    },
                    {
                        urgent: false,
                        name: "Expedited"
                    }
                ]
            },
            progress: 0
        },
        {
            id: 5,
            name: 'Demo Task 5',
            description: 'Demo Task 5 description',
            properties: {
                startDate: 'Friday, July 30, 2021',
                endDate: 'Monday, August 2, 2021',
                timeZone: 'America/New_York',
                tags: [
                    {
                        urgent: false,
                        name: "Needs review"
                    },
                    {
                        urgent: false,
                        name: "Expedited"
                    }
                ]
            },
            progress: 1
        },
        {
            id: 6,
            name: 'Demo Task 6',
            description: 'Demo Task 6 description',
            properties: {
                startDate: 'Friday, July 30, 2021',
                endDate: 'Monday, August 2, 2021',
                timeZone: 'America/New_York',
                tags: [
                    {
                        urgent: true,
                        name: "Needs review"
                    },
                    {
                        urgent: true,
                        name: "Expedited"
                    }
                ]
            },
            progress: 2
        }
    ],
    userInfo: {
        username: 'demo',
        firstName: 'User',
        password: 'demopass',
        lastLogin: 0
    }
}