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


            /* relationshipModule.createRelation({
                svgelem: svg,
                weight: 0.75,
                x1: 100,
                y1: 100,
                x2: 200,
                y2: 100
            }); */

            StartLoop(data);
        } else if (data === undefined) {
            console.log('An error occured while readingdata in the index.js')
        }
    })

    function StartLoop(dataToLoop, intervalTimeout = 5000) {
        let index = 0;
        let totalIterations = dataToLoop.length;

        let interval = window.setInterval(function () {
            nodeModule.createNode(dataToLoop[index], svg);

            if (dataToLoop[index].ia !== null && dataToLoop[index].ia !== -1) {
                // a relationship is needed
                let previousData = dataToLoop[index - 1];
                relationshipModule.createRelation({
                    svgelem: svg,
                    weight: 0.75,
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
})();