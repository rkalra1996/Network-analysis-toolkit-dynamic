var dataModule = (function (d3) {


    function _getDataFromId(videIdToFetch, dataToUse) {
        // the function will return the data object or -1
        console.log('video to fetch is', videIdToFetch);
        console.log('data to use is ', dataToUse);

        let fetchedVideo = dataToUse.videos.filter(function (filter) {
            return filter.id == videIdToFetch;
        });

        if (fetchedVideo.length !== undefined) {
            return fetchedVideo;
        } else {
            // alert('invalid or non existent video id provided');
            return 0;
        }
    }
    var reduceSumCiGraph = function (data) {

        var cum_grphno;
        var cum_cdoi;
        data.forEach((element, i) => {

            if (i == 0) {
                cum_grphno = parseInt(element.ci_graph);
                cum_cdoi = parseInt(element.cdoi);
            } else if (element.ptype.toLowerCase() == "hub") {
                cum_grphno = cum_grphno + 1;
                cum_cdoi = cum_cdoi + element.cdoi;
                element.ci_graph = cum_grphno / 2
                element.cdoi = cum_cdoi;
            }
        });
        return data;

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

    var graphHubID;
    var graphHub;

    var _getGraphHubID = function () {
        return graphHubID;
    }

    var _getGraphHub = function () {
        return graphHub;
    }
    // update the hub id for the complete data
    var _updateHubsForGraph = function (graphData) {
        // find the first hub and store its id
        // update all other hubs with the id to be the first hub id
        // update the participants ia number pointing to any hub to now point to first hub id

        graphHub = graphData.find(function (node) {
            return node.ptype.toLowerCase() == 'hub'
        });
        if (graphHub) {
            console.log(graphHub);

            graphHubID = graphHub.pid;
        } else {
            // alert('Error : There is no hub present in the graph, please load a correct dataset');
        }
    }


    var _filterUniqueNodes = function (dataToFilter) {
        return filterdata(dataToFilter)
    }


    function merge(a, b, prop) {
        var reduced = a.filter(function (aitem) {
            return !b.find(function (bitem) {

                if (aitem[prop] === bitem[prop]) {

                    aitem['x'] = bitem['x'];
                    aitem['y'] = bitem['y'];
                };

                return aitem[prop] === bitem[prop];
            });
        });
        return a;
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
        var flags = {};

        // set uniform distributed angle
        // let uniqueNodes = filterdata(networkdata);
        // uniqueNodes = uniqueNodes.length;

        // to find out exactly how many nodes needed to place and set their coordinates
        let uniqueNodes = _filterUniqueNodes(networkdata)
        // set coordinates
        numNodes = uniqueNodes.length;

        for (i = 0; i < numNodes; i++) {

            angle = (i / (numNodes / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
            // For a semicircle, we would use (i / numNodes) * Math.PI.
            if (flags[uniqueNodes[i].pid]) {
                uniqueNodes[i]["x"] = flags[uniqueNodes[i].pid]["x"]
                uniqueNodes[i]["y"] = flags[uniqueNodes[i].pid]["y"]
                continue;
            }
            if (i == 0) {
                // assuming that the first node is ALWAYS 'hub'
                flags[uniqueNodes[i]["pid"]] = {
                    "status": true,
                    "x": centerX - 20,
                    "y": centerY - 20
                }
                flags[uniqueNodes[i]["ptype"].toLowerCase()] = {
                    "x": centerX - 20,
                    "y": centerY - 20
                }
                debugger;
                uniqueNodes[i]["x"] = centerX - 20;
                uniqueNodes[i]["y"] = centerY - 20
            } else {
                // no new coordinates to another node of type 'hub' is allowed to sit in graph
                if (uniqueNodes[i].ptype.toLowerCase() == 'hub' && !!flags[uniqueNodes[i]["ptype"].toLowerCase()]) {
                    // set coordinates of original hub
                    x = flags[uniqueNodes[i]["ptype"].toLowerCase()].x
                    y = flags[uniqueNodes[i]["ptype"].toLowerCase()].y
                }else{
                    x = Math.round(width / 2 + radius * Math.cos(angle) - 20);
                    y = Math.round(height / 2 + radius * Math.sin(angle) - 20);
                }
               
                // x = (radius * Math.cos(angle)) + (width / 2); // Calculate the x position of the element.
                // y = (radius * Math.sin(angle)) + (width / 2); // Calculate the y position of the element.
                flags[uniqueNodes[i].pid] = {
                    "status": true,
                    "x": x,
                    "y": y
                }
                uniqueNodes[i]["x"] = x;
                uniqueNodes[i]["y"] = y;
            }
        }
        // set the defined nodes to all the duplicates
        var mergedData = merge(networkdata, uniqueNodes, 'pid');
        return mergedData;
    }

    var getData = function (video_id, cb) {
        console.log('video id recieved is ', video_id);
        if (d3) {
            d3.json('./../../data/multiple_videos.json', (err, data) => {
                if (data) {
                    // check for the video id needed and its relevant data

                    let fetchedData = _getDataFromId(video_id, data);

                    if (fetchedData !== -1) {
                        var originaldata = fetchedData[0].data; //17
                        originaldata = reduceSumCiGraph(originaldata)
                        console.log("whole data: ", originaldata)
                        // var dataForAxis = filterdata(originaldata);//
                        originaldata = createAxis(originaldata.length, ($("#graphContainer").height() / 2.5), originaldata, ($("#graphContainer").width()), ($("#graphContainer").height()))
                        console.log('data fetched');
                        // set the video details
                        toolbarModule.updateVideDetails({
                            name: fetchedData[0].vname,
                            duration: fetchedData[0].vduration,
                            // hubs: fetchedData[0].vhubs,
                            heldOn: fetchedData[0].vheldOn
                        })
                        cb(originaldata)
                    } else {
                        console.log('will not proceed unless correct video id is passed in the query string');
                        // hide the start button
                        $('#startBtn').css('display', 'none');
                        $('#initialText > h3').text('No Information available to analyse');
                    }
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
        getGraphData: getData,
        updateHubs: _updateHubsForGraph,
        getGraphHubID: _getGraphHubID,
        getGraphHub: _getGraphHub
    }
}(d3));