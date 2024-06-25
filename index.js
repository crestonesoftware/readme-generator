// 3RD PARTY DEPENDENCIES
const fs = require('fs');

// DEPENDENCIES
const gm = require('./utils/generateMarkdown.js');
const inquirer = require('inquirer');
const questions = require("./assets/js/inquirer-questions.js");
const constants = require("./assets/js/constants.js");

// DATA


// Arrays of strings, into which we will push the contents of the README file,
// line by line. To write the file, the array contents will be joined. This avoids
// frequent String concatenation.
const tableOfContents = [];
const readmeContentsArray = [];

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
function renderLineForReadMe(stringToAdd) {
    return stringToAdd + '\n';
};

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
    readmeContentsArray.splice(2,0,renderSection(constants.SECTION_HEADINGS.TOC, generatedTOC, true));
}

// 1) Adds the section heading to the TOC array,
// 2) renders and returns the section:
// - formats the section heading as a Markdown heading by prepending "## " and
// - adds an anchor point to which the analogous heading in the TOC will link
// - appends the section contents
function renderSection(sectionHeading, sectionContents, noAnchorTagInHeading) {
    addSectionHeadingToTOC(sectionHeading); //TODO
    return renderLineForReadMe(constants.TEXT_STYLES.SECTION_HEADING + `<a name="${sectionHeading}"></a>` + sectionHeading) +     
    renderBodyTextForREADME(sectionContents); 
}

// adds a bit of humble, plain text to the README contents
// this function exists for completeness/readability only, and may be removed
function renderBodyTextForREADME(textToAdd) {
    return renderLineForReadMe(textToAdd);
}

//  return githubProfileName as a link
function renderGitHubLink(githubProfileName) {
    return `Find this and other projects on GitHub: <a href="https://github.com/users/${githubProfileName}">${githubProfileName}</a>`;
}

//  return email address as a mailto link
function renderEmailLink(emailAddress) {
    return `\n\nGot questions? Contact me: <a href="mailto:${emailAddress}">${emailAddress}</a>`;
}

// pushes a String to the array of README contents, which is later joined to render the README file 
function addToREADMEArray(stringToAdd) {
    readmeContentsArray.push(stringToAdd);
}

///////////////////////////////////////////
// RENDER SECTIONS
// formats a String as a markdown title by prepending "# "
function renderTitle(title) {    return renderLineForReadMe(constants.TEXT_STYLES.TITLE + title); }
function renderDescription(description) {   return renderSection(constants.SECTION_HEADINGS.DESC,description);   }
function renderInstallation(installationInstructions) {  return renderSection(constants.SECTION_HEADINGS.INSTALLATION,installationInstructions); }
function renderUsage(usageInstructions) {         return renderSection(constants.SECTION_HEADINGS.USAGE,usageInstructions); }
function renderTestInstructions(testInstructions) {return renderSection(constants.SECTION_HEADINGS.TEST_INSTRUCTIONS,testInstructions);  }
function renderQuestions(githubProfileName, emailAddress) {     return renderSection(constants.SECTION_HEADINGS.QUESTIONS,renderGitHubLink(githubProfileName) +  renderEmailLink(emailAddress)); }
function renderContributions(contributions) { return renderSection(constants.SECTION_HEADINGS.CONTRIBUTIONS,contributions); }
function renderLicense(answers) { return renderSection(constants.SECTION_HEADINGS.LICENSE,gm.renderLicenseSectionBody(answers)); }

function renderBadgeLink(licenseDisplayText) {
    return constants.getBadgeLinkFromDisplayText(licenseDisplayText);
}


// prompts user to enter information about the project
// awaits the user's responses before completing execution and returns a promise
// when calling, be sure to use promptUserForProjectDetails().then() for next steps
async function promptUserForProjectDetails() {
    const answers = await inquirer.prompt(questions);

    const {projectTitle, projectDescription, installationInstructions,
        githubProfileName, emailAddress, testInstructions, usageInstructions,
        contributions, license
    } = answers;
    addToREADMEArray(renderTitle(projectTitle));
    addToREADMEArray(renderBadgeLink(license));
    addToREADMEArray(renderDescription(projectDescription));
    addToREADMEArray(renderInstallation(installationInstructions));
    addToREADMEArray(renderUsage(usageInstructions));
    addToREADMEArray(renderTestInstructions(testInstructions));
    addToREADMEArray(renderQuestions(githubProfileName,emailAddress));
    addToREADMEArray(renderContributions(contributions));
    addToREADMEArray(renderLicense(answers));
    
    // although the TOC appears in the README before sections, we have to generate it here,
    // after the section headings have been added
    generateTOC();
}

// INIT
function init() {
    // using .then() directs execution to wait until the promise from promptUserForProjectDetails()
    // is resolved before continuing
    promptUserForProjectDetails().then(()=> {
        writeToFile("README.md", readmeContentsArray.join(""));
    });
}

// Function call to initialize app
init();