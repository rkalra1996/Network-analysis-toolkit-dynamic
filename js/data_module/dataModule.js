var dataModule = (function (d3) {
    var circle = function (radius, steps, centerX, centerY, networkdata) {

        var yValues = [centerY];

        for (var i = 1; i <= steps; i++) {
            if (i == 1) {
                networkdata[i - 1]["x"] = centerX;
                networkdata[i - 1]["y"] = centerY;
            } else {
                networkdata[i - 1]["x"] = (centerX + radius * Math.cos(Math.PI * i / steps - Math.PI / 2));
                networkdata[i - 1]["y"] = yValues[i] = (centerY + radius * Math.sin(Math.PI * i / steps - Math.PI / 2));
            }
        }
        return networkdata;
    }
    var filterdata = function (data) {
        var flags = [],
            output = [],
            l = data.length,
            i;
        for (i = 0; i < l; i++) {
            if (flags[data[i].pid]) continue;
            flags[data[i].pid] = true;
            output.push(data[i]);
        }
        return output
    }
    var getData = function (cb) {
        if (d3) {
            d3.json('./../data/data.json', (err, data) => {
                if (data) {
                    var modifieddata = data.data;
                    modifieddata = filterdata(modifieddata)
                    modifieddata = circle(100, modifieddata.length, window.innerWidth / 2, window.innerHeight / 2, modifieddata)
                    console.log('data fetched');

                    cb(modifieddata)
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