module.exports = {

    // Enumerate License details
    LICENSES: {
        APACHE: {
            DisplayText: "Apache 2.0",
            Badge: "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
        },
        BSD: {
            DisplayText: "BSD 3-Clause License",
            Badge: "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"
        },
        GNU: {
            DisplayText: "GNU GPL v3",
            Badge: "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
        },
        MIT: {
            DisplayText: "The MIT License",
            Badge:  "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
        },
        MOZILLA: {
            DisplayText: "Mozilla Public License 2.0",
            Badge:  "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"
        },
        UNLICENSE: {
            DisplayText: "The Unlicense",
            Badge:  "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)"
        }
        
    },
    // get the display text to use as the choices array by Inquirer
    getLicensesAsArray() {
        const licensesAsArray = [];
        for (const [key, value] of Object.entries(this.LICENSES)) {
            licensesAsArray.push(value.DisplayText);
        }
        return licensesAsArray;
        
    },
    
    // Given the user's chosen displayText value, return the correspinding badge link
    // for the README file
    getBadgeLinkFromDisplayText(pDisplayText) {
        for (const [key, value] of Object.entries(this.LICENSES)) {
            if(value.DisplayText === pDisplayText)
                return value.Badge + '\n';
        }        
    },

    // Enumerate section headings to avoid spelling mistakes
    SECTION_HEADINGS : {
        TOC: "Table of Contents",
        DESC: "Description",
        INSTALLATION: "Installation",
        USAGE: "Usage",
        TEST_INSTRUCTIONS: "Testing",
        QUESTIONS: "Questions",
        CREDITS: "Credits",
        LICENSE: "License"
    },
    
    TEXT_STYLES: {
        TITLE: "# ",
        SECTION_HEADING: "## ",
    }
}