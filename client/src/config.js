const config = {
    port: process.env.PORT || 3000,
    db: {
        uri: "http://localhost:5000/graphql",
    },
    routes: {
        root: "/",
        app: {
            root: "/app",
        },
        projectMgmt: {
            root: "/app/projectmgmt",
            project: "/app/projectmgmt/project/:id",
        },
        reminders: {
            root: "/app/reminders",
            reminder: "/app/reminders/reminder/:id",
        }
    }
};

export default config;