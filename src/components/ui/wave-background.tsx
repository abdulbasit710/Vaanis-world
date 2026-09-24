import {useEffect,useRef} from 'react';
import {createNoise2D} from 'simplex-noise';

type WavesProps = {
  className?: string;
  strokeColor?: string;
  backgroundColor?: string;
};

export function Waves({className = '',strokeColor = '#ffffff',backgroundColor = 'transparent'}:WavesProps){
  const containerRef=useRef<HTMLDivElement>(null);
  const svgRef=useRef<SVGSVGElement>(null);

  useEffect(()=>{
    const container=containerRef.current;
    const svg=svgRef.current;
    if(!container||!svg)return;
    const noise=createNoise2D();
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame=0;
    let width=0;
    let height=0;
    let paths:SVGPathElement[]=[];
    let pointer={x:-1000,y:-1000};
    const resize=()=>{
      const rect=container.getBoundingClientRect();
      width=rect.width;
      height=rect.height;
      svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
      const count=Math.ceil(width/25);
      svg.replaceChildren();
      paths=Array.from({length:count},()=>{
        const path=document.createElementNS('http://www.w3.org/2000/svg','path');
        path.setAttribute('fill','none');
        path.setAttribute('stroke',strokeColor);
        path.setAttribute('stroke-width','1');
        path.setAttribute('opacity','.28');
        svg.appendChild(path);
        return path;
      });
    };
    const move=(event:PointerEvent)=>{
      const rect=container.getBoundingClientRect();
      pointer={x:event.clientX-rect.left,y:event.clientY-rect.top};
    };
    const leave=()=>{pointer={x:-1000,y:-1000}};
    const draw=(time:number)=>{
      const step=18;
      paths.forEach((path,index)=>{
        const baseX=index*25;
        let d='';
        for(let y=-20;y<=height+20;y+=step){
          const wave=noise(baseX*.003+time*.00013,y*.004+time*.0001)*13;
          const distance=Math.hypot(baseX-pointer.x,y-pointer.y);
          const pull=Math.max(0,1-distance/210)*Math.sin(distance*.025-time*.003)*18;
          d+=`${y===-20?'M':'L'}${(baseX+wave+pull).toFixed(1)} ${y} `;
        }
        path.setAttribute('d',d);
      });
      if(!reduced)frame=requestAnimationFrame(draw);
    };
    const observer=new ResizeObserver(resize);
    observer.observe(container);
    container.addEventListener('pointermove',move);
    container.addEventListener('pointerleave',leave);
    resize();
    draw(0);
    return ()=>{
      cancelAnimationFrame(frame);
      observer.disconnect();
      container.removeEventListener('pointermove',move);
      container.removeEventListener('pointerleave',leave);
    };
  },[strokeColor]);

  return <div ref={containerRef} className={`wavesBackground ${className}`} style={{backgroundColor}} aria-hidden="true"><svg ref={svgRef} preserveAspectRatio="none"/></div>;
}
