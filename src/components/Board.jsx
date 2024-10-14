import { useRef, useEffect, useContext } from 'react'
import * as d3 from 'd3';
import './Board.css'
import { AppContext } from '../App';

export function Board() { 
  const { data, setData } = useContext(AppContext)
  //console.log("Segundo: " + data.nodes.length)
  const svgRef = useRef();

/*
  useEffect(() => {

    if (!isDataLoaded) {
      fetch('/api/nodes')
        .then((response) => response.json())
        .then((data) => {
          setNodes(data.nodes);
          setLinks(data.links);
          setDataLoaded(true);
        });
    }
  }, [isDataLoaded]);
  */
  useEffect(() => {
    if (data == undefined) return;
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id))
      .force('charge', d3.forceManyBody())
      .force('x', d3.forceX())
      .force('y', d3.forceY());


    d3.select(svgRef.current).selectAll('circle')
      .data(data.nodes)
      .on('click', (event, d) => {
            console.log(d.id); 
          })
      .call(d3.drag()
        .on("start", (event, d) => dragstarted(event, d, simulation))
        .on("drag", dragged)
        .on("end", (event, d) => dragended(event, d, simulation)));

    d3.select(svgRef.current).selectAll('line')
      .data(data.links)
        .on('click', (event, d) => {
    console.log("Source: " + d.source.id + " Target: " + d.target.id); 
  })

    d3.select(svgRef.current).selectAll('circle').append('title').text(d => d.title)


    simulation.on('tick', () => {
      d3.select(svgRef.current).selectAll('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.radius);

      d3.select(svgRef.current).selectAll('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);


    });
    return () => simulation.stop();


  }, [data])


  return (
    <div className="boardContainer">
      <svg className='board' ref={svgRef} width={928} height={680} viewBox='-464 -340 928 680'>
        {data.links.map((link, i) => (
          <line
            key={i}
            stroke="black"
          />
        ))}
        {data.nodes.map((node, i) => (
          <circle
            key={i}
            fill="blue"
          />
        ))}
      </svg>
    </div>

  );
};


function dragstarted(event, d, simulation) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragended(event, d, simulation) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
