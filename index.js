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

function promptUserForProjectDetails() {
    inquirer.
        prompt(questions)
    .then((answers) => {
        console.log(answers.projectTitle);
    })
}

// INIT
function init() {
    promptUserForProjectDetails();
    writeToFile("README.md", "This is a readme file");
}

// Function call to initialize app
init();
