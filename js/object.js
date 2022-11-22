function buildObj() {
    const DATA = counties.features;
    var obj = {
        "features":[
            { // Index: 0
                "year": "1980", 
                "counties": []
            },
            { // 1
                "year": "1985", 
                "counties": []
            },
            { // 2
                "year": "1990", 
                "counties": []
            },
            { // 3
                "year": "1995", 
                "counties": []
            },
            { // 4
                "year": "2000", 
                "counties": []
            },
            { // 5
                "year": "2005", 
                "counties": []
            },
            { // 6
                "year": "2010", 
                "counties": []
            },
            { // 7
                "year": "2015", 
                "counties": []
            }
        ]
    }

    // START BUILD
    for(var i = 0; i < DATA.length; i++) {
        var feature = DATA[i].properties;

        if (feature.Year >= 1980 && feature.Year < 1985)
            addTo(feature, 0);
        else if (feature.Year >= 1985 && feature.Year < 1990)
            addTo(feature, 1);
        else if (feature.Year >= 1990 && feature.Year < 1995)
            addTo(feature, 2);
        else if (feature.Year >= 1995 && feature.Year < 2000)
            addTo(feature, 3);
        else if (feature.Year >= 2000 && feature.Year < 2005)
            addTo(feature, 4);
        else if (feature.Year >= 2005 && feature.Year < 2010)
            addTo(feature, 5);
        else if (feature.Year >= 2010 && feature.Year < 2015)
            addTo(feature, 6);
        else if (feature.Year >= 2015 && feature.Year <= 2020)
            addTo(feature, 7);
    }

    function addTo(feature, index) { // Add feature to index
        const countyArr = obj.features[index].counties;

        if(countyArr.length === 0) {
            var countyObj = {};
            countyObj.countyName = feature.County;
            countyObj.yield = feature["Yield(Unit/Acre)"];
            countyObj.price = feature["Price(Dollars/Unit)"];
            countyArr.push(countyObj);
        } else {
            // undefined if no county found - else will be existing county object
            var existingCounty = undefined;

            // loop through county array to check if already added
            for(var i = 0; i < countyArr.length; i++) {
                let c = countyArr[i];
                if(c.countyName === feature.County) {
                    existingCounty = c;
                    break;
                }
            }

            if(existingCounty) {
                var yield = Number(feature["Yield(Unit/Acre)"]);
                var price = Number(feature["Price(Dollars/Unit)"]);

                // Check if data is valid - otherwise don't add
                if(!isNaN(yield)) {
                    existingCounty.yield = (Number(existingCounty.yield) + yield).toFixed(2);
                }
                if(!isNaN(price)) {
                    existingCounty.price = (Number(existingCounty.price) + price).toFixed(2);
                }
            } else {
                var countyObj = {};
                countyObj.countyName = feature.County;
                countyObj.yield = feature["Yield(Unit/Acre)"];
                countyObj.price = feature["Price(Dollars/Unit)"];
                countyArr.push(countyObj);
            }
        }
    }
    return obj;
}

console.log(buildObj());