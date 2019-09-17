var dataModule = (function(d3) {
    var getData = function(cb) {
        if (d3) {
            d3.json('./../data/data.json', (err,data) => {
                if (data){
                    console.log('data fetched');
                    cb(data)
                } else {
                    console.log('no data fetched');
                    cb(undefined);
                    throw Error('Unable to fetch data, an unexpected error occured', err);
                }
            });
        }
        else {
            console.log('d3 error');
            throw Error('D3 is not defined, cannot fetch the data');
        }
    }

    return {
        getGraphData: getData
    }
}(d3));