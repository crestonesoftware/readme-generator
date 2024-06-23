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
    TOC: "Table of Contents",
    QUESTIONS: "Questions",
    TEST_INSTRUCTIONS: "Testing",
    LICENSE: "License"
}

const tableOfContents = [];
//let readmeContents = "";
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

//  adds a section heading to the TOC array
//  - formatted as a bullet in a list
//  - with a link to the anchor point for the section
//  example: "- [Installation](#Installation)\n"
function addSectionHeadingToTOC(heading) {
    tableOfContents.push(`- [${heading}](#${heading})\n`);
}

//  joins the array of section TOC section headings into a single string
//  then splices it into the readMeContentsArray after the Title
function generateTOC() {
    const generatedTOC = tableOfContents.join("");
    readmeContentsArray.splice(1,0,composeSectionForREADME(SECTION_HEADINGS.TOC, generatedTOC, true));
}

// 1) Adds the section heading to the TOC array,
// 2) composes and returns the section:
// - formats the section heading as a Markdown heading by prepending "## " and
// - adds an anchor point to which the analogous heading in the TOC will link
// - appends the section contents
function composeSectionForREADME(sectionHeading, sectionContents, noAnchorTagInHeading) {
    addSectionHeadingToTOC(sectionHeading); //TODO
    return composeLineForReadMe(TEXT_STYLES.SECTION_HEADING + `<a name="${sectionHeading}"></a>` + sectionHeading) +     
    composeBodyTextForREADME(sectionContents); 
}

// adds a bit of humble, plain text to the README contents
// this function exists for completeness/readability only, and may be removed
function composeBodyTextForREADME(textToAdd) {
    return composeLineForReadMe(textToAdd);
}

//  return githubProfileName as a link
function composeGitHubLink(githubProfileName) {
    return `Find this and other projects on GitHub: <a href="https://github.com/users/${githubProfileName}">${githubProfileName}</a>`;
}

//  return email address as a mailto link
function composeEmailLink(emailAddress) {
    return `\n\nGot questions? Contact me: <a href="mailto:${emailAddress}">${emailAddress}</a>`;
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

    const {projectTitle, projectDescription, installationInstructions,
        githubProfileName, emailAddress, testInstructions
    } = answers;
    addToREADMEArray(composeTitleForREADME(answers.projectTitle));
    addToREADMEArray(composeSectionForREADME(SECTION_HEADINGS.DESC,answers.projectDescription));
    addToREADMEArray(composeSectionForREADME(SECTION_HEADINGS.INSTALLATION,answers.installationInstructions));
    addToREADMEArray(composeSectionForREADME(SECTION_HEADINGS.TEST_INSTRUCTIONS,answers.testInstructions));
    addToREADMEArray(composeSectionForREADME(SECTION_HEADINGS.QUESTIONS,composeGitHubLink(githubProfileName) +  composeEmailLink(emailAddress)));
    addToREADMEArray(composeSectionForREADME(SECTION_HEADINGS.LICENSE,"license stuff goes here"));
    
    // although the TOC appears in the README before sections, we have to generate it here,
    // after the section headings have been added
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