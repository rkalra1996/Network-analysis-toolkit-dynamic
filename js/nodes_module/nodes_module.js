var nodeModule = (function(d3) {
    _createNode = (nodeDetails) => {
        
    var svgContainer = d3.select("body").append("svg");
    
    var circle = svgContainer.append("circle")
                                 .attr("cx", 30)
                                 .attr("cy", 30)
                                .attr("r", 20);
    
    }

    return {
        createNode : _createNode
    }
  }(d3));