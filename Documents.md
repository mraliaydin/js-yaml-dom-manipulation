# Use Cases

## Read YAML Files
- Application reads multiple YAML Configuration files.
- **Primary Actor:** Application or User
- **Goal:** Load configuration files.
- **Preconditions:** YAML files should exist, be accessible, and be valid.
- **Postconditions:** YAML files are successfully read.

## Parse YAML Files
- Application parses the contents of the YAMLs.
- **Primary Actor:** Application
- **Goal:** Get YAML content for manipulating DOM elements.
- **Preconditions:** YAML files are read by the system.
- **Postconditions:** YAML content is parsed and converted as an object.

## Manipulate DOM Elements
- Application applies actions to DOM elements.
- **Primary Actor:** Application
- **Goal:** Modify the DOM according to the configuration.
- **Preconditions:** YAML is successfully parsed.
- **Postconditions:** DOM is modified according to YAML.

### Remove Element
- **Primary Actor:** Application
- **Goal:** Remove DOM elements
- **Preconditions:** There should be a deleting action in the configuration.
- **Postconditions:** Related elements are removed from the DOM.

### Replace Element
- **Primary Actor:** Application
- **Goal:** Replace elements
- **Preconditions:** There should be a replacing action in the configuration.
- **Postconditions:** Related elements are replaced in the DOM.

### Insert Element
- **Primary Actor:** Application
- **Goal:** Insert elements
- **Preconditions:** There should be an inserting action in the configuration.
- **Postconditions:** Related elements are inserted into the DOM.

### Alter Element
- **Primary Actor:** Application
- **Goal:** Alter elements
- **Preconditions:** There should be an altering action in the configuration.
- **Postconditions:** Related elements are altered in the DOM.

## Handle Conflicts
- Apply logic to minimize conflicts when multiple YAML files affect the same DOM element.
- **Primary Actor:** Application
- **Goal:** Ensure consistency and no conflict between configurations.
- **Preconditions:** There are multiple configurations affecting the same DOM element.
- **Postconditions:** Conflicts are resolved based on priority logic.

# High-Level Design Document

## YAML Configuration Parsing
- Read and parse YAML files
- Handle multiple YAML files

## Action Types
- Insert, Alter, Replace, Remove

## Multiple Configuration Handling
- Implement priority logic to resolve conflicts.
- Ensure consistency.

## Basic DOM Manipulation
- Use JS to manipulate the DOM elements according to YAML configurations.

## Specific Configuration
- Create a YAML file specifying configurations for specific pages.

# Workflow

1. **Initialization:** Application initialized by reading `config.yaml` file then decide on which YAML files will be read according to the current page’s URL then related YAML files will be read.
2. **Parsing YAML Files:** Application parses each YAML file and converts the content into objects.
3. **Resolving Conflicts:** Conflicts are checked between actions by their priority logic.
4. **Applying Actions:** Actions will be applied to DOM elements.

# Assumptions and Limitations
- YAML files are correctly formatted.
- Basic error handling for invalid YAML formats or unsupported actions.

# Challenges and Solutions

## Challenge
- Handling conflicts between multiple configurations.

## Solution
- Implement a priority logic to ensure consistency.

# Low-Level Design

## `fetchConfigFile(configFile)`
- `config.yaml` includes configurations related to which YAML file will be used on which URL.

### Assumptions
- Since it is a bonus part, it is assumed that validations are okay.

### Workflow
- Application will fetch the `config.yaml` file and create a JS object.
- If there is no file named `config.yaml`, raise an error.
- It will check the current page URL then arrange the related YAML files.

## `fetchYamlFile(file)`
- This function will fetch YAML files and convert them to a JS object.

### Assumptions
- There could be 2 different ways to read YAML files. The first one is getting the file via input tag from the user. The second way is getting it from the same directory. In this project, reading from the same directory is used.
- If there is no file named inside `config.yaml`, raise an error.

### Workflow
- Application will fetch the files and convert them to a JS object.
- If the format of YAML is wrong, log an error.
- Send the converted JS object to `validateYaml(parsedYaml)` function to validate the elements of the JS object.
- If validation is successfully completed, return the file name and object.

## `validateYaml(parsedYaml)`
- This function validates the elements and structure of the given YAML file.

### Assumptions
- The format of every YAML is fixed. There are 4 types: remove, replace, insert, and alter. Also, their elements will be fixed. Example formats can be seen inside the YAML files.

### Workflow
- Get a converted YAML to a JS object.
- There should be an “actions” array.
- Check the indexes of the “actions” array. The first elements should be named “type” and they should be strings. If there is not an element named type and it is not a string, an error will raise.
- After that, validate each type's format.
  - **For remove:**
    - `validateRemoveAction` method will be used.
    - It will check if the `selector` element is present and is a string.
  - **For replace:**
    - `validateReplaceAction` method will be used.
    - It will check if the `selector` element and `newElement` is present and is a string.
  - **For insert:**
    - `validateInsertAction` method will be used.
    - It will check if the `position`, `target`, `element` items are present and are strings.
  - **For alter:**
    - `validateAlterAction` method will be used.
    - It will check if the `oldValue` and `newValue` element is present and is a string.
- If the formats are okay and there is no error, don’t raise an error and do nothing. Continue.

## `processYamlFiles(yamlFilesData)`
- The purpose of this function is to manipulate DOM elements.

### Assumptions
- There can be different elements inside of types. For example, the remove type just needs the `selector` element. If the selector does not exist, there will be an error. However, if there is also an `oldValue` element which alter is used, there won’t be an error. It will be redundant data and it won’t be used for the system.

### Workflow
- If there is a `priority` parameter inside the YAMLs, it will sort the files according to their priority level. “1” is the highest priority and it will append it first. If there is not a priority parameter inside a YAML, the program implements the first file that is read first.
- After arranging the list of files, start implementing file by file according to action types.

### Action Types
- **`removeElement()`:**
  - By using the `selector` get all elements.
  - Remove each element.
- **`replaceElement()`:**
  - By using the `selector` get all elements.
  - Change each element with the new one.
- **`insertElement()`:**
  - By using the `target` variable get all elements.
  - Check `position` variable’s value.
  - According to the position’s value, add a new element before or after the target.
- **`alterText()`:**
  - Get all `bodyHTML`.
  - Split the old value and add new ones.

# Suggestions and Questions Feedback
- Using a backend system while fetching can be implemented. While fetching files, file extensions can be validated. Only “.yaml” files can be fetched. Naming convention/structure can be added to files and it can be used as a filter. File size can be checked. If the size is too much to fetch, the file may not be fetched or the file can be zipped, then fetched, then unzipped.
- If the YAML files are user-supplied, there should be an XSS filter to increase security and prevent XSS attacks.
