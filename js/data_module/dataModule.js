var dataModule = (function (d3) {
    var createAxis = function (numNodes, radius, networkdata, centerX, centerY) {
        var width = (radius * 2),
            height = (radius * 2),
            angle,
            x,
            y,
            i;
        var flags = [];
        var yValues = [centerY];
        for (i = 0; i < numNodes; i++) {
            angle = (i / (numNodes / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
            // For a semicircle, we would use (i / numNodes) * Math.PI.
            if (flags[networkdata[i].pid]) {
                networkdata[i]["x"] = flags[networkdata[i].pid]["x"]
                networkdata[i]["y"] = flags[networkdata[i].pid]["y"]
                continue;
            }
            if (i == 0) {
                flags[networkdata[i]["pid"]] = {
                    "status": true,
                    "x": centerX - 20,
                    "y": centerY - 20
                }
                networkdata[i]["x"] = centerX - 20;
                networkdata[i]["y"] = centerY - 20
            } else {

                x = (radius * Math.cos(angle)) + (width / 2); // Calculate the x position of the element.
                y = (radius * Math.sin(angle)) + (width / 2); // Calculate the y position of the element.
                flags[networkdata[i].pid] = {
                    "status": true,
                    "x": x + radius * 2,
                    "y": y + radius / 2
                }
                networkdata[i]["x"] = x + radius * 2
                networkdata[i]["y"] = y + radius / 2
            }

        }
        return networkdata;
    }
    var circle = function (radius, steps, centerX, centerY, networkdata) {
        var flags = [],
            output = [];
        var yValues = [centerY];

        for (var i = 1; i <= steps; i++) {
            if (flags[networkdata[i - 1].pid]) {
                networkdata[i - 1]["x"] = flags[networkdata[i - 1].pid]["x"]
                networkdata[i - 1]["y"] = flags[networkdata[i - 1].pid]["y"]
                continue;
            }
            if (i == 1) {
                flags[networkdata[i - 1].pid] = {
                    "status": true,
                    "x": (centerX + radius * Math.cos(Math.PI * i / steps - Math.PI / 2)),
                    "y": (centerY + radius * Math.sin(Math.PI * i / steps - Math.PI / 2)) + 50 + i * 2
                }
                networkdata[i - 1]["x"] = centerX;
                networkdata[i - 1]["y"] = centerY;
            } else {
                flags[networkdata[i - 1].pid] = {
                    "status": true,
                    "x": (centerX + radius * Math.cos(Math.PI * i / steps - Math.PI / 2)),
                    "y": (centerY + radius * Math.sin(Math.PI * i / steps - Math.PI / 2)) + 50 + i * 2
                }
                networkdata[i - 1]["x"] = (centerX + radius * Math.cos(Math.PI * i / steps - Math.PI / 2));
                networkdata[i - 1]["y"] = yValues[i] = (centerY + radius * Math.sin(Math.PI * i / steps - Math.PI / 2)) + 5 * i * 2;
            }
        }
        return networkdata;
    }

    var getData = function (cb) {
        if (d3) {
            d3.json('./../data/data.json', (err, data) => {
                if (data) {
                    var originaldata = data.data;
                    originaldata = createAxis(originaldata.length, (window.innerHeight/3 - 50), originaldata, window.innerWidth / 2, window.innerHeight / 2)
                    // originaldata = circle(100, originaldata.length, window.innerWidth / 2, window.innerHeight / 2, originaldata)
                    console.log('data fetched');

                    cb(originaldata)
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