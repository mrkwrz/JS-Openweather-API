/* Created by Mark Wirz, 20. November 2018, Copyright */

// Functions

    // Function Change Name (Button clicked)
    function ChangeName(){

        var name = document.getElementById("change_name_textbox").value;

        if(name == null || name == ""){
            alert("Type in a text!");
        }
        else{
        document.getElementById("WelcomeUser").innerHTML = "Welcome " + name + "!";
        }
    }

    // Weather Info Function
    function SearchCity(){
        
        var citycode = document.getElementById("city_searchbar").value;
        var countrycode = document.getElementById("country_searchbar").value;

        if(!citycode || !countrycode){
            alert("Type in a text!");
        }
        else{
            var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${citycode},${countrycode}&mode=json&appid=77d410ccec3766ca5513a1ace872f0f1`;
            
            LoadWeather(weatherURL);
        }
    }

    //new LoadWeather with PHP 
    function LoadWeather(weatherURL){

        //Get JSON file from Weather URL
        $.getJSON(weatherURL, function(jsondata){

            //Saves Values in Variables
            var city = jsondata["name"];
            var country = jsondata["sys"].country;
            var temp = jsondata["main"].temp - 273.15;
            var speed = jsondata["wind"].speed;
            var humidity = jsondata["main"].humidity;
            
            //Shorter Float of temperature
            var temp = parseFloat(temp).toFixed(1);

            //Display values in HTML document
           document.getElementById("weather_city_name").innerHTML = `City: ${city}`;
           document.getElementById("weather_country_name").innerHTML = `Country: ${country}`;
           document.getElementById("weather_temperature").innerHTML = `Temperature: ${temp}°C`;
           document.getElementById("weather_wind_speed").innerHTML = `Wind Speed: ${speed} km/h`;
           document.getElementById("weather_humidity").innerHTML = `Humidity: ${humidity}%`;
        })
    }