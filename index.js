window.onload = function() {
    // set the html button elements equal to variables
    var showModalButton = document.getElementById("showModalButton");
    var hideModalButton = document.getElementById("hideModalButton");

    // define a variable for the modal area
    var modalElement = document.getElementById("modalContainer");

    // define function to show the modal
    function showModal() {
        modalElement.style.display = 'block';
        showModalButton.style.display = 'none';
    }

    // define function to hide the modal
    function hideModal() {
        modalElement.style.display = 'none';
        showModalButton.style.display = 'block';
    }

    // call functions to show or hide the modal when clicked
    showModalButton.onclick = showModal;
    hideModalButton.onclick = hideModal;

    // get user's window.navigator info
    var browserInfo = window.navigator.appCodeName;

    // declare function to return user's window.navigator info
    var ourUsersInfo = function(browserObject) {
        console.log("browserInfo is a: ", typeof browserInfo);
        return browserInfo.toString();
    };

    // what does ourUsersInfo function return? let's look:
    console.log("started from the bottom now we here: ", ourUsersInfo());

    // create function that inserts the info into the a form field
    function setInputValue(formId, val) {
        document.getElementById(formId).setAttribute('value', val);
        console.log("dis ran fo' sho.");
    }
    // now actually insert dat info!
    setInputValue('myField', ourUsersInfo());
};