(function(){

    dataModule.getGraphData(function(data) {
        if (data) {
            console.log('data in index.js', data);
        }
        else if (data === undefined) {
            console.log('An error occured while readingdata in the index.js')
        }
    })
})();