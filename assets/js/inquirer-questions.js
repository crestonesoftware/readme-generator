// DATA
module.exports = [
    {
        type: "input",
        name: "projectTitle",
        message: "What is the name of your project?",
        default: "ACME Readme Generator"
    },
    {
        type: "input",
        name: "projectDescription",
        message: "Describe your project",
        default: "Generates README.md files from user input, and somehow involves a catapult."
    },
    {
        type: "input",
        name: "installationInstructions",
        message: "How can users install your product?",
        default: "I haven't worked out the installation instructions yet"
    },
    {
        type: "input",
        message: "How can the user use this project?",
        name: "usageInstructions",
        default: "- Click [Go] \n- Do wonderful stuff \n- click [Stop]"
    },
    {
        type: "input",
        message: "How can the user test this project?",
        name: "testInstructions",
        default: "- Open a defect tracking system.\n- Bang at the app for a while.\n- Note the things that go 'clunk' or 'kaboom!'"
    },
    {
        type: "input",
        message: "Let's help people find your brilliance on GitHub. what is your GitHub profile name?",
        name: "githubProfileName",
        default: "crestonesoftware"
    },
    {
        type: "input",
        message: "At what email address would you like users to contact you with questions?",
        name: "emailAddress",
        default: "clever-dev@website.com"
    },
    {
        type: "input",
        message: "Would you like to give credit for any contributions?",
        name: "contributions",
        default: "Thank you to Ben B Wright for help simplifying the promise handling."
    },
    {
        type: "list",
        message: "Which license applies to this project?",
        name: "license",
        choices: ["Apache","GNU","MIT","Mozilla"],
        default: "MIT"
    }
];