
margin3 = {top: 20, right: 25, bottom: 30, left: 115},
width3 = 600 - margin3.left - margin3.right,
height3 = 600 - margin3.top - margin3.bottom;

// append the svg object to the body of the page
svg3 = d3.select("#chart2")
.append("svg")
.attr("width", width3 + margin3.left + margin3.right)
.attr("height", height3 + margin3.top + margin3.bottom)
.append("g")
.attr("transform", `translate(${margin3.left}, ${margin3.top})`);

//Read the data
d3.csv("data/california_wine_production.csv").then(draw3)

function draw3(data){
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  myCounty3 = Array.from(new Set(data.map(d => d.County)))
  myYear3 = Array.from(new Set(data.map(d => d.Year)))

  // Build X scales and axis:
  x3 = d3.scaleBand()
    .range([ 0, width2 ])
    .domain(myYear2)
    .padding(0.05);
  svg3.append("g")
    .style("font-size", 15)
    .attr("transform", `translate(0, ${height3})`)
    .call(d3.axisBottom(x3).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  y3 = d3.scaleBand()
    .range([ height3, 0 ])
    .domain(myCounty3)
    .padding(0.05);
  svg3.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y3).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  myColor3 = d3
    .scaleSequential()
    // .interpolator(d3.interpolateInferno)
    // .domain([1,100])
    .interpolator(d3.interpolateRgb("green", "darkred"))
    .domain([1, 5])

  // create a tooltip
  tooltip3 = d3.select("#chart2")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")  

    mouseover3 = function(event,d) {
      tooltip3
        .style("opacity", 1)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
        .attr("width", x3.bandwidth)
        .attr("height", y3.bandwidth)
    }

    mouseleave3 = function(event,d) {
      tooltip3
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }

    mousemove3 = function(event,d) {
      tooltip3
        .html(d.County + " County yielded " + d.YieldUnitAcre + "<br>units/acre in " +  d.Year + ".")
        .style("left", (event.x3)/2 + "px")
        .style("top", (event.y3)/2 + "px")
    }
  // add the squares
  svg3.selectAll()
    .data(data, function(d) {return d.County+':'+d.Year;})
    .join("rect")
      .attr("x", function(d) { return x3(d.Year) })
      .attr("y", function(d) { return y3(d.County) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x3.bandwidth() )
      .attr("height", y3.bandwidth() )
      .style("fill", function(d) { return myColor2(d.YieldUnitAcre)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover3)
    .on("mousemove", mousemove3)
    .on("mouseleave", mouseleave3)
}
