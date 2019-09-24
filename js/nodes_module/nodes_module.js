var nodeModule = (function (d3) {

    var HUB_COI = {

    }

    var colorCodes = {
        hubColor: '#1f77b4',
        spokeColor: '#ff7f0e',
        activeColor: '',
        videoStatusOnColor: '#4CAF50',
        videoStatusOffColor: 'red'
    }

    var increaseRadius = function (hub, currentNode) {

        // HUB_COI[hub.pid] = hub.cdoi;
        // HUB_COI[currentNode.pid] = currentNode.cdoi;
        // 
        // // objectSum()

        // let temp = Object.values(HUB_COI).reduce(function (a, c) {
        //     return a + c;
        // });
        // console.log("hub obj", HUB_COI);
        // console.log("total", temp)
        
        var temp = currentNode.cdoi;
        temp = temp / 150;

        console.log("sum", temp)
        let Circle = d3.select(`[id="${hub.pid}"]`);

        Circle.data()[0].original_radius = temp;
        Circle.data()[0].ci_graphdata = currentNode.ci_graph;

        Circle.attr('r', temp);
    }


    var _recursive_transitions = function (selection, selectionData) {

        selectionData = selection.data()[0];
        var totalFlickerValue
        if (selectionData.ptype.toLowerCase() == "hub") {

            totalFlickerValue = parseFloat(selectionData.ci_graphdata);
            console.log("hub ci graph", selectionData.ptype, selectionData.ci_graphdata)

        } else {
            totalFlickerValue = parseFloat(selectionData.ci_graph);
        }
        totalFlickerValue = totalFlickerValue / 2
        
        // if the node hasn't interacted, it should not flicker
        if (selectionData.ia !== -1) {
            selection
                .transition()
                .duration(1000 / totalFlickerValue)
                .attr("stroke-width", 2)
                .attr("r", selectionData.original_radius)
                .transition()
                .duration(1000 / totalFlickerValue)
                .attr("stroke-width", 3)
                .attr("r", parseInt(selectionData.original_radius) + 5)
                .on("end", _recursive_transitions.bind(null, selection, selectionData));


        }
    }

    function _startFlicker(circle, miniCircle, data) {
        // preserve the original radius
        
        circle.data()[0]['original_radius'] = circle.attr('r');
        _recursive_transitions(circle, data);
    }

    var _renderToGraph = function (circle, activeCircle, miniCircle, nodeDetails) {
        

        circle
            .data([nodeDetails])
            .attr("cx", nodeDetails.x)
            .attr("cy", nodeDetails.y)
            .attr("r", 20 + (nodeDetails.cdoi / 100))
            .attr('fill', nodeDetails.ptype.toLowerCase().includes('hub') ? colorCodes.hubColor : colorCodes.spokeColor)
            .on('mouseover', function (d) {
                toolTipp.html(_tooltipTemplate(d))
                console.log(d3.event);
                d3.select('#tooltipContainer')
                    .style('position', 'absolute')
                    .style('left', d3.event.pageX - 50 + 'px')
                    .style('top', d3.event.pageY - 100 + 'px')
                    .transition()
                    .duration(500)
                    .style('display', 'block')
                    .style('z-index', 10)
            })
            .on('mouseout', function (d) {
                d3.select('#tooltipContainer')
                    .transition()
                    .duration(500)
                    .style('display', 'none');
            })
            .append('circle');

        // The mini circle which store the video status

        activeCircle.attr('cx', nodeDetails.x)
            .attr('cy', nodeDetails.y)
            .attr('r', 15)
            .attr('fill', '#00ffd0');

        miniCircle
            .attr('cx', nodeDetails.x + 18)
            .attr('cy', nodeDetails.y - 14 - (nodeDetails.cdoi / 100))
            .attr('r', 8)
            .attr('fill', nodeDetails.vs ? colorCodes.videoStatusOnColor : colorCodes.videoStatusOffColor);
        // add the flicker basis its graph interaction
        _startFlicker(circle, miniCircle, nodeDetails)

    }


    var _handleGroupCreation = function (nodeDetails, svgContainer) {


        // there is no existing hub in the graph, proceed as usual
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
        var activeCircle;
        if (svgContainer.select(`[class="activenode"]`)._groups[0][0] !== undefined) {
            svgContainer.select(`[class="activenode"]`)._groups[0][0].remove();
            activeCircle = group.append('circle').attr('class', 'activenode')
        } else {
            activeCircle = group.append('circle').attr('class', 'activenode');
        }

        _renderToGraph(circle, activeCircle, miniCircle, nodeDetails);
    }


    var _handleHubBehaviour = function (currentNodeData, svgContainer) {
        console.log('handle hub behaviour called', currentNodeData);

        /* if more than one hubs are present, 
         show only one hub in the center but display each hub's corresponding value in the participant details section.

         steps : look if there is already a hub (only one hub should be visible in the graph) present
                    if yes, then don't create a new hub, just display the details in the left section
                    if no, create the hub as usual
         rest of the spoke creation will work as usual
            */

        var uniqueHub = svgContainer.select(`[fill="${colorCodes.hubColor}"]`)._groups[0][0] !== undefined ? svgContainer.select(`[fill="${colorCodes.hubColor}"]`) : undefined
        // if unique hub is already present, simply show active behaviour on the unique hub else go as usual
        if (uniqueHub) {
            let hubGroup = svgContainer.select(`[id="${uniqueHub.data()[0].pid}_group"]`);
            let hubCircle = hubGroup.select(`[id="${uniqueHub.data()[0].pid}"]`)
            let hubMiniCircle = hubGroup.select(`[id="${uniqueHub.data()[0].pid}_mini"]`)
            // make sure you redirect the links of new hub into the already existing hub
            // example if hub b spoke after node 3 then originally the link was from hub b to node 3
            // now this should be changed to a link from hub a to node 3 but the details on the left will
            // be of the new hub b.

            // currentNodeData.ia = uniqueHub.data().pid;
            var activeHubCircle;


            if (svgContainer.select(`[class="activenode"]`)._groups[0][0] !== undefined) {
                svgContainer.select(`[class="activenode"]`)._groups[0][0].remove();
                activeHubCircle = hubGroup.append('circle').attr('class', 'activenode')
            } else {
                activeHubCircle = hubGroup.append('circle').attr('class', 'activenode');
            }
            // _renderToGraph(hubCircle, activeHubCircle,hubMiniCircle, currentNodeData );
            activeHubCircle.attr('cx', uniqueHub.data()[0].x)
                .attr('cy', uniqueHub.data()[0].y)
                .attr('r', 15)
                .attr('fill', '#00ffd0');

            _startFlicker(hubCircle, hubMiniCircle, currentNodeData)

        } else {
            _handleGroupCreation(currentNodeData, svgContainer);
        }


    }

    var toolTipp = d3.select('#graphContainer')
        .append('div')
        .attr('id', 'tooltipContainer')
        .style('display', 'none')
        .classed('toolTip', true)
        .append('div')
        .attr('id', 'tooltip');

    var _tooltipTemplate = function (data) {
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

    var _createNode = function (nodeDetails, svg) {

        var svgContainer = svg;

        if (nodeDetails.ptype.toLowerCase().includes('hub')) {
            console.log('handle hub creation')
            _handleHubBehaviour(nodeDetails, svgContainer);
        } else {
            console.log('handle group creation')
            _handleGroupCreation(nodeDetails, svgContainer)
        }
    }

    return {
        createNode: _createNode,
        increaseRadius: increaseRadius
    }
}(d3));