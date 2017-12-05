/* GLOBAL VARIABLES */
var api_url = "https://api.logibear.de/";
/* GLOBAL VARIABLES END */

$(document).ready(function () {
    /*
    compareTerms("A&B", "B&A").done(function (data) {
        alert(readTerm(data));
    }).fail(function (error) {
        console.log(error);
    }).progress(function (progress) {
        console.log(progress);
    });
    */

    $("#lb-comparison-start").on("click", function (event) {
        doRequest("comparison", compareTerms, 2, null);
    });
});

function doRequest (endpoint, func, amount, callback) {
    // Show loading animation
    $("#lb-" + endpoint + "-loader").show();

    // Hide button
    $("#lb-" + endpoint + "-start").hide();

    // Disable inputs
    for (var i = 1; i < (amount + 1); i++) {
        $("#lb-" + endpoint + "-term" + i).prop("disabled", true);
    }

    // Hide result
    $("#lb-" + endpoint + "-result").hide();

    setTimeout(function () {
        // Hide loading animation
        $("#lb-" + endpoint + "-loader").hide();

        // Show button
        $("#lb-" + endpoint + "-start").show();

        // Enable inputs
        for (var i = 1; i < (amount + 1); i++) {
            $("#lb-" + endpoint + "-term" + i).prop("disabled", false);
        }

        // Show result
        $("#lb-" + endpoint + "-result").show();
    }, 1000);
}

/**
 * "comparison" endpoint of logibear api.
 * Compares two terms in different formats
 * and returns a detailed result.
 * @param term1 string term in different formats
 * @param term2 string term in different formats
 * @returns {*}
 */
function compareTerms (term1, term2) {
    var terms = {
        "type": "comparison",
        "terms": [parseTerm(term1), parseTerm(term2)]
    };

    return $.ajax({
        url: api_url + "comparison/",
        type: "post",
        data: terms
    });
}

/**
 * Parses a term, so logibear api can analyse it.
 * This function can take different term formats.
 * @param term  string term in different formats
 * @returns {*}
 */
function parseTerm (term) {
    return term.toLowerCase();
}

/**
 * Reading and parsing a term returned from api,
 * to a readable string.
 * @param data  string term from api
 * @returns {*}
 */
function readTerm (data) {
    return data;
}