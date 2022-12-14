/*
    Author: devCodeCamp, David Le, Tyler Brinker, 
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":

            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            switch(personInfo){
                case true:
                    mainMenu(person, people)
                case false:
                    app(people);
            }
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            switch (personFamily){
                case true:
                    mainMenu(person, people)
                case false:
                    app(people);
            }
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            let nextStep = confirm(`${personDescendants}\nSelect 'Ok' to go back to person or 'Cancel' to start a new search`)
            switch (nextStep){
                case true:
                    mainMenu(person, people)
                case false:
                    app(people);
            }
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            break;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
 function capitalizeFirstLetter(str) {

    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
}
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    firstName = capitalizeFirstLetter(firstName)
    let lastName = promptFor("What is the person's last name?", chars);
    lastName = capitalizeFirstLetter(lastName)
    
    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    return confirm(`${personInfo}\nSelect 'Ok' to go back to person or 'Cancel' to start a new search`);

}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????

function findPersonFamily(desired,people){
    let personFamily = [`${desired.firstName} ${desired.lastName}'s Family:\n`]
    personFamily += findPersonSpouse(desired,people);
    personFamily += findPersonParentsAndSiblings(desired,people);
    return confirm(`${personFamily}\nSelect 'Ok' to go back to person or 'Cancel' to start a new search`)
}

function findPersonSpouse(desired,people){
    let personSpouse;
    let personFamily="";
    personSpouse = people.filter(function(person){
        if(person.id == desired.currentSpouse){
            return true;
    }})
    if(personSpouse.length == 1){
        personFamily += `\nSpouse:\n${personSpouse[0].firstName} ${personSpouse[0].lastName}\n`
    } else {
        personFamily += "\nNo spouse in the system\n"}
    return personFamily
}

function findPersonParentsAndSiblings(desired,people){
    let personFamily="";
    let personParents;
    personParents = people.filter(function(person){
        if(desired.parents.includes(person.id)){
            return true;
    }})
    if(personParents.length > 0){
        personFamily += '\nParents:\n';
        for(let i = 0; i < personParents.length; i++){
            personFamily += `${personParents[i].firstName} ${personParents[i].lastName}\n`
        }
        personFamily += findPersonSiblings(desired,people, personParents)
    } else {personFamily += "\nNo parents or siblings in the system\n"}
    return personFamily
}

function findPersonSiblings(desired,people, personParents){
    let personFamily="";
    let personSiblings;
    personSiblings = people.filter(function(person){
        if((person.id != desired.id) && (person.parents.includes(personParents[0].id || personParents[1]))) {
            return true;
    }})
    if(personSiblings.length > 0 ) {
        personFamily += "\nSiblings:\n"
        for(let i = 0; i < personSiblings.length; i++){
            personFamily += `${personSiblings[i].firstName} ${personSiblings[i].lastName}\n`;
        }
    } else { personFamily += "\nNo siblings in the system\n"}
    return personFamily;
}

function findPersonDescendants(desired, people, levelsOfDescendants = 0){
    let indentation = ' '.repeat(7*levelsOfDescendants)
    let PersonDescendantsDisplayed = ''
    PersonDescendantsDisplayed += [`${desired.firstName} ${desired.lastName}:\n`]
    levelsOfDescendants += 1;
    let personDescendants;
    personDescendants = people.filter(function(person){
        if(person.parents.includes(desired.id)){
            return true;
}})
    if(personDescendants.length > 0){
        for(let i = 0; i < personDescendants.length; i++){
            
            PersonDescendantsDisplayed += `${indentation}-->${findPersonDescendants(personDescendants[i], people, levelsOfDescendants)}\n`
        }}

    else {PersonDescendantsDisplayed += `${indentation}-->No children in the system`}
    return PersonDescendantsDisplayed;
}

function searchByTraits(people) {
    let traits = promptFor("Search database by the following criteria:\nid, firstName, lastName, gender, dob, height, weight, eyeColor, occupation, parent id, or spouse id\n\nTo search using multiple criteria (up to 5), please enter in the following format: eyeColor brown gender female occupation doctor", chars);
    traits = traits.split(" ")
    let trait = ["We've searched by your criteria...\n"]
    let foundPeople;

    foundPeople = people.filter(function (person) {
        if (person[traits[0]] == traits[1]) {
            return true;}});

    for(let i = 2; i < 10; i += 2){
        foundPeople = foundPeople.filter(function (person) {
            if (person[traits[i]] == traits[i+1]) {
                return true;}});
    }

    if (foundPeople.length > 0) {
        for(let i = 0; i < foundPeople.length; i++) {
            trait += `${[i+1]}) ${foundPeople[i].firstName} ${foundPeople[i].lastName}\n`
        }
        return filterFurther(foundPeople, trait, people);
    } else {
        trait += "\nNo matches found in the system"
        alert(trait)
        return app(people)
    }
}

function filterFurther(foundPeople, trait, people){
    let poi;
    poi = prompt(`${trait}\nPlease select a number to see more details of that person, type 'restart' to search by new criteria, or type 'cancel' to end search.`)
    let poi3 = [];
    if(parseInt(poi) > 0 && parseInt(poi) <=foundPeople.length){
        poi = foundPeople[parseInt(poi)-1];
        poi3.push(poi)
    }
    switch (poi){
        case "cancel":
            break;
        case "restart":
            return app(people);
        case poi3[0]:
            return poi3;
        default:
            return filterFurther(foundPeople, trait);
    }}