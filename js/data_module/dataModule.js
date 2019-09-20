var dataModule = (function (d3) {


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

    var createAxis = function (numNodes, radius, networkdata, contwidth, contheight) {
        var centerX = contwidth / 2;
        var centerY = contheight / 2;
        var width = contwidth,
            height = contheight,
            angle,
            x,
            y,
            i;
        var flags = [];

        // set uniform distributed angle
        // let uniqueNodes = filterdata(networkdata);
        // uniqueNodes = uniqueNodes.length;


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

                x = Math.round(width / 2 + radius * Math.cos(angle) - 20);
                y = Math.round(height / 2 + radius * Math.sin(angle) - 20);
                // x = (radius * Math.cos(angle)) + (width / 2); // Calculate the x position of the element.
                // y = (radius * Math.sin(angle)) + (width / 2); // Calculate the y position of the element.
                flags[networkdata[i].pid] = {
                    "status": true,
                    "x": x,
                    "y": y
                }
                networkdata[i]["x"] = x;
                networkdata[i]["y"] = y;
            }
        }
        return networkdata;
    }
    
    var getData = function (cb) {
        if (d3) {
            d3.json('./../data/pharma.json', (err, data) => {
                if (data) {
                    var originaldata = data.data;//17
                    // var dataForAxis = filterdata(originaldata);//
                    originaldata = createAxis(originaldata.length, ($("#graphContainer").height() / 2.5), originaldata, ($("#graphContainer").width()), ($("#graphContainer").height()))
                    // originaldata = circle(100, originaldata.length, window.innerWidth / 2, window.innerHeight / 2, originaldata)
                    console.log('data fetched');
                    // merge data to add coordinates
                    // let x =Object.assign({}, originaldata,dataForAxis)
                    console.log(originaldata);
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