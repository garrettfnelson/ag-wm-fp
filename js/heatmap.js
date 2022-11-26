// Margin Convention
let margins = { top: 20, right: 25, bottom: 30, left: 115 }
let outerWidth = 600
let outerHeight = 600
let innerWidth = 600 - margins.left - margins.right
let innerHeight = 600 - margins.top - margins.bottom

// append the svg object to the body of the page
let svg = d3
  .select('div#chart svg')
  .attr('width', outerWidth)
  .attr('height', outerHeight)
  .append('g')
  .attr('id', 'plot-area')
  .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')

// data fully loaded from data folder
d3.csv("data/california_wine_production.csv").then(draw_wine)

function draw_wine(data) {
  // labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  // checking data validity
  // console.log(data[0].County)

  var county = d3.map(data, d => d.County).keys()
  var year = d3.map(data, d => d.Year).keys()

  // build x scale and axis:
  var xScale = d3
    .scaleBand()
    .domain(year)
    .range([0, innerWidth])
    .padding(0.1)

  svg
    .append('g')
    .style('font-size', 15)
    .attr('transform', 'translate(0,' + innerHeight + ')')
    .call(d3.axisBottom(xScale).tickSize(0))
    .select('.domain') // remove horizontal line from axis
    .remove()

  // Build y scale and axis:
  var yScale = d3
    .scaleBand()
    .domain(county)
    .range([innerHeight, 0])
    .padding(0.05)

  svg
    .append('g')
    .style('font-size', 15)
    .call(d3.axisLeft(yScale).tickSize(0))
    .select('.domain') // remove vertical line from axis
    .remove()

  // build color scale
  let colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([1, 100])

  // add the squares
  svg
    .selectAll()
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.Year))
    .attr('y', d => yScale(d.County))
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('width', xScale.bandwidth())
    .attr('height', yScale.bandwidth())
    .style('fill', d => colorScale(d.HarvestedAcres))
    .style('stroke', 'red')
    .style('stroke-width', 4)
    .style('stroke-opacity', 0)
    .style('fill-opacity', 0.7)
    .on('mouseover', darken_square)
    .on('mousemove', show_info)
    .on('mouseleave', function(d) {
      hide_info()
      
      reset_highlight(d, this) // need to explicitly pass this
      
    })
    .on('click', change_border_color)

  // three functions that change the tooltip when user hovers / moves in / leaves a cell
  // because we use the function key word to declare them, we can put them down
  // here and they will be hoisted.

  function darken_square(d) {
    d3.select(this)
      .style('fill-opacity', 1)
      .style('stroke-opacity', 1)
      // shrink a bit to make room for stroke, now visible
      .attr('x', d => xScale(d.Year) + 2)
      .attr('y', d => yScale(d.County) + 2)
      .attr('width', xScale.bandwidth() - 4)
      .attr('height', yScale.bandwidth() - 4)
  }

  function show_info(d) {
    let mouseLoc = d3.mouse(this)
    let info =
      'cell value: ' +
      d.HarvestedAcres +
      '. ' +
      '<br />county: ' +
      d.County +
      ', ' +
      '<br />year:' +
      d.Year +
      ').'

    // .html instead of .text() allows us to supply html markup here
    d3.selectAll('.tooltip, .info')
      .html(info)
      .style('visibility', 'visible')
      // left and top only affect .tooltip b/c position = absolute -- see css
      .style('left', mouseLoc[0] + margins.left + xScale.bandwidth() + 'px')
      .style('top', mouseLoc[1] - yScale.bandwidth() + 'px')
  }

  function hide_info() {
    d3.selectAll('.tooltip, .info').style('visibility', 'hidden')
  }

  function change_border_color(d) {
    let target = d3.select(this)
    let color = target.style('stroke') // read the current stroke value
    target.style('stroke', color == 'red' ? 'blue' : 'red')
  }

function reset_highlight(d, ref) {
   d3.select(ref)
    .style('stroke-opacity', 0)
    .style('fill-opacity', 0.7)
 }

  function change_border_color(d) {
    let target = d3.select(this)
    let color = target.style('stroke') // read the current stroke value
    target.style('stroke', color == 'red' ? 'blue' : 'red')
  }
}

function draw(data) {
  // console.log(data) // console log of old data
  // labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var groups = d3.map(data, d => d.group).keys()
  var vars = d3.map(data, d => d.variable).keys()

  var county = d3.map(data, d => d.County).keys()
  var year = d3.map(data, d => d.Year).keys()

  // build x scale and axis:
  var xScale = d3
    .scaleBand()
    .domain(groups)
    .range([0, innerWidth])
    .padding(0.1)

  svg
    .append('g')
    .style('font-size', 15)
    .attr('transform', 'translate(0,' + innerHeight + ')')
    .call(d3.axisBottom(xScale).tickSize(0))
    .select('.domain') // remove horizontal line from axis
    .remove()

  // Build y scale and axis:
  var yScale = d3
    .scaleBand()
    .domain(vars)
    .range([innerHeight, 0])
    .padding(0.05)

  svg
    .append('g')
    .style('font-size', 15)
    .call(d3.axisLeft(yScale).tickSize(0))
    .select('.domain') // remove vertical line from axis
    .remove()

  // build color scale
  let colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([1, 100])

  // add the squares
  svg
    .selectAll()
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.group))
    .attr('y', d => yScale(d.variable))
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('width', xScale.bandwidth())
    .attr('height', yScale.bandwidth())
    .style('fill', d => colorScale(d.value))
    .style('stroke', 'red')
    .style('stroke-width', 4)
    .style('stroke-opacity', 0)
    .style('fill-opacity', 0.7)
    .on('mouseover', darken_square)
    .on('mousemove', show_info)
    .on('mouseleave', function(d) {
      hide_info()
      
      reset_highlight(d, this) // need to explicitly pass this
      
    })
    .on('click', change_border_color)

  // three functions that change the tooltip when user hovers / moves in / leaves a cell
  // because we use the function key word to declare them, we can put them down
  // here and they will be hoisted.

  function darken_square(d) {
    d3.select(this)
      .style('fill-opacity', 1)
      .style('stroke-opacity', 1)
      // shrink a bit to make room for stroke, now visible
      .attr('x', d => xScale(d.group) + 2)
      .attr('y', d => yScale(d.variable) + 2)
      .attr('width', xScale.bandwidth() - 4)
      .attr('height', yScale.bandwidth() - 4)
  }

  function show_info(d) {
    let mouseLoc = d3.mouse(this)
    let info =
      'The exact value of this cell is: ' +
      d.value +
      '. ' +
      '<br />Mouse location is: (' +
      mouseLoc[0] +
      ', ' +
      mouseLoc[1] +
      ').'

    // .html instead of .text() allows us to supply html markup here
    d3.selectAll('.tooltip, .info')
      .html(info)
      .style('visibility', 'visible')
      // left and top only affect .tooltip b/c position = absolute -- see css
      .style('left', mouseLoc[0] + margins.left + xScale.bandwidth() + 'px')
      .style('top', mouseLoc[1] - yScale.bandwidth() + 'px')
  }

  function hide_info() {
    d3.selectAll('.tooltip, .info').style('visibility', 'hidden')
  }

  function change_border_color(d) {
    let target = d3.select(this)
    let color = target.style('stroke') // read the current stroke value
    target.style('stroke', color == 'red' ? 'blue' : 'red')
  }

function reset_highlight(d, ref) {
   d3.select(ref)
    .style('stroke-opacity', 0)
    .style('fill-opacity', 0.7)
 }

  function change_border_color(d) {
    let target = d3.select(this)
    let color = target.style('stroke') // read the current stroke value
    target.style('stroke', color == 'red' ? 'blue' : 'red')
  }
}

/*
checklist: [ ]/[x]
1. x/y bounds switched w/ appropriate labels                    [x]
2. load data from non-expiry source                             [x]   
3. mouseover highlight in-front of data + appropriate sizing    [ ]
4. change sizing based on additional variable                   [ ]
*/
