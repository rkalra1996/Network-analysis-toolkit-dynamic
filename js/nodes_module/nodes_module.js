var nodeModule = (function(d3) {
    _createNode = (nodeDetails, isFirst=false) => {
        
    var svgContainer = d3.select("svg")

    var group = svgContainer.append('g')
                .attr('transform', function(d,i) {
                    return 'translate(0,0)';
                });

    var circle = group.append("circle")
                                 .data([nodeDetails])
                                 .attr("cx", nodeDetails.x)
                                 .attr("cy", nodeDetails.y)
                                 .attr("r", 20)
                                 .attr('fill', nodeDetails.ia === null ? 'lightblue' : 'orange')
                                 .append('circle');

    var miniCircle = group.append('circle')
        .attr('cx', nodeDetails.x+18)
        .attr('cy', nodeDetails.y-14)
        .attr('r', 5)
        .attr('fill', nodeDetails.vs ? 'green' : 'red')

    
    }

    return {
        createNode : _createNode
    }
  }(d3));