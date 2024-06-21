// DEPENDENCIES
const fs = require('fs');
const inquirer = require('inquirer');

// DATA
// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "projectTitle",
        message: "What is the name of your project?"
    }
];

let projectTitle;
let readmeContents = "";

// FUNCTIONS

// writeToFile()
// Writes a text file in ./output
// fileName: name of file, e.g. ./output/fileName
// data: contents to write to the file
function writeToFile(fileName, data) {
    const outputDirPath = "./output";
    // if ./output does not exist, create it
    if (!fs.existsSync(outputDirPath)) {
        fs.mkdir("./output",(error) => {
            if(error)
                console.log("Error while creating directory ./output", error);
        });
    }
    // no need to check whether the file exists b/c fs.writeFile() will overwrite the contents
    fs.writeFile(`./output/${fileName}`,data,(error) => {
        if(error)
            console.log(`Error while writing to file ./output/${fileName}`, error);
    });
}

// prompts user to enter information about the project
// awaits the user's responses before completing execution and returns a promise
// when calling, be sure to use promptUserForProjectDetails().then() for next steps
async function promptUserForProjectDetails() {
    await inquirer.
        prompt(questions)
    .then((answers) => {
        projectTitle = answers.projectTitle;
        console.log(`in promptUserForProjectDetails(): ${projectTitle}. This one should be first.`);
    })
}

// Adds the project title to the README contents
function addTitleToREADME(title) {
    // prepend "# " to format the title
    addLineToReadMe(`# ${title}`);
}

// adds a bit of humble, plain text to the README contents
function addBodyTextToREADME(textToAdd) {
    addLineToReadMe(textToAdd);
}

// adds a string, followed by a newline, to the contents of the generated readme
function addLineToReadMe(stringToAdd) {
    readmeContents += stringToAdd;
    readmeContents +='\n';
};

// INIT
function init() {
    // using .then() directs execution to wait until the promise frompromptUserForProjectDetails()
    // is resolved before continuing
    promptUserForProjectDetails().then(()=> {
        console.log(`in the .then(): ${projectTitle}. This one should be second`);
        addTitleToREADME(projectTitle);
        addBodyTextToREADME(`This is a readme for lucky project ${projectTitle}`);
        console.log(readmeContents);
        writeToFile("README.md", readmeContents);
    });
}

// Function call to initialize app
init();
