/* GLOBAL VARIABLES */
var api_url = "https://api.logibear.de/";
api_url = "http://vserver1.statc.de:4567/";
// api_url = "http://api.statc.de/";
/* GLOBAL VARIABLES END */

$(document).ready(function () {
    $("#lb-comparison-start").on("click", function (event) {
        doRequest("comparison", compareTerms, 2, null);
    });
});

$(window).scroll(function () {
    var nav = $("#nav");
    if ($(window).scrollTop() > 20) {
        nav.addClass("collapsed");
    } else {
        nav.removeClass("collapsed");
    }
});

function doRequest (endpoint, func, amount, callback) {
    $("#lb-" + endpoint + "-loader").show();
    $("#lb-" + endpoint + "-start").hide();
    $("#lb-" + endpoint + "-result").hide();

    // Disable inputs
    for (var i = 1; i < (amount + 1); i++) {
        $("#lb-" + endpoint + "-term" + i).prop("disabled", true);
    }

    var params = [];
    for (var j = 1; j < (amount + 1); j++) {
        params.push($("#lb-" + endpoint + "-term" + j).val());
    }

    func(params).done(function (data) {
        $("#lb-" + endpoint + "-loader").hide();
        $("#lb-" + endpoint + "-start").show();

        // Enable inputs
        for (var i = 1; i < (amount + 1); i++) {
            $("#lb-" + endpoint + "-term" + i).prop("disabled", false);
        }

        $("#lb-" + endpoint + "-result-value").html(data.status);
        $("#lb-" + endpoint + "-result-message").html("");
        $("#lb-" + endpoint + "-result").show();

        callback ? callback(data) : "";
    }).fail(function (error) {
        $("#lb-" + endpoint + "-loader").hide();
        $("#lb-" + endpoint + "-start").show();

        // Enable inputs
        for (var i = 1; i < (amount + 1); i++) {
            $("#lb-" + endpoint + "-term" + i).prop("disabled", false);
        }

        $("#lb-" + endpoint + "-result-value").html("Undefined");
        $("#lb-" + endpoint + "-result-message").html("Ein Problem ist aufgetreten.<br />Für Entwickler: " + error.toString());
        $("#lb-" + endpoint + "-result").show();

        callback ? callback(error) : "";
    });
}

/**
 * "comparison" endpoint of logibear api.
 * Compares two terms in different formats
 * and returns a detailed result.
 * @param terms string term in different formats
 * @returns {*}
 */
function compareTerms (terms) {
    return $.ajax({
        url: api_url + "comparison/" + parseTerm(terms[0]) + "/" + parseTerm(terms[1])
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