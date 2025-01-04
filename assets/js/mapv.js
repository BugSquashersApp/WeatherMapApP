
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





   