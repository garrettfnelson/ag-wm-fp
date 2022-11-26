/*
checklist: [ ]/[x]
1. x/y bounds switched w/ appropriate labels                    [x]
2. load data from non-expiry source                             [x]   
3. mouseover highlight in-front of data + appropriate sizing    [ ]
4. change sizing based on additional variable                   [ ]
5. fix dehighlight function                                     [x]
6. tooltip not displaying for first 3-4 entries per county      [ ]
*/

const margin = {top: 20, right: 25, bottom: 30, left: 115},
  width = 600 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#chart")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("data/california_wine_production.csv").then(function(data) {

  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  const myCounty = Array.from(new Set(data.map(d => d.County)))
  const myYear = Array.from(new Set(data.map(d => d.Year)))

  // Build X scales and axis:
  const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myYear)
    .padding(0.05);
  svg.append("g")
    .style("font-size", 15)
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  const y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myCounty)
    .padding(0.05);
  svg.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  const myColor = d3
    .scaleSequential()
    // .interpolator(d3.interpolateInferno)
    // .domain([1,100])
    .interpolator(d3.interpolateRgb("green", "darkred"))
    .domain([500, 25000])

  // create a tooltip
  const tooltip = d3.select("#chart")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event,d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
      .attr("width", x.bandwidth)
      .attr("height", y.bandwidth)
  }
  const mousemove = function(event,d) {
    tooltip
      .html("The exact value of<br>this cell is: " + d.HarvestedAcres)
      .style("left", (event.x)/2 + "px")
      .style("top", (event.y)/2 + "px")
  }
  const mouseleave = function(event,d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  // add the squares
  svg.selectAll()
    .data(data, function(d) {return d.County+':'+d.Year;})
    .join("rect")
      .attr("x", function(d) { return x(d.Year) })
      .attr("y", function(d) { return y(d.County) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.HarvestedAcres)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
})

// Add title to graph
svg.append("MatrixDisplayofCaliforniaWineries")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "right")
        .style("font-size", "22px")
        .text("A d3.js heatmap");

// Add subtitle to graph
svg.append("MatrixDisplayofCaliforniaWineries")
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "right")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("max-width", 400)
        .text("A short description of the take-away message of this chart.");