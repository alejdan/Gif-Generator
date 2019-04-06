$(document).ready(function () {

    //Topics

    var topics = ["Super Mario Bros.", "Resident Evil", "God of War", "Call of Duty", "Assassins Creed"];

    //New div in which the buttons will go

    var buttonsDiv = $("<div>");

    //Loop through the topics array and add a button to the buttonsDiv variable for each topic.

    for (var i = 0; i < topics.length; i++) {

        var btn = $("<button>" + topics[i] + "</button>");

        btn.addClass("franchise-button");

        buttonsDiv.append(btn);

    }

    $(buttonsDiv).appendTo("#buttons");



    $("#submit").on("click", function () {

        input = $("#input").val();

        if ($("#input").val() !== "") {

            var btnAdded = $("<button>" + input + "</button>");

            btnAdded.addClass("franchise-button");

            buttonsDiv.append(btnAdded);

        } else {

        }

    });

    $(".franchise-button").on("click", function () {

        var franchise = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            franchise + "&api_key=fhzJX3gZXGwyBzoihxydlvs8IiED0KjI&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");

                var resultFromLoop = results[i];

                var rating = resultFromLoop.rating;

                var p = $("<p>").text("Rating: " + rating);

                var franchiseImg = $("<img>");

                franchiseImg.addClass("individualImage");

                franchiseImg.attr("src", resultFromLoop.images.fixed_height_still.url);

                franchiseImg.attr("data-active", resultFromLoop.images.fixed_height.url);

                franchiseImg.attr("data-still", resultFromLoop.images.fixed_height_still.url);

                franchiseImg.attr("data-state", "still");

                $(document).on("click", ".individualImage", function () {

                    if ($(this).attr("src") === $(this).attr("data-still")) {

                        $(this).attr("src", $(this).attr("data-active"));

                        $(this).attr("data-state", "active");

                    } else {

                        $(this).attr("src", $(this).attr("data-still"))

                        $(this).attr("data-state", "still");

                    }


                });

                gifDiv.prepend(p);
                gifDiv.prepend(franchiseImg);

                $("#gifsDiv").prepend(gifDiv);

            }

        });

    });

    $(document).on("click", ".franchise-button", searchAPIGif);

    function searchAPIGif() {
        var franchise = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            franchise + "&api_key=fhzJX3gZXGwyBzoihxydlvs8IiED0KjI&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");

                var resultFromLoop = results[i];

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var franchiseImg = $("<img>");

                franchiseImg.addClass("individualImage");

                franchiseImg.attr("src", results[i].images.fixed_height_still.url);

                franchiseImg.attr("data-active", results[i].images.fixed_height.url);

                franchiseImg.attr("data-still", results[i].images.fixed_height_still.url);

                franchiseImg.attr("data-state", "still");

                
                gifDiv.prepend(p);
                gifDiv.prepend(franchiseImg);

                $("#gifsDiv").prepend(gifDiv);

            }



        });

    }

    $(document).on("click", ".individualImage", function () {

        if ($(this).attr("src") === $(this).attr("data-still")) {

            $(this).attr("src", $(this).attr("data-active"));

            $(this).attr("data-state", "active");

        } else {

            $(this).attr("src", $(this).attr("data-still"))

            $(this).attr("data-state", "still");

        }

    });



});