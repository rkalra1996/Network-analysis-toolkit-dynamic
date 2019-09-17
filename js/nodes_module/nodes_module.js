var nodeModule = (function(d3) {
    _createNode = (nodeDetails, isFirst=false) => {
        
    var svgContainer = d3.select("svg")
    var circle = svgContainer.append("circle")
                                 .data([nodeDetails])
                                 .attr("cx", nodeDetails.x)
                                 .attr("cy", nodeDetails.y)
                                 .attr("r", 20)
                                 .attr('fill', isFirst ? 'blue' : 'orange')
    
    }

    return {
        createNode : _createNode
    }
  }(d3));