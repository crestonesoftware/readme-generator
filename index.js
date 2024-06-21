// DEPENDENCIES
const fs = require('fs');

// DATA
// TODO: Create an array of questions for user input
const questions = [];

// FUNCTIONS
function writeToFile(fileName, data) {
    console.log("writeToFile");
    const outputDirPath = "./output";
    if (!fs.existsSync(outputDirPath)) {
        fs.mkdir("./output",(error) => {
            if(error)
                console.log(error);
        });
    }
    fs.writeFile("./output/${fileName}",data,(error) => {
        if(error)
            console.log(error);
    });
}

// INIT
function init() {
    writeToFile("README.md", "This is a readme file");
}

// Function call to initialize app
init();
