
  margin3 = {top: 20, right: 25, bottom: 30, left: 115},
  width3 = 600 - margin3.left - margin3.right,
  height3 = 600 - margin3.top - margin3.bottom;

// append the svg object to the body of the page
svg3 = d3.select("#c3")
  .append("svg")
  .attr("width", width3 + margin3.left + margin3.right)
  .attr("height", height3 + margin3.top + margin3.bottom)
  .append("g")
  .attr("transform", `translate(${margin3.left}, ${margin3.top})`);

//Read the data
d3.csv("data/california_wine_production.csv").then(draw3)

function draw3(data){
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  myCounty = Array.from(new Set(data.map(d => d.County)))
  myYear = Array.from(new Set(data.map(d => d.Year)))

  // Build X scales and axis:
  x3 = d3.scaleBand()
    .range([ 0, width3 ])
    .domain(['1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020'])
    .padding(0.05);
  svg3.append("g")
    .style("font-size", 15)
    .attr("transform", `translate(0, ${height3})`)
    .call(d3.axisBottom(x3).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  y3 = d3.scaleBand()
    .range([ height3, 0 ])
    .domain(myCounty)
    .padding(0.05);
  svg3.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y3).tickSize(0))
    .select(".domain").remove()


  // Build color scale
  myColor3 = d3
    .scaleSequential()
    .domain([100, 2000])
    // .interpolator(d3.interpolateInferno)
    // .domain([1,100])
    .interpolator(d3.interpolateRgb("rgb(242, 237, 237)", "rgb(132,54,64)"))
  
    

  // create a tooltip
  tooltip3 = d3.select("#c3")
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
        .attr("width", x.bandwidth)
        .attr("height", y3.bandwidth)

        triggerMapHighlight(d.County)
    }

    mouseleave3 = function(event,d) {
      tooltip3
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)

        triggerMapReset(d.County)
    }

    mousemove3 = function(event,d) {
      tooltip3
        .html(d.County + " County priced each ton of yield at " + d.PriceDollarsUnit + " $/Unit in " +  d.Year + ".")
        .style("left", (event.x3)/2 + "px")
        .style("top", (event.y3)/2 + "px")
    }
  // add the squares
    svg3.selectAll()
      .data(data, function(d) {return d.County+':'+d.Year;})
      .join("rect")
      .attr("x", function(d) { return x(d.Year) })
      .attr("y", function(d) { return y(d.County) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x3.bandwidth() )
      .attr("height", y3.bandwidth() )
      .style("fill", function(d) { return myColor3(d.PriceDollarsUnit)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .attr("width", x.bandwidth)
    .on("mouseover", mouseover3)
    .on("mousemove", mousemove3)
    .on("mouseleave", mouseleave3)

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