var nodeModule = (function (d3) {

    var toolTipp = d3.select('#graphContainer')
                        .append('div')
                        .attr('id', 'tooltipContainer')
                        .style('display', 'none')
                        .classed('toolTip', true)
                        .append('div')
                        .attr('id','tooltip');

    var _tooltipTemplate = function(data) {
        return `<div class="container">
                    <div class="row">
                        <p class="rowName">Name</p>
                        <p class="rowValue">${data.pname}</p>
                    </div>
                    <div class="row">
                        <p class="rowName">Type</p>
                        <p class="rowValue">${data.ptype}</p>
                    </div>
                    <div class="row">
                        <p class="rowName">Gender</p>
                        <p class="rowValue">${data.gender}</p>
                    </div>
                    <div class="row">
                        <p class="rowName">Tone</p>
                        <p class="rowValue">${data.tone}</p>
                    </div>
                </div>`;
    }

    var _recursive_transitions = function(selection, selectionData) {
        selectionData = selection.data()[0];
        let totalFlickerValue = selectionData.ci_graph;

        // if the node hasn't interacted, it should not flicker
        if (selectionData.ia !== -1) {
            selection
            .transition()
            .duration(1000 / totalFlickerValue)
            .attr("stroke-width", 2)
            .attr("r", 15)
            .transition()
            .duration(1000 / totalFlickerValue)
            .attr("stroke-width", 3)
            .attr("r", selectionData.original_radius)
            .on("end", _recursive_transitions.bind(null,selection, selectionData));
        }
    }

    var _startFlicker = function(circle, miniCircle, data){
        // preserve the original radius
        circle.data()[0]['original_radius'] = circle.attr('r');
        _recursive_transitions(circle, data);
    }

    var _createNode = function(nodeDetails, svg)  {

        var svgContainer = svg;

        // check if the node is already present and update it , else create a new group
         var group = svgContainer.select(`[id="${nodeDetails.pid}_group"]`);
         
         // check if a new group is needed
         if (group._groups[0][0] == undefined) {
             // it is a new group, create it
            group = svgContainer
            .append('g')
            .attr('id', nodeDetails.pid + '_group')
            .attr('transform', function (d, i) {
                    return 'translate(0,0)';
                });
         }

         //check if a new circle is needed
        var circle = group.select(`[id="${nodeDetails.pid}"]`)._groups[0][0] !== undefined ? group.select(`[id="${nodeDetails.pid}"]`) : group.append('circle').attr('id', nodeDetails.pid);
        // check if a minicircle is needed
        var miniCircle = group.select(`[id="${nodeDetails.pid}_mini"]`)._groups[0][0] !== undefined ? group.select(`[id="${nodeDetails.pid}_mini"]`) : group.append('circle').attr('id', nodeDetails.pid + '_mini');
        // The main circle representing the node
        circle
            .data([nodeDetails])
            .attr("cx", nodeDetails.x)
            .attr("cy", nodeDetails.y)
            .attr("r", 20 + (nodeDetails.cdoi / 100))
            .attr('fill', nodeDetails.ptype === 'H' ? '#f09ac3' : '#b693c4')
            .on('mouseover', function(d){
                toolTipp.html(_tooltipTemplate(d))
                
                d3.select('#tooltipContainer')
                    .style('display', 'block')
                    .style('z-index', 10)
                    .style('position', 'absolute')
                    .style('left', d3.event.x + 30 + 'px')
                    .style('top', d3.event.y + 'px');
            })
            .on('mouseout', function(d){
                d3.select('#tooltipContainer')
                    .style('display', 'none');
            })
            .append('circle');

        // The mini circle which store the video status
        miniCircle
            .attr('cx', nodeDetails.x + 18)
            .attr('cy', nodeDetails.y - 14 -(nodeDetails.cdoi / 100))
            .attr('r', 5)
            .attr('fill', nodeDetails.vs ? 'green' : 'red');
        // add the flicker basis its graph interaction
        _startFlicker(circle,miniCircle,nodeDetails)
    }

    return {
        createNode: _createNode
    }
}(d3));