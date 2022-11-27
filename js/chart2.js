
margin2 = {top: 20, right: 25, bottom: 30, left: 115},
width2 = 600 - margin2.left - margin2.right,
height2 = 600 - margin2.top - margin2.bottom;

// append the svg object to the body of the page
svg2 = d3.select("#chart2")
.append("svg")
.attr("width", width2 + margin2.left + margin2.right)
.attr("height", height2 + margin2.top + margin2.bottom)
.append("g")
.attr("transform", `translate(${margin2.left}, ${margin2.top})`);

//Read the data
d3.csv("data/california_wine_production.csv").then(draw2)

function draw2(data){
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  myCounty2 = Array.from(new Set(data.map(d => d.County)))
  myYear2 = Array.from(new Set(data.map(d => d.Year)))

  // Build X scales and axis:
  x2 = d3.scaleBand()
    .range([ 0, width2 ])
    .domain(myYear2)
    .padding(0.05);
  svg2.append("g")
    .style("font-size", 15)
    .attr("transform", `translate(0, ${height2})`)
    .call(d3.axisBottom(x2).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  y2 = d3.scaleBand()
    .range([ height2, 0 ])
    .domain(myCounty2)
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
    .interpolator(d3.interpolateRgb("green", "darkred"))
    .domain([1, 5])

  // create a tooltip
  tooltip2 = d3.select("#chart2")
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
        .attr("width", x2.bandwidth)
        .attr("height", y2.bandwidth)
    }

    mouseleave2 = function(event,d) {
      tooltip2
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }

    mousemove2 = function(event,d) {
      tooltip2
        .html(d.County + " County yielded " + d.YieldUnitAcre + "<br>units/acre in " +  d.Year + ".")
        .style("left", (event.x2)/2 + "px")
        .style("top", (event.y2)/2 + "px")
    }
  // add the squares
  svg2.selectAll()
    .data(data, function(d) {return d.County+':'+d.Year;})
    .join("rect")
      .attr("x", function(d) { return x2(d.Year) })
      .attr("y", function(d) { return y2(d.County) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x2.bandwidth() )
      .attr("height", y2.bandwidth() )
      .style("fill", function(d) { return myColor2(d.YieldUnitAcre)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover2)
    .on("mousemove", mousemove2)
    .on("mouseleave", mouseleave2)
}
