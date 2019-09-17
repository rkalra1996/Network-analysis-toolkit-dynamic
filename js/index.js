(function () {
    var w = "100%";
    var h = "100%";
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    dataModule.getGraphData(function (data) {
        if (data) {
            console.log('data in index.js', data);

            // create first node
            nodeModule.createNode(data[0], svg);
            nodeModule.createNode(data[8], svg);
            relationshipModule.createRelation({
                svgelem: svg,
                weight: 0.75,
                x1: data[0].x,
                y1: data[0].y,
                x2: data[8].x,
                y2: data[8].y
            });
            
            /* relationshipModule.createRelation({
                svgelem: svg,
                weight: 0.75,
                x1: 100,
                y1: 100,
                x2: 200,
                y2: 100
            }); */

            // StartLoop(data.data);
        } else if (data === undefined) {
            console.log('An error occured while readingdata in the index.js')
        }
    })

    function StartLoop(dataToLoop, intervalTimeout = 5000) {
        let index = 0;
        let totalIterations = dataToLoop.length;

        let interval = window.setInterval(function(){
            console.log('printing', dataToLoop[index]);
            index += 1;
            if (index >= totalIterations) {
                // stop iterations
                console.log('sequence complete');
                window.clearInterval(interval);
                interval = undefined
            }
        }, intervalTimeout)
    }
})();
