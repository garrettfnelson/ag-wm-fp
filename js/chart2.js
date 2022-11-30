
  margin2 = {top: 20, right: 25, bottom: 30, left: 115},
  width2 = 600 - margin2.left - margin2.right,
  height2 = 600 - margin2.top - margin2.bottom;

// append the svg object to the body of the page
svg2 = d3.select("#c2")
  .append("svg")
  .attr("width", width2 + margin2.left + margin2.right)
  .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
  .attr("transform", `translate(${margin2.left}, ${margin2.top})`);

//Read the data
d3.csv("data/california_wine_production.csv").then(draw2)

function draw2(data){
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  myCounty = Array.from(new Set(data.map(d => d.County)))
  myYear = Array.from(new Set(data.map(d => d.Year)))

  // Build X scales and axis:
  x2= d3.scaleBand()
    .range([ 0, width2 ])
    // .domain(myYear)
    .domain(['1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020'])
    .padding(0.05);
  svg2.append("g")
    .style("font-size", 15)
    .attr("transform", `translate(0, ${height2})`)
    .call(d3.axisBottom(x2).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  y2 = d3.scaleBand()
    .range([ height2, 0 ])
    .domain(myCounty)
    .padding(0.05);
  svg2.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y2).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  myColor2 = d3
    .scaleSequential()
    // .interpolator(d3.interpolateInferno)
    // .domain([1,100])
    .interpolator(d3.interpolateRgb("rgb(242, 237, 237)", "rgb(132,54,64)"))
    .domain([0.06, 25.0])

  // create a tooltip
  tooltip2 = d3.select("#c2")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")  

    mouseover2 = function(event,d) {
      tooltip2
        .style("opacity", 1)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
        .attr("width", x.bandwidth)
        .attr("height", y2.bandwidth)

        triggerMapHighlight(d.County)
    }

    mouseleave2 = function(event,d) {
      tooltip2
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)

        triggerMapReset(d.County)
    }

    mousemove2 = function(event,d) {
      tooltip2
        .html(d.County + " County yielded " + d.YieldUnitAcre + " units/acres in " +  d.Year + ".")
        .style("left", (event.x2)/2 + "px")
        .style("top", (event.y2)/2 + "px")
    }
  // add the squares
    svg2.selectAll()
      .data(data, function(d) {return d.County+':'+d.Year;})
      .join("rect")
      .attr("x", function(d) { return x(d.Year) })
      .attr("y", function(d) { return y(d.County) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x2.bandwidth() )
      .attr("height", y2.bandwidth() )
      .style("fill", function(d) { return myColor2(d.YieldUnitAcre)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .attr("width", x.bandwidth)
    .on("mouseover", mouseover2)
    .on("mousemove", mousemove2)
    .on("mouseleave", mouseleave2)

}

// // Add title to graph
// svg.append("title")
//         .attr("x", 0)
//         .attr("y", -50)
//         .attr("text-anchor", "right")
//         .style("font-size", "22px")
//         .text("A d3.js heatmap");

// // Add subtitle to graph
// svg.append("text")
//         .attr("x", 0)
//         .attr("y", -20)
//         .attr("text-anchor", "right")
//         .style("font-size", "14px")
//         .style("fill", "grey")
//         .style("max-width", 400)
//         .text("A short description of the take-away message of this chart.");