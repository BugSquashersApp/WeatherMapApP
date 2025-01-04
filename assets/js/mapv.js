<<<<<<< HEAD

ymaps.ready(init);


function init(){
    var myMap = new ymaps.Map("map", {
            center: [53.2818492739004,69.38390624015832],
            zoom: 7,
            controls: [],
        },{
            minZoom: 5,
            maxZoom: 23  
        });
        myMap.options.set('restrictMapArea', [
            [40.5802, 46.4665], 
            [55.4413, 87.3151]  
        ]);

        myMap.copyrights.add('&nbsp;');

      
        const input = document.getElementById("city-input");
        const searchBtn = document.getElementById("search-btn");
        const zoomInButton = document.getElementById("zoom-in");
        const zoomOutButton = document.getElementById("zoom-out");

        searchBtn.addEventListener("click", () => {
            const cityName = input.value.trim();
            if (!cityName) {
                alert("Введите название города!");
                return;
            }
            ymaps.geocode(cityName).then(result => {
                const firstGeoObject = result.geoObjects.get(0);
                if (firstGeoObject) {
                    const coords = firstGeoObject.geometry.getCoordinates();
                    const bounds = firstGeoObject.properties.get('boundedBy');

                    myMap.setBounds(bounds, {
                        checkZoomRange: true
                    });

                    myMap.geoObjects.removeAll(); 
                    myMap.geoObjects.add(new ymaps.Placemark(coords, {
                        balloonContent: `<strong>${cityName}</strong>`
                    }));
                } else {
                    alert("Город не найден. Проверьте правильность написания.");
                }
            }).catch(error => {
                console.error("Ошибка геокодирования:", error);
            });
        });

        zoomInButton.addEventListener("click", () => {
            let currentZoom = myMap.getZoom();
            myMap.setZoom(currentZoom + 1, { duration: 300 }); // Анимация
        });

        zoomOutButton.addEventListener("click", () => {
            let currentZoom = myMap.getZoom();
            myMap.setZoom(currentZoom - 1, { duration: 300 }); // Анимация
        });
    }





   
=======
ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map(
    "map",
    {
      center: [53.2818492739004, 69.38390624015832],
      zoom: 7,
    },
    {
      minZoom: 5,
      maxZoom: 23,
    }
  );

  let addedCitiesCoords = [];

  function getWeatherData(cityCoords, cityName) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cityCoords[0]}&lon=${cityCoords[1]}&units=metric&lang=ru&appid=077da3372a473e1ca741c926148d6387`
    )
      .then((response) => response.json())
      .then((weatherData) => {
        const temperature = Math.round(weatherData.main.temp);
        const feelsLike = Math.round(weatherData.main.feels_like);
        const weatherDescription = weatherData.weather[0].description;
        const windSpeed = weatherData.wind.speed;
        const humidity = weatherData.main.humidity;
        const pressure = weatherData.main.pressure;
        const icon = weatherData.weather[0].icon;

        const placemark = new ymaps.Placemark(
          cityCoords,
          {
            balloonContent: `
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 10px; max-width: 250px;">
                        <h3 style="margin: 5px 0;">${cityName}</h3>
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherDescription}" style="width: 80px; height: 80px; margin-bottom: 10px;">
                        <p style="margin: 5px 0; font-size: 14px; color: #333;">
                            <b>Температура:</b> ${temperature}°C<br>
                            <b>Ощущается как:</b> ${feelsLike}°C<br>
                            <b>Описание:</b> ${weatherDescription}<br>
                            <b>Ветер:</b> ${windSpeed} м/с<br>
                            <b>Влажность:</b> ${humidity}%<br>
                            <b>Давление:</b> ${pressure} гПа
                        </p>
                    </div>
                `,
            iconCaption: `${cityName}: ${temperature}°C`,
          },
          {
            preset: "islands#blueCircleIcon",
            iconCaptionMaxWidth: "200",
          }
        );

        myMap.geoObjects.add(placemark);
        addedCitiesCoords.push(cityCoords);
      })
      .catch((error) =>
        console.error("Ошибка получения данных о погоде:", error)
      );
  }

  function getCitiesData() {
    const zoomLevel = myMap.getZoom();
    const maxRows = zoomLevel > 10 ? 100 : 50;

    const bounds = myMap.getBounds();
    const southwest = bounds[0];
    const northeast = bounds[1];

    fetch(
      `http://api.geonames.org/searchJSON?featureClass=P&featureCode=PPLA&featureCode=PPLA2&featureCode=PPLA3&featureCode=PPLC&maxRows=${maxRows}&lang=ru&username=nagima&south=${southwest[0]}&north=${northeast[0]}&west=${southwest[1]}&east=${northeast[1]}`
    )
      .then((response) => response.json())
      .then((data) => {
        const largeCities = data.geonames.filter(
          (city) => city.population > 45000
        );

        largeCities.forEach((city) => {
          const cityCoords = [city.lat, city.lng];
          if (
            !addedCitiesCoords.some(
              (coord) =>
                coord[0] === cityCoords[0] && coord[1] === cityCoords[1]
            )
          ) {
            getWeatherData(cityCoords, city.name);
          }
        });
      })
      .catch((error) =>
        console.error("Ошибка получения данных о городах:", error)
      );
  }

  myMap.events.add("zoomchange", function () {
    myMap.geoObjects.removeAll();
    addedCitiesCoords = [];
    getCitiesData();
  });

  myMap.events.add("boundschange", function () {
    myMap.geoObjects.removeAll();
    addedCitiesCoords = [];
    getCitiesData();
  });

  getCitiesData();
}
>>>>>>> 85a4fa30b9ff2b63cc9c70e747dbc57d4d3c1c11
