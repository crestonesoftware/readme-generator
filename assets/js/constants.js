module.exports = {
    LICENSES: {
        APACHE: {
            Name: "APACHE",
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
    getLicensesAsArray() {
        const licensesAsArray = [];
        for (const [key, value] of Object.entries(this.LICENSES)) {
            licensesAsArray.push(value.DisplayText);
        }
        return licensesAsArray;
        
    },
    getBadgeLinkFromDisplayText(displayText) {
        let badgeLink = "foo";
        for (const [key, value] of Object.entries(this.LICENSES)) {
            if(value.DisplayText === displayText);
                return value.Badge;
        }
        
    },
    SECTION_HEADINGS : {
        TOC: "Table of Contents",
        DESC: "Description",
        INSTALLATION: "Installation",
        USAGE: "Usage",
        TEST_INSTRUCTIONS: "Testing",
        QUESTIONS: "Questions",
        CONTRIBUTIONS: "Contributions",
        LICENSE: "License"
    }
}