(function(){

    dataModule.getGraphData(function(data) {
        if (data) {
            console.log('data in index.js', data);

            // StartLoop(data.data);
        }
        else if (data === undefined) {
            console.log('An error occured while readingdata in the index.js')
        }
    })

    function StartLoop(dataToLoop) {
        let index = 0;
        let totalIterations = dataToLoop.length;

        let interval = window.setInterval(function(){
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
})();