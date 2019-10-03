var dataModule = (function (d3) {

    var videoInfo;
    var graphHubID;
    var graphHub;
    var varConfig = variablesConfig;

    function _getVideoInfoInDB() {
        return videoInfo;
    }
    function _storeVideoInfo(dataToStore) {
        videoInfo = dataToStore;
    }


    function _getDataFromId(videIdToFetch, dataToUse) {
        // the function will return the data object or -1
        console.log('video to fetch is', videIdToFetch);
        console.log('data to use is ', dataToUse);

        let fetchedVideo = dataToUse.videos.filter(function (filter) {
            return filter.id == videIdToFetch;
        });

        if (fetchedVideo.length !== 0) {
            return fetchedVideo;
        } else {
            // alert('invalid or non existent video id provided');
            return -1;
        }
    }
    var reduceSumCiGraph = function (data) {

        var cum_grphno;
        var cum_cdoi;
        data.forEach((element, i) => {

            if (i == 0) {
                cum_grphno = parseInt(element.ci_graph);
                cum_cdoi = parseInt(element.cdoi);
            } else if (element.ptype.toLowerCase() == varConfig.HUB) {
                cum_grphno = cum_grphno + 1;
                cum_cdoi = cum_cdoi + parseInt(element.cdoi);
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

    var _getGraphHubID = function () {
        return graphHubID;
    }

    var _getGraphHub = function () {
        return graphHub;
    }
    // update the hub id for the complete data
    var _updateHubsForGraph = function (graphData) {
        // find the first hub and store its id

        graphHub = graphData.find(function (node) {
            return node.ptype.toLowerCase() == varConfig.HUB
        });
        if (graphHub) {
            console.log(graphHub);

            graphHubID = graphHub.pid;
        } else {
            // alert('Error : There is no hub present in the graph, please load a correct dataset');
            console.log("it appears there is no hub in the database, application won't run properly");
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
                uniqueNodes[i]["x"] = centerX - 20;
                uniqueNodes[i]["y"] = centerY - 20
            } else {
                // no new coordinates to another node of type 'hub' is allowed to sit in graph
                if (uniqueNodes[i].ptype.toLowerCase() == varConfig.HUB && !!flags[uniqueNodes[i]["ptype"].toLowerCase()]) {
                    // set coordinates of original hub
                    x = flags[uniqueNodes[i]["ptype"].toLowerCase()].x
                    y = flags[uniqueNodes[i]["ptype"].toLowerCase()].y
                }else{
                    x = Math.round(width / 2 + radius * Math.cos(angle) - 20);
                    y = Math.round(height / 2 + radius * Math.sin(angle) - 20);
                }

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

    function _fetchVideoDetails(videoData) {
        if (Array.isArray(videoData) && videoData.length) {
            let videoObj = [];
            videoData.forEach(function(video){
                let id = video.id;
                let name = video.vname;

                videoObj.push({id,name});
            });
            _storeVideoInfo(videoObj);
        }
        return [];
    }

    var getData = function (video_id, graphContainerHeight, graphContainerWidth, cb) {
        console.log('video id recieved is ', video_id);
        if (d3) {
            d3.json('./../../data/multiple_videos.json', (err, data) => {
                if (data) {
                    // store the video details in the variable to be used by dropdown
                    _fetchVideoDetails(data.videos)
                    // check for the video id needed and its relevant data

                    let fetchedData = _getDataFromId(video_id, data);

                    if (fetchedData !== -1) {
                        var originaldata = fetchedData[0].data;

                        originaldata = reduceSumCiGraph(originaldata)
                        console.log("whole data: ", originaldata)

                        // set appropriate variables
                        let gcHeight = graphContainerHeight;
                        let gcWidth = graphContainerWidth;
                        let centerPoint = (gcHeight/2.5);
                        // var dataForAxis = filterdata(originaldata);
                        originaldata = createAxis(originaldata.length, centerPoint, originaldata, gcWidth, gcHeight)
                        console.log('data fetched');
                        // set the video details
                        let dataForCurrentVideo = {
                            name: fetchedData[0].vname,
                            duration: fetchedData[0].vduration,
                            // hubs: fetchedData[0].vhubs,
                            heldOn: fetchedData[0].vheldOn,
                            id: fetchedData[0].id
                        };
                        
                        toolbarModule.updateVideDetails(dataForCurrentVideo)
                        
                        cb(originaldata)
                    } else {
                        console.log('will not proceed unless correct video id is passed in the query string');
                        // hide the start button
                        $('#startBtn').css('display', 'none');
                        // display relevant error message in the video details container
                        $('.video-details2 > .container > .dropdown > .title').text('Video ID Invalid or missing')
                        $('#initialText > h3').text('No Information available to analyze');
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
        getGraphHub: _getGraphHub,
        getVideoInfo: _getVideoInfoInDB
    }
}(d3));