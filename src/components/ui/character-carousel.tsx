import {useRef,useState} from 'react';
import type {CSSProperties,KeyboardEvent,TouchEvent} from 'react';

export type ForestCharacter={name:string;role:string;description:string;tone:string;image:string;alt:string};

export function CharacterCarousel({characters}:{characters:readonly ForestCharacter[]}){
 const [active,setActive]=useState(0);
 const touchX=useRef<number|null>(null);
 const total=characters.length;
 const select=(index:number)=>setActive((index+total)%total);
 const offsetFor=(index:number)=>{
  const forward=(index-active+total)%total;
  return forward>Math.floor(total/2)?forward-total:forward;
 };
 const onKeys=(event:KeyboardEvent<HTMLDivElement>)=>{
  if(event.key==='ArrowRight'){event.preventDefault();select(active+1)}
  if(event.key==='ArrowLeft'){event.preventDefault();select(active-1)}
 };
 const onTouchStart=(event:TouchEvent<HTMLDivElement>)=>{touchX.current=event.touches[0].clientX};
 const onTouchEnd=(event:TouchEvent<HTMLDivElement>)=>{
  if(touchX.current===null)return;
  const change=event.changedTouches[0].clientX-touchX.current;
  if(Math.abs(change)>45)select(active+(change<0?1:-1));
  touchX.current=null;
 };
 return <div className="characterCarousel"><div className="characterCarouselStage" aria-label="Forest character carousel" onKeyDown={onKeys} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>{characters.map((character,index)=>{const offset=offsetFor(index);const visible=Math.abs(offset)<=2;const scene=character.image.includes('/hero/');return <button type="button" key={character.name} className={'characterCarouselCard'+(offset===0?' current':'')+(scene?' scene':'')+(character.name==='Cherry Jerry'?' tree':'')} style={{'--offset':offset,'--distance':Math.abs(offset),'--card-tone':character.tone,zIndex:10-Math.abs(offset),opacity:visible?1:0,pointerEvents:visible?'auto':'none'} as CSSProperties} onClick={()=>select(index)} tabIndex={visible?0:-1} aria-label={'View '+character.name+': '+character.role} aria-current={offset===0?'true':undefined}><span className="characterCarouselImage"><img src={character.image} alt={character.alt} loading="lazy" decoding="async"/></span><span className="characterCarouselCardShade"/><span className="characterCarouselBadge">{character.role}</span><span className="characterCarouselCardName">{character.name}</span></button>})}</div><div className="characterCarouselControls"><button type="button" aria-label="Previous character" onClick={()=>select(active-1)}>←</button><span>{String(active+1).padStart(2,'0')} <i/> {String(total).padStart(2,'0')}</span><button type="button" aria-label="Next character" onClick={()=>select(active+1)}>→</button></div><div className="characterCarouselDetail" aria-live="polite"><p className="characterCarouselDetailLabel">Meet {characters[active].name}</p><p>{characters[active].description}</p></div><div className="characterCarouselNames" aria-label="Choose a forest character">{characters.map((character,index)=><button type="button" key={character.name} className={index===active?'active':''} aria-current={index===active?'true':undefined} onClick={()=>select(index)}>{character.name}</button>)}</div></div>;
}
