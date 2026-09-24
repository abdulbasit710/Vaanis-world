import {useMotionValue,useReducedMotion,useSpring,useTransform,motion} from 'framer-motion';
import type {PointerEvent} from 'react';

type Author3DCardProps={imageUrl:string;title:string;subtitle:string;href:string};

export function Author3DCard({imageUrl,title,subtitle,href}:Author3DCardProps){
 const reduced=useReducedMotion();
 const x=useMotionValue(0),y=useMotionValue(0);
 const springX=useSpring(x,{stiffness:120,damping:20});
 const springY=useSpring(y,{stiffness:120,damping:20});
 const rotateX=useTransform(springY,[-.5,.5],[5,-5]);
 const rotateY=useTransform(springX,[-.5,.5],[-5,5]);
 const move=(event:PointerEvent<HTMLDivElement>)=>{
  if(reduced||event.pointerType==='touch')return;
  const rect=event.currentTarget.getBoundingClientRect();
  x.set((event.clientX-rect.left)/rect.width-.5);
  y.set((event.clientY-rect.top)/rect.height-.5);
 };
 const reset=()=>{x.set(0);y.set(0)};
 return <div className="authorCardPerspective"><motion.div className="author3DCard" onPointerMove={move} onPointerLeave={reset} style={reduced?undefined:{rotateX,rotateY,transformStyle:'preserve-3d'}}><img src={imageUrl} alt="Vaani smiling while holding her white dog" loading="lazy"/><div className="author3DCardShade"/><div className="author3DCardTop"><span>THE STORYTELLER</span><a href={href} aria-label="Read about Vaani Halwasiya">↗</a></div><div className="author3DCardBottom"><div><span>Meet the author</span><h3>{title}</h3><p>{subtitle}</p></div><a className="author3DCardAction" href={href}>Discover Vaani’s story <span>↗</span></a></div></motion.div></div>;
}
