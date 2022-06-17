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
        onboarding: {
            root: "/onboarding",
        },
        projectMgmt: {
            root: "/app/project-management",
            project: "/app/project-management/project",
        },
        reminders: {
            root: "/app/reminders",
            reminder: "/app/reminders/reminder",
        },
        settings: "/settings",
    },
    shortDescription: "Never miss a meeting. Never forget a project. Keep track of your To-Do list and receive smart reminders to get things done."
};

export default config;