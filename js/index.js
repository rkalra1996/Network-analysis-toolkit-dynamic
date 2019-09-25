(function (d3) {
    var w = $("#graphContainer").width();
    var h = $("#graphContainer").height();
    var svg = d3.select("#graphContainer")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var videoID = urlHandler.videoIdToLoad;

    dataModule.getGraphData(videoID, function (data) {
        if (data) {
            sliderModule.setSlider(data);
            // update the data sequence for hubs
            dataModule.updateHubs(data);

            // set the click event on the button
            document.getElementById('startBtn').addEventListener('click', function ($event) {
                // remove the node details initially
                let coreEl = $('.node-details');
                coreEl.css('opacity', 0);
                // activate the svg and remove the text message display...
                d3.select('.initialText')
                    .style('display', 'none');
                //start the sequence
                d3.selectAll("svg > *").remove();
                sliderModule.moveSlider(0);
                StartLoop(data);
            });

        } else if (data === undefined) {
            console.log('An error occured while readingdata in the index.js')
        }
    })

    function _scrollToBottom(container) {
        $(`.${container}`).css('display', 'block');
        let pos = $(`.${container}`).offset().top;
        $('body, html').animate({
            scrollTop: pos
        });
    }

    function StartLoop(dataToLoop, intervalTimeout = 2000) {
        let index = -1;
        let totalIterations = dataToLoop.length;

        let interval = window.setInterval(function () {
            index += 1;

            if (index >= totalIterations) {
                // stop iterations
                console.log('sequence complete');
                toolbarModule.updateNodeDetails(-1);
                window.clearInterval(interval);
                interval = undefined;
                // scroll to images
                $(`#imageContainer_${+urlHandler.videoIdToLoad + 1}`).css('display', 'block');
                _scrollToBottom('imageSection');
                return;
            }
            nodeModule.createNode(dataToLoop[index], svg);
            sliderModule.moveSlider(index);
            toolbarModule.updateNodeDetails(dataToLoop[index])

            if (dataToLoop[index].ia !== null && dataToLoop[index].ia !== -1) {
                let currentNode;
                let previousData;

                // if the current node is hub and already a hub is present, then point the current hubs out relation from main hub
                //&& dataToLoop[index].pid !== dataModule.getGraphHubID()
                
                /* if (dataToLoop[index - 1].ptype.toLowerCase() == 'hub' && dataToLoop[index].ptype.toLowerCase().includes('hub')) {
                    // currentNode = dataModule.getGraphHub();
                    // previousData = dataToLoop[ index- 1 ];
                    // increase the radius of main hub
                    let mainHub = dataModule.getGraphHub();

                    nodeModule.increaseRadius(mainHub, dataToLoop[index]);
                    return;
                    // else if current node's previous node is a hub which is not a main hub, then point the currentnode's out relation to main hub
                }
                // else it is a node which is not pointing to any hub other than main hub or not pointing to any hub
                else if (dataToLoop[index - 1].ptype.toLowerCase().includes('hub') && dataToLoop[index].ptype.toLowerCase() !== 'hub') {
                    currentNode = dataToLoop[index];

                    previousData = dataModule.getGraphHub();
                    relationshipModule().createRelation({
                        svgelem: svg,
                        weight: dataToLoop[index].ci_no,
                        x1: currentNode.x,
                        y1: currentNode.y,
                        x2: previousData.x,
                        y2: previousData.y
                    });

                } else if (dataToLoop[index].ptype.toLowerCase().includes('hub') && dataToLoop[index - 1].ptype.toLowerCase() !== 'hub') {
                    previousData = dataToLoop[index - 1];

                    currentNode = dataModule.getGraphHub();
                    relationshipModule().createRelation({
                        svgelem: svg,
                        weight: dataToLoop[index].ci_no,
                        x1: currentNode.x,
                        y1: currentNode.y,
                        x2: previousData.x,
                        y2: previousData.y
                    });
                } else {
                    currentNode = dataToLoop[index];
                    previousData = dataToLoop[index - 1];
                    relationshipModule().createRelation({
                        svgelem: svg,
                        weight: dataToLoop[index].ci_no,
                        x1: currentNode.x,
                        y1: currentNode.y,
                        x2: previousData.x,
                        y2: previousData.y
                    });

                } */

                currentNode = dataToLoop[index];
                previousData = dataToLoop[index - 1];
                relationshipModule().createRelation({
                    svgelem: svg,
                    weight: dataToLoop[index].ci_no,
                    x1: currentNode.x,
                    y1: currentNode.y,
                    x2: previousData.x,
                    y2: previousData.y
                });

            }
        }, intervalTimeout)
    }
})(d3);