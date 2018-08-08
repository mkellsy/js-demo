var GetJSON = function (url) {

    // Create a new Promise, this standarizes the callbacks
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", url);

        // Define what to do at the different states of the AJAX call
        xhr.onload = function () {
            if (this.status >- 200 && this.status < 300) {

                // Test for JSON data
                if (IsJSON(xhr.responseText)) {

                    // Call the Promose resolve function
                    resolve(JSON.parse(xhr.responseText));
                } else {

                    // Call teh Promise reject function
                    reject("Invalid JSON");
                }
            } else {

                // Call teh Promise reject function
                reject(xhr.statusText);
            }
        };

        // Define what to do when the AJAX call fails
        xhr.onerror = function () {
            reject(xhr.statusText);
        };

        // The AJAX call is defined, execute it
        xhr.send();
    });
};

var IsJSON = function (value) {

    // Standarized regular expression to test if a string is in fact JSON data
    if (/^[\],:{}\s]*$/.test(value.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
        return true;
    } else {
        return false;
    }
};
