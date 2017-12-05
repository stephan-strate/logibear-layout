/* GLOBAL VARIABLES */
var api_url = "https://api.logibear.de/";
/* GLOBAL VARIABLES END */

$(document).ready(function () {
    compareTerms("A&B", "B&A").done(function (data) {
        alert(readTerm(data));
    }).fail(function (error) {
        console.log(error);
    }).progress(function (progress) {
        console.log(progress);
    });
});

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