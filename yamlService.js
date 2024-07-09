//YAML file variables
const yamlFiles = [];

const configFile = "config.yaml";

let configFileElementsObj;

//Fetch the config file when the page loads:
document.addEventListener("DOMContentLoaded", async () => {
  try {
    configFileElementsObj = await fetchConfigFile(configFile);
  } catch (error) {
    const errorMessage = new Error(`Error fetching or parsing:`, error);
    console.error(errorMessage);
    throw errorMessage;
  }
});

//Fetch config.yaml file
async function fetchConfigFile(configFile) {
  try {
    const response = await fetch(configFile);

    if (!response.ok) {
      // If there is no file with given name raise an alert...
      if (response.status === 404) {
        alert(`There is no file with name: ${file}`);
      }
      const error = new Error(`Network response was not ok for file: ${file}`);
      console.error(error);
      throw error;
    }
    const yamlText = await response.text();

    //Create a JS onject
    const parsedYaml = jsyaml.load(yamlText);

    //Assume that validation is ok

    //Get config.yaml urls:
    const urls = parsedYaml.datasource.urls;

    // Get yaml files which is url is maches with current url
    Object.keys(urls).forEach((url) => {
      //console.log(urls[url]);
      //console.log(window.location.pathname);
      if (window.location.pathname === url) {
        console.log(urls[url]);
        //console.log(window.location.pathname);
        yamlFiles.push(...urls[url]);
        console.log(yamlFiles);
        return;
      }
    });

    return { configFile, parsedYaml };
  } catch (error) {
    const errorMessage = new Error(`Error fetching or parsing ${file}:`, error);
    console.error(errorMessage);
    throw errorMessage;
  }
}

//Start Button Variable
let startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => {
  // Fetch and process each YAML file
  Promise.all(yamlFiles.map((file) => fetchYamlFile(file)))
    .then(processYamlFiles)
    .catch((error) => console.error(`Error in processing YAML files:`, error));
});

async function fetchYamlFile(file) {
  try {
    console.log(file);
    // Read file and get response
    const response = await fetch(file);

    if (!response.ok) {
      // If there is no file with given name raise an alert...
      if (response.status === 404) {
        alert(`There is no file with name: ${file}`);
      }
      const error = new Error(`Network response was not ok for file: ${file}`);
      console.error(error);
      throw error;
    }

    const yamlText = await response.text();

    //Create a JS onject
    const parsedYaml = jsyaml.load(yamlText);

    //Validate the given YAML files.
    validateYaml(parsedYaml);

    return { file, parsedYaml };
  } catch (error) {
    const errorMessage = new Error(`Error fetching or parsing ${file}:`, error);
    console.error(errorMessage);
    throw errorMessage;
  }
}
//ValidateYaml
const validateYaml = (parsedYaml) => {
  // Check is there an actions array
  if (!Array.isArray(parsedYaml.actions)) {
    throw new Error("YAML format error: 'actions' should be an array");
  }

  // Validate every element.
  parsedYaml.actions.forEach((action, index) => {
    if (typeof action.type !== "string") {
      const error = new Error(
        `YAML format error: 'type' should be a string in action at index ${index}`
      );
      console.error(error);
      throw error;
    }

    //Validate the format of types'
    switch (action.type) {
      case "remove":
        validateRemoveAction(action, index);
        break;
      case "replace":
        validateReplaceAction(action, index);
        break;
      case "insert":
        validateInsertAction(action, index);
        break;
      case "alter":
        validateAlterAction(action, index);
        break;
      default:
        const error = new Error(
          `YAML format error: invalid 'type' value '${action.type}' at index ${index}`
        );
        console.error(error);
        throw error;
    }
  });
};

const validateRemoveAction = (action, index) => {
  if (typeof action.selector !== "string") {
    const error = new Error(
      `YAML format error: 'selector' should be a string in 'remove' action at index ${index}`
    );
    console.error(error);
    throw error;
  }
};

const validateReplaceAction = (action, index) => {
  if (
    typeof action.selector !== "string" ||
    typeof action.newElement !== "string"
  ) {
    const error = new Error(
      `YAML format error: 'selector' and 'newElement' should be strings in 'replace' action at index ${index}`
    );
    console.error(error);
    throw error;
  }
};

const validateInsertAction = (action, index) => {
  if (
    typeof action.position !== "string" ||
    typeof action.target !== "string" ||
    typeof action.element !== "string"
  ) {
    const error = new Error(
      `YAML format error: 'position', 'target', and 'element' should be strings in 'insert' action at index ${index}`
    );
    console.error(error);
    throw error;
  }
};

const validateAlterAction = (action, index) => {
  if (
    typeof action.oldValue !== "string" ||
    typeof action.newValue !== "string"
  ) {
    const error = new Error(
      `YAML format error: 'oldValue' and 'newValue' should be strings in 'alter' action at index ${index}`
    );
    console.error(error);
    throw error;
  }
};

function processYamlFiles(yamlFilesData) {
  // Sort by priority if needed
  yamlFilesData.sort(
    (a, b) => (a.parsedYaml.priority || 0) - (b.parsedYaml.priority || 0)
  );

  //Manipulate the DOM elements
  yamlFilesData.forEach(({ file, parsedYaml }) => {
    parsedYaml.actions.forEach((action) => {
      switch (action.type) {
        case "remove":
          removeElement(action.selector);
          break;
        case "replace":
          replaceElement(action.selector, action.newElement);
          break;
        case "insert":
          insertElement(action.position, action.target, action.element);
          break;
        case "alter":
          alterText(action.oldValue, action.newValue);
          break;
        default:
          console.warn(`Unknown action type: ${action.type} in file: ${file}`);
      }
    });
  });
}

const removeElement = (selector) => {
  let htmlElement = document.querySelectorAll(selector);
  htmlElement.forEach((element) => element.remove());
};

const replaceElement = (selector, newElement) => {
  let htmlElement = document.querySelectorAll(selector);

  htmlElement.forEach((element) => {
    element.outerHTML = newElement;
  });
};

const insertElement = (position, target, element) => {
  const htmlElement = document.querySelectorAll(target);
  htmlElement.forEach((e) => {
    if (position === "before") {
      e.insertAdjacentHTML("beforebegin", element);
    } else if (position === "after") {
      e.insertAdjacentHTML("afterend", element);
    } else {
      console.error(`Unknown position: ${position}`);
    }
  });
};

const alterText = (oldValue, newValue) => {
  // document.body.innerHTML
  let bodyHTML = document.body.innerHTML;

  // Change the old vaules with new ones
  bodyHTML = bodyHTML.split(oldValue).join(newValue);

  document.body.innerHTML = bodyHTML;
};
