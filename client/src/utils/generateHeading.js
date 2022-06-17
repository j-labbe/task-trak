// a list of encouraging phrases
const headings = [
    "Efforlessly stay on track.",
    "Let's get started!",
    "Let's get this party started!",
    "Let's get after it!",
    "You can do this!",
    "You can do it!",
    "Have a great day!",
    "You're doing great!",
    "How can we help you?",
    "How can we help you today?",
    "Where do you want to start?",
    "What do you want to do?",
    "What do you want to do today?",
    "What would you like to do?",
    "What would you like to do today?",
];

const generateHeading = () => headings[Math.floor(Math.random() * headings.length)];

export default generateHeading;