// DEPENDENCIES
const fs = require('fs');
const inquirer = require('inquirer');

const questions = require("./assets/js/inquirer-questions.js");
// DATA

const TEXT_STYLES = {
    TITLE: "# ",
    SECTION_HEADING: "## ",
}

const SECTION_HEADINGS = {
    DESC: "Description",
    INSTALLATION: "Installation",
    USAGE: "Usage",
    TOC: "Table of Contents"
}

const tableOfContents = [];

let projectTitle;
let readmeContents = "";
let readmeContentsArray = [];

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

// makes a String into a paragraph for the README by appending a newline
// meant to be called by other functions with specific needs, e.g. to add a Title,
// create a function that calls this function and pass a string to which you have prepended "# "
function composeLineForReadMe(stringToAdd) {
    return stringToAdd + '\n';
};

// formats a String as a markdown title by prepending "# "
function composeTitleForREADME(title) {
    return composeLineForReadMe(TEXT_STYLES.TITLE + title);
}

function addSectionHeadingToTOC(heading) {
    // sample line       "- [Installation](#Installation)\n"
    tableOfContents.push(`- [${heading}](#${heading})\n`);
}

function generateTOC() {
    const generatedTOC = tableOfContents.join("");
    readmeContentsArray.splice(1,0,composeSectionForREADME(SECTION_HEADINGS.TOC, generatedTOC, true));
}

function composeSectionForREADME(sectionHeading, sectionContents, noAnchorTagInHeading) {
    addSectionHeadingToTOC(sectionHeading); //TODO
    // format the heading as a Markdown heading by prepending "## "
    // add an anchor point to which the analogous heading in the TOC will link
    return composeLineForReadMe(TEXT_STYLES.SECTION_HEADING + `<a name="${sectionHeading}"></a>` + sectionHeading) +     
    composeBodyTextForREADME(sectionContents); 
}

// adds a bit of humble, plain text to the README contents
// this function exists for completeness/readability only, and may be removed
function composeBodyTextForREADME(textToAdd) {
    return composeLineForReadMe(textToAdd);
}

// pushes a String to the array of README contents, which is later joined to compose the README file 
function addToREADMEArray(stringToAdd) {
    readmeContentsArray.push(stringToAdd);
}

// prompts user to enter information about the project
// awaits the user's responses before completing execution and returns a promise
// when calling, be sure to use promptUserForProjectDetails().then() for next steps
async function promptUserForProjectDetails() {
    const answers = await inquirer.prompt(questions);

    projectTitle = answers.projectTitle;
    addToREADMEArray(composeTitleForREADME(answers.projectTitle));
    addToREADMEArray(composeSectionForREADME(SECTION_HEADINGS.DESC,answers.projectDescription));
    addToREADMEArray(composeSectionForREADME(SECTION_HEADINGS.INSTALLATION,answers.installationInstructions));
    generateTOC();
}


// INIT
function init() {
    // using .then() directs execution to wait until the promise frompromptUserForProjectDetails()
    // is resolved before continuing
    promptUserForProjectDetails().then(()=> {
        writeToFile("README.md", readmeContentsArray.join(""));
    });
}

// Function call to initialize app
init();