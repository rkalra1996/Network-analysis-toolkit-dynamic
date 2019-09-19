(function (d3) {
    var w = $("#graphContainer").width();
    // var h = $("#graphContainer").height();
    var h = '600px';
    var svg = d3.select("#graphContainer")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    dataModule.getGraphData(function (data) {
        if (data) {
            sliderModule.setSlider(data);

            // set the click event on the button
            document.getElementById('startBtn').addEventListener('click', function($event){
                //start the sequence
                d3.selectAll("svg > *").remove();
                sliderModule.moveSlider(0);
                StartLoop(data);
            });

        } else if (data === undefined) {
            console.log('An error occured while readingdata in the index.js')
        }
    })

    function StartLoop(dataToLoop, intervalTimeout = 1000) {
        let index = 0;
        let totalIterations = dataToLoop.length;

        let interval = window.setInterval(function () {
            nodeModule.createNode(dataToLoop[index], svg);
            sliderModule.moveSlider(index);

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

            index += 1;

            if (index >= totalIterations) {
                // stop iterations
                console.log('sequence complete');
                window.clearInterval(interval);
                interval = undefined
            }
        }, intervalTimeout)
    }
})(d3);