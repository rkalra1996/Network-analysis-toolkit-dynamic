var dataModule = (function (d3) {
    var circle = function (radius, steps, centerX, centerY, networkdata) {
        var xValues = [centerX];
        var yValues = [centerY];
        for (var i = 1; i < steps; i++) {
            networkdata[i - 1]["x"] = (centerX + radius * Math.cos(Math.PI * i / steps - Math.PI / 2));
            networkdata[i - 1]["y"] = yValues[i] = (centerY + radius * Math.sin(Math.PI * i / steps - Math.PI / 2));
        }
        console.log(networkdata);
        return networkdata;
    }
    var getData = function (cb) {
        if (d3) {
            d3.json('./../data/data.json', (err, data) => {
                if (data) {
                    data = circle(20, data.data.length, 200, 200, data.data)
                    console.log('data fetched');

                    cb(data)
                } else {
                    console.log('no data fetched');
                    cb(undefined);
                    throw Error('Unable to fetch data, an unexpected error occured', err);
                }
            });
        } else {
            console.log('d3 error');
            throw Error('D3 is not defined, cannot fetch the data');
        }
    }

    return {
        getGraphData: getData
    }
}(d3));