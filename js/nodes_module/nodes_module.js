var nodeModule = (function (d3) {
    _createNode = (nodeDetails, svg) => {

        var svgContainer = svg;

        // check if the node is already present and update it , else create a new group
         var group = svgContainer.select(`[id="${nodeDetails.pid}_group"]`);
         
         if (group._groups[0][0] == undefined) {
             // it is a new group, create it
            group = svgContainer
            .append('g')
            .attr('id', nodeDetails.pid + '_group')
            .attr('transform', function (d, i) {
                    return 'translate(0,0)';
                });
         }


        var circle = group.select(`[id="${nodeDetails.pid}"]`)._groups[0][0] !== undefined ? group.select(`[id="${nodeDetails.pid}"]`) : group.append('circle').attr('id', nodeDetails.pid);
        var miniCircle = group.select(`[id="${nodeDetails.pid}_mini"]`)._groups[0][0] !== undefined ? group.select(`[id="${nodeDetails.pid}_mini"]`) : group.append('circle').attr('id', nodeDetails.pid + '_mini');
          
        // The main circle representing the node
        circle
            .data([nodeDetails])
            .attr("cx", nodeDetails.x)
            .attr("cy", nodeDetails.y)
            .attr("r", 20 + (nodeDetails.cdoi / 100))
            .attr('fill', nodeDetails.ptype === 'H' ? '#f09ac3' : '#b693c4')
            .append('circle');

        // The mini circle which store the video status
        miniCircle
            .attr('cx', nodeDetails.x + 18)
            .attr('cy', nodeDetails.y - 14 -(nodeDetails.cdoi / 100))
            .attr('r', 5)
            .attr('fill', nodeDetails.vs ? 'green' : 'red');
    }

    return {
        createNode: _createNode
    }
}(d3));