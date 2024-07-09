# Project README

## Overview

This project demonstrates how to fetch and process YAML configuration files (`config.yaml` and others specified within it) using pure JavaScript. The fetched YAML files define actions to manipulate the DOM based on current URL paths.

## Usage

1. **Setup:**
   - Ensure `config.yaml` is correctly configured with URLs and actions.
   - Place your YAML files at the specified URLs.
   - In yamlService.js folder, on 47th line there is window.location.pathname === url code. Arrange the config.yaml url for [A.yaml, B.yaml] according to your current index.html url.

2. **Functionality:**
   - **Initialization:** The `config.yaml` file is fetched when the page loads.
   - **Action Execution:** Clicking the "Start" button triggers fetching and processing of YAML files specified for the current URL path.
   - **Actions Supported:** Removal, replacement, insertion, and text alteration of DOM elements based on YAML-defined instructions.

## Files

- **`config.yaml`:** Main configuration file defining URLs and associated YAML files.
- **`yamlService.js`:** JavaScript file handling YAML fetching, parsing, and DOM manipulation.
- **`tableSerice.js`:** JavaScript file for manipulating table.
- **`style.css`:** CSS file for index.html
- **`A.yaml`:** YAML file for manipulating the DOM elements
- **`B.yaml`:** YAML file for manipulating the DOM elements
- **`C.yaml`:** YAML file for manipulating the DOM elements
- **`index.html`:** HTML file containing the interface and start button.

## How to Run

- Simply open `index.html` in a web browser.

## Error Handling

- Errors are logged to the console and may trigger alerts for missing or incorrectly formatted YAML or URL paths.

## Notes

- This project does not use Node.js; it operates purely on client-side JavaScript.
- In Documents.docx file you can find documentation of the project.

