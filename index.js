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
    },
    {
        type: "input",
        name: "projectDescription",
        message: "Describe your project"
    }
];

const TEXT_STYLES = {
    TITLE: "# ",
    SECTION_HEADING: "## ",
}
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

// adds a string, followed by a newline, to the contents of the generated readme
// meant to be called by other functions with specific needs, e.g. to add a Title,
// create a function that calls this function and pass a string to which you have prepended "# "
function addLineToReadMe(stringToAdd) {
    readmeContents += stringToAdd;
    readmeContents +='\n';
};

// adds a bit of humble, plain text to the README contents
// this function exists for completeness/readability only, and may be removed
function addBodyTextToREADME(textToAdd) {
    addLineToReadMe(textToAdd);
}

// Adds the project title to the README contents
function addTitleToREADME(title) {
    // prepend "# " to format the title
    addLineToReadMe(TEXT_STYLES.TITLE + title);
}

// Adds the project title to the README contents
function addSectionToREADME(sectionHeading, sectionContents) {
    // prepend "## " to format the heading
    addLineToReadMe(TEXT_STYLES.SECTION_HEADING + sectionHeading);
    addBodyTextToREADME(sectionContents);
}

// prompts user to enter information about the project
// awaits the user's responses before completing execution and returns a promise
// when calling, be sure to use promptUserForProjectDetails().then() for next steps
async function promptUserForProjectDetails() {
    await inquirer.
        prompt(questions)
    .then((answers) => {
        projectTitle = answers.projectTitle;
        console.log(`in promptUserForProjectDetails(): ${answers.projectTitle}. This one should be first.`);
        addTitleToREADME(answers.projectTitle);
        addSectionToREADME("Description",`This is the description for lucky project ${answers.projectDescription}`);
    })
}

// INIT
function init() {
    // using .then() directs execution to wait until the promise frompromptUserForProjectDetails()
    // is resolved before continuing
    promptUserForProjectDetails().then(()=> {
        console.log(`in the .then(): ${projectTitle}. This one should be second`);
        console.log(readmeContents);
        writeToFile("README.md", readmeContents);
    });
}

// Function call to initialize app
init();
