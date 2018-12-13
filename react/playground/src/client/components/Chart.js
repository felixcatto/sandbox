import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './Chart.scss';


const rectsData = [
  { name: 'E', value: 0.12702 },
  { name: 'T', value: 0.09056 },
  { name: 'A', value: 0.08167 },
  { name: 'O', value: 0.07507 },
  { name: 'I', value: 0.06966 },
  { name: 'N', value: 0.06749 },
  { name: 'S', value: 0.06327 },
  { name: 'H', value: 0.06094 },
  { name: 'R', value: 0.05987 },
  { name: 'D', value: 0.04253 },
  { name: 'L', value: 0.04025 },
  { name: 'C', value: 0.02782 },
  { name: 'U', value: 0.02758 },
  { name: 'M', value: 0.02406 },
  { name: 'W', value: 0.0236 },
  { name: 'F', value: 0.02288 },
  { name: 'G', value: 0.02015 },
  { name: 'Y', value: 0.01974 },
  { name: 'P', value: 0.01929 },
  { name: 'B', value: 0.01492 },
  { name: 'V', value: 0.00978 },
  { name: 'K', value: 0.00772 },
  { name: 'J', value: 0.00153 },
  { name: 'X', value: 0.0015 },
  { name: 'Q', value: 0.00095 },
  { name: 'Z', value: 0.00074 },
];

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.state = {
      renderRects: null,
      renderCircles: null,
    };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const svg = d3.select(this.svgRef.current);
    const margin = {
      top: 20, right: 20, bottom: 30, left: 40,
    };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    const gx = g.append('g')
      .attr('transform', `translate(0,${height})`);
    const gy = g.append('g');
    const lineEl = g.append('path');

    const renderRects = (data) => {
      const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.name))
        .padding(0.1);
      const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, d => d.value)])
        .nice();
      gx.call(d3.axisBottom(x));
      gy.call(d3.axisLeft(y));

      const rects = g.selectAll('rect').data(data);
      rects.enter().append('rect')
        .attr('class', 'chart__rect')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.value))
        .attr('width', x.bandwidth())
        .attr('height', d => y(0) - y(d.value));
    };

    const renderCircles = (data) => {
      const startDate = d3.min(data, d => d.date);
      const endDate = d3.max(data, d => d.date);
      const x = d3.scaleTime()
        .range([0, width])
        .domain([startDate, endDate]);
      const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100])
        .nice();
      gx.call(d3
        .axisBottom(x)
        .ticks(d3.timeMonth)
        .tickFormat(d3.timeFormat('%m.%y')));
      gy.call(d3.axisLeft(y));

      const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX);

      lineEl.datum(data)
        .attr('class', 'chart__line')
        .attr('d', line);

      const circles = g.selectAll('circle').data(data, d => d.date);
      circles.enter().append('circle')
        .attr('class', 'chart__cirlce')
        .attr('r', 5)
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.value));
      circles.exit().remove();
      circles
        .attr('cy', d => y(d.value));
    };

    renderCircles(this.genData());

    this.setState({
      renderRects,
      renderCircles,
    });
  }

  genData = () => Array(5).fill(0).map((el, i) => ({
    date: new Date(2018, i + 1, 1),
    value: Math.floor(Math.random() * (100 - 0 + 1)),
  }))

  onDataChange = () => {
    const { renderCircles } = this.state;
    if (!renderCircles) return;

    const data = this.genData();
    renderCircles(data);
  }

  onRenderRects = () => {
    const { renderRects } = this.state;
    if (!renderRects) return;

    renderRects(rectsData);
  }

  render() {
    const { text } = this.props;

    return (
      <div>
        <h1>Lets Make a Bar Chart</h1>
        <div className="d-flex mb-10">
          <button className="btn btn-primary mr-10" onClick={this.onDataChange}>Change Data</button>
          <button className="btn btn-primary" onClick={this.onRenderRects}>Render Rects</button>
        </div>
        <div>{text}</div>
        <svg id="svg" className="chart__svg" ref={this.svgRef} width="960" height="500"></svg>
      </div>
    );
  }
}


class Wrapper extends React.Component {
  state = {
    text: 'vasa eto boroda',
    i: true,
  }

  onTextChange = () => {
    this.setState(({ i }) => ({
      text: i ? 'ggwp' : 'lanaya',
      i: !i,
    }));
  }

  render() {
    const { text } = this.state;
    return (
      <div className="pt-30">
        <button className="btn btn-primary mb-20" onClick={this.onTextChange}>Change NotChart props</button>
        <Chart text={text} />
      </div>
    );
  }
}

export default Wrapper;
