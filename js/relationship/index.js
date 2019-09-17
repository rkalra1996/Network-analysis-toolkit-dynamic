var relationshipModule = (function () {
    var arrowstatus = false
    var arrowHead = function (svg) {
        arrowstatus = true;
        svg.append("svg:defs").append("svg:marker")
            .attr("id", "triangle")
            .attr("refX", 6)
            .attr("refY", 6)
            .attr("markerWidth", 30)
            .attr("markerHeight", 30)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0 0 12 6 0 12 3 6")
            .style("fill", "#333");
    }
    var lineCreation = function (svg, data) {
        var weight = data.weight || 1;
        var x1 = data.x1;
        var x2 = data.x2;
        var y1 = data.y1;
        var y2 = data.y2;

        svg.append("line")
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2)
            .attr("stroke-width", weight)
            .attr("stroke", "#333")
            .attr("marker-end", "url(#triangle)");
    }
    var createRelation = function (data) {
        var source = data.source;
        var target = data.target
        var svg = data.svgelem;
        if (!source && !target && !data.x1 && !data.y1 && !data.x2 && !data.y2) {
            var err = new Error("please proved source and target and coordinates");
            throw err;
        }
        // if (!arrowstatus)
        arrowHead(svg);
        lineCreation(svg, data);


    }
    return {
        createRelation: createRelation
    }
})();