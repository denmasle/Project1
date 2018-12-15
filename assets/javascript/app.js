$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: ""
    };

    firebase.initializeApp(config);


    $(".container").on("click", ".btn", function () {
        var zip = $("#search").val().trim();
        var lat;
        var lng;

        var geocodingUrl = "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=";
        var googleAPIkey = "AIzaSyBcLDPYV93T5_XF3TdfXBRANb9N1wkYn2k";

        $.ajax({
            type: "GET",
            url: geocodingUrl + zip + "&key=" + googleAPIkey,
            dataType: "json"
        }).then(function (data) {
            lat = data.results[0].geometry.location.lat;
            lng = data.results[0].geometry.location.lng;

            console.log("Latitude : " + lat);
            console.log("Longitude : " + lng);

            $("header, section").empty();

            hikeApi(lat, lng);
        });
    });

    function hikeApi(lat, lon) {

        var trailKey = "200396711-e807f4a3a7208434b577326e19600e21";
        var queryURL = "https://www.hikingproject.com/data/get-trails?" + "lat=" + lat + "&lon=" + lon + "&maxDistance=10" + "&key=" + trailKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.trails;

            for (var i = 0; i < results.length; i++) {
                var trailDiv = $("<div class='trails'>");

                var n = $("<h6>").text(results[i].name);
                var l = $("<p>").text("Location: " + results[i].location);
                var c = $("<p>").text("Condition: " + results[i].conditionStatus);
                var d = $("<p>").text("Difficulty: " + results[i].difficulty);
                var le = $("<p>").text("Length: " + results[i].length);
                var s = $("<p>").text("Stars: " + results[i].stars);

                var imgLink = $("<a>");
                imgLink.attr("href", results[i].url);

                var image = $("<img>");
                image.attr("src", results[i].imgSmallMed);
                image.addClass("image");
                imgLink.append(image);

                trailDiv.append(imgLink);
                trailDiv.append(n, l, c, d, le, s);
                $("#trail-show").prepend(trailDiv);
            }
        })
    }

});