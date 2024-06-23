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
        message: "Let's help people find your brilliance on GitHub. what is your GitHub profile name?",
        name: "githubProfileName",
        default: "crestonesoftware"
    },
    {
        type: "input",
        message: "At what email address would you like users to contact you with questions?",
        name: "emailAddress",
        default: "clever-dev@website.com"
    }
];