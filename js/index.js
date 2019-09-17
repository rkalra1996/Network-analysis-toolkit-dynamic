(function () {
    dataModule.getGraphData(function (data) {
        if (data) {
            console.log('data in index.js', data);

            // StartLoop(data.data);
        } else if (data === undefined) {
            console.log('An error occured while readingdata in the index.js')
        }
    })

    function StartLoop(dataToLoop) {
        let index = 0;
        let totalIterations = dataToLoop.length;

        let interval = window.setInterval(function () {
            console.log('printing', dataToLoop[index]);
            index += 1;
            if (index >= totalIterations) {
                // stop iterations
                console.log('sequence complete');
                window.clearInterval(interval);
                interval = undefined;
            }
        }, 5000)
    }
    var w = 300;
    var h = 300;
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    relationshipModule.createRelation({
        svgelem: svg,
        source: 2,
        target: 1,
        weight: 0.75,
        x1: 100,
        y1: 100,
        x2: 200,
        y2: 100
    });
    var i = 2;
    // setInterval(function () {
    //     var counter = i++;
    //     console.log(counter)
    //     counter = counter / 4;
    //     relationshipModule.createRelation({
    //         svgelem: svg,
    //         source: 2,
    //         target: 1,
    //         direction: 'OUT',
    //         weight: counter,
    //         x1: 100,
    //         y1: 100,
    //         x2: 200,
    //         y2: 100
    //     });
    // }, 3000)



})();