
  margin1 = {top: 20, right: 25, bottom: 30, left: 115},
  width1 = 600 - margin1.left - margin1.right,
  height1 = 600 - margin1.top - margin1.bottom;

// append the svg object to the body of the page

svg1 = d3.select("#c1")
  .append("svg")
  .attr("width", width1 + margin1.left + margin1.right)
  .attr("height", height1 + margin1.top + margin1.bottom)
  .append("g")
  .attr("transform", `translate(${margin1.left}, ${margin1.top})`);

//Read the data
d3.csv("data/california_wine_production.csv").then(draw1)

function draw1(data){
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  myCounty = Array.from(new Set(data.map(d => d.County)))
  myYear = Array.from(new Set(data.map(d => d.Year)))

  // Build X scales and axis:
  x = d3.scaleBand()
    .domain(myYear)
    .range([ 0, width1 ])
    .padding(0.05);
  y = d3.scaleBand()
    .range([ height1, 0 ])
    .domain(myCounty)
    .padding(0.05);

  x1 = d3.scaleBand()
    .range([ 0, width1 ])
    .domain(['1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020'])
    // .domain(myYear)
    .padding(0.05);
  svg1.append("g")
    .style("font-size", 15)
    .attr("transform", `translate(0, ${height1})`)
    .call(d3.axisBottom(x1).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  y1 = d3.scaleBand()
    .range([ height1, 0 ])
    .domain(myCounty)
    .padding(0.05);
  svg1.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y1).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  myColor1 = d3
    .scaleSequential()
    // .interpolator(d3.interpolateInferno)
    // .domain([1,100])
    .interpolator(d3.interpolateRgb("rgb(242, 237, 237)", "rgb(132,54,64)"))
    .domain([3.0, 128613.0])

  // create a tooltip
  tooltip1 = d3.select("#c1")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")  

    mouseover1 = function(event,d) {
      tooltip1
        .style("opacity", 1)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
        .attr("width", x.bandwidth)
        .attr("height", y1.bandwidth)

        triggerMapHighlight(d.County)
    }

    mouseleave1 = function(event,d) {
      tooltip1
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)

        triggerMapReset(d.County)
    }

    mousemove1 = function(event,d) {
      tooltip1
        .html(d.County + " County harvested " + d.HarvestedAcres + " acres in " +  d.Year + ".")
        .style("left", (event.x1)/2 + "px")
        .style("top", (event.y1)/2 + "px")
    }
  // add the squares
    svg1.selectAll()
      .data(data, function(d) {return d.County+':'+d.Year;})
      .join("rect")
      .attr("x", function(d) { return x(d.Year) })
      .attr("y", function(d) { return y(d.County) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor1(d.HarvestedAcres)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .attr("width", x.bandwidth)
    .on("mouseover", mouseover1)
    .on("mousemove", mousemove1)
    .on("mouseleave", mouseleave1)

}

function highlightChart(stateName){
  // myCounty is an array of county names made into a key
  for (var i = 0; i < myCounty.length; i++){
    if(myCounty[i] === stateName){
      // when we get a match we want to highlight that particular row corresponding to the key
      svg1.append("g")
        .style("color", "Red")
        .style("font-size", 15)
        .call(d3.axisLeft(y1).tickSize(0))
        .select(".domain").remove()
    }
  }
}

function resetChart(stateName){
  for (var i = 0; i < myCounty.length; i++){
    if(myCounty[i] === stateName){
      // reverse highlight
      svg1.append("g")
      .style("color", "Black")
      .style("font-size", 15)
      .call(d3.axisLeft(y1).tickSize(0))
      .select(".domain").remove()
    }
  }
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