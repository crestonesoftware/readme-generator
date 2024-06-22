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

// adds a string, followed by a newline, to the contents of the generated readme
// meant to be called by other functions with specific needs, e.g. to add a Title,
// create a function that calls this function and pass a string to which you have prepended "# "
function composeLineForReadMe(stringToAdd) {
    return stringToAdd + '\n';
};

// Adds the project title to the README contents
function composeTitleForREADME(title) {
    // prepend "# " to format the title
    return composeLineForReadMe(TEXT_STYLES.TITLE + title);
}

function addSectionToREADME(sectionHeading, sectionContents) {
    // prepend "## " to format the heading
    addLineToReadMe(TEXT_STYLES.SECTION_HEADING + `<a name="${sectionHeading}"></a>` + sectionHeading);
    
    addBodyTextToREADME(sectionContents);

    addSectionHeadingToTOC(sectionHeading);
}

//compose
function composeSectionForREADME(sectionHeading, sectionContents) {
    addSectionHeadingToTOC(sectionHeading); //TODO

    // prepend "## " to format the heading    
    return composeLineForReadMe(TEXT_STYLES.SECTION_HEADING + `<a name="${sectionHeading}"></a>` + sectionHeading) +     
    composeBodyTextForREADME(sectionContents); 
}

// adds a bit of humble, plain text to the README contents
// this function exists for completeness/readability only, and may be removed
function addBodyTextToREADME(textToAdd) {
    addLineToReadMe(textToAdd);
}
//COMPOSE
// adds a bit of humble, plain text to the README contents
// this function exists for completeness/readability only, and may be removed
function composeBodyTextForREADME(textToAdd) {
    return composeLineForReadMe(textToAdd);
}

function addToREADMEArray(stringToAdd) {
    readmeContentsArray.push(stringToAdd);
}





function addSectionHeadingToTOC(heading) {
    // sample line       "- [Installation](#Installation)\n"
    tableOfContents.push(`- [${heading}](#${heading})\n`);
}



function generateTOC() {
    const generatedTOC = tableOfContents.join("");
    
    addSectionToREADME(SECTION_HEADINGS.TOC, generatedTOC);    
}

// prompts user to enter information about the project
// awaits the user's responses before completing execution and returns a promise
// when calling, be sure to use promptUserForProjectDetails().then() for next steps
async function promptUserForProjectDetails() {
    const answers = await inquirer.prompt(questions);

    projectTitle = answers.projectTitle;
    console.log(`in promptUserForProjectDetails(): ${answers.projectTitle}. This one should be first.`);
    console.log(composeLineForReadMe("foo"));
    
    //addTitleToREADME(answers.projectTitle);
    addToREADMEArray(composeTitleForREADME(answers.projectTitle));
    addToREADMEArray(composeSectionForREADME(SECTION_HEADINGS.DESC,answers.projectDescription));
    console.log(readmeContentsArray);
    
return;
    readmeContents += composeTitleForREADME(answers.projectTitle);
    readmeContents += composeSectionForREADME(SECTION_HEADINGS.DESC,answers.projectDescription);
    readmeContents += composeSectionForREADME(SECTION_HEADINGS.INSTALLATION,answers.installationInstructions);
    generateTOC();
}


// INIT
function init() {
    // using .then() directs execution to wait until the promise frompromptUserForProjectDetails()
    // is resolved before continuing
    promptUserForProjectDetails().then(()=> {

        console.log(readmeContents);
        //writeToFile("README.md", readmeContents);
        writeToFile("README.md", readmeContentsArray.join(""));
    });
}

// Function call to initialize app
init();
