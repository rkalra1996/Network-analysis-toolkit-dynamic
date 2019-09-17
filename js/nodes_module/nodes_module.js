var nodeModule = (function (d3) {
    _createNode = (nodeDetails, svg) => {

        var svgContainer = svg;

        // this group contains the node and a mini node showing video status
        var group = svgContainer.append('g')
            .attr('transform', function (d, i) {
                return 'translate(0,0)';
            });

        // The main circle representing the node
        var circle = group.append("circle")
            .data([nodeDetails])
            .attr("cx", nodeDetails.x)
            .attr("cy", nodeDetails.y)
            .attr("r", 20 + (nodeDetails.cdoi / 100))
            .attr('fill', nodeDetails.ptype === 'H' ? '#f09ac3' : '#b693c4')
            .append('circle');

        // The mini circle which store the video status
        var miniCircle = group.append('circle')
            .attr('cx', nodeDetails.x + 18)
            .attr('cy', nodeDetails.y - 14)
            .attr('r', 5)
            .attr('fill', nodeDetails.vs ? 'green' : 'red');
    }

    return {
        createNode: _createNode
    }
}(d3));