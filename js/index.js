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

            // set the click event on the button
            document.getElementById('startBtn').addEventListener('click', function($event){
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

    function StartLoop(dataToLoop, intervalTimeout = 5000) {
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
                return;
            }
            nodeModule.createNode(dataToLoop[index], svg);
            sliderModule.moveSlider(index);
            toolbarModule.updateNodeDetails(dataToLoop[index])
            if (dataToLoop[index].ia !== null && dataToLoop[index].ia !== -1) {
                // a relationship is needed
                let previousData = dataToLoop[index - 1];

                relationshipModule().createRelation({
                    svgelem: svg,
                    weight: dataToLoop[index].ci_no,
                    x1: dataToLoop[index].x,
                    y1: dataToLoop[index].y,
                    x2: previousData.x,
                    y2: previousData.y
                });
            }
        }, intervalTimeout)
    }
})(d3);