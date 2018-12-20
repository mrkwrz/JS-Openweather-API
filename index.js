/* Created by Mark Wirz, 20. November 2018, Copyright */

// Functions
    
    /**
     * Display the name of the user (value in the textbox, ID: change_name_textbox) in the format `Welcome ${name}!`.
     * 
     * @return {string} name
     * 
     */
    function ChangeName(){

        var name = document.getElementById("change_name_textbox").value;

        // Check every letter of the name string
        for(zl = 0; zl < name.length; ++zl){
            name[zl]
            console.log(name[zl]);

            // If name contains a number => error & Whitespace allowance
            //
            if(!(isNaN(name[zl]))){

                if(name[zl] == " "){ 
                    document.getElementById("WelcomeUser").innerHTML = `Welcome ${name}!`;
                    return ""
                }

                alert("A name does not include a number ;)");
                return "";
            } 
        }

        // If name is null or empty => alert
        if(name == null || name == ""){
            alert("Type in a text!");
            return "";
        }
        else{
        document.getElementById("WelcomeUser").innerHTML = `Welcome ${name}!`;
        }
    }

    /**
     * Check the value of the city and country textbox and transmit it to LoadWeather.
     * 
     */
    function SearchCity(){
        
        var citycode = document.getElementById("city_searchbar").value;
        var countrycode = document.getElementById("country_searchbar").value;

        // Check every letter of the citycode string
        for(zl = 0; zl < citycode.length; ++zl){

            // If citycode contains a number => error
            if(!(isNaN(citycode[zl]))){
                alert("A name does not include a number ;)");
                return "";
            } 
        }

        // Check every letter of the countrycode string
        for(zl = 0; zl < countrycode.length; ++zl){

            // If countrycode contains a number => error
            if(!(isNaN(countrycode[zl]))){
                alert("A name does not include a number ;)");
                return "";
            } 
        }

        // If citycode or countrycode are empty => error
        if(!citycode || !countrycode){
            alert("Type in a text!");
            return ""
        }

        else{
            var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${citycode},${countrycode}&mode=json&appid=77d410ccec3766ca5513a1ace872f0f1`;
            
            LoadWeather(weatherURL);
        }
    }
   
    /**
     * Parse the JSON data from the URL and display it in the divs in the form (ID: weather_output).
     * @param {string} weatherURL 
     * @return {string}
     */
    function LoadWeather(weatherURL){

        // Clear Form Content
        $(".reset").click(function() {
            $(this).closest('form').find("input[type=text], textarea").val("");
        });


        //Get JSON file from Weather URL
        $.getJSON(weatherURL)

        // case: Successful
        .done(function(jsondata){

            // Saves Values in Variables
            var city = jsondata["name"];
            var country = jsondata["sys"].country;
            var temp = jsondata["main"].temp - 273.15;
            var speed = jsondata["wind"].speed;
            var humidity = jsondata["main"].humidity;

            
            // Shorter the float of the temperature string
            var temp = parseFloat(temp).toFixed(1);

            // Display values in HTML document (start.html)
            document.getElementById("weather_city_name").innerHTML = `City: ${city}`;
            document.getElementById("weather_country_name").innerHTML = `Country: ${country}`;
            document.getElementById("weather_temperature").innerHTML = `Temperature: ${temp}°C`;
            document.getElementById("weather_wind_speed").innerHTML = `Wind Speed: ${speed} km/h`;
            document.getElementById("weather_humidity").innerHTML = `Humidity: ${humidity}%`;
        })
        // case: Error
        .fail(function(errorString,textStatus, error ) {
            var err = textStatus + ", " + error;
            alert( "Request Failed: " + err );
    })
        // case: Always
        .always(function() {
            console.log("Done!");
          })
}