import {useCallback,useEffect,useMemo,useRef,useState} from 'react';

const IMAGES={Easy:'/assets/puzzle/easy.png',Medium:'/assets/puzzle/medium.png',Hard:'/assets/puzzle/hard.png'} as const;
const W=1600,H=900;
const levels={Easy:[3,2],Medium:[4,3],Hard:[5,4]} as const;
type Level=keyof typeof levels;
type Piece={id:number;row:number;col:number;path:string;x:number;y:number;w:number;h:number};
type Drag={id:number;x:number;y:number;startX:number;startY:number;moved:boolean}|null;

function edge(seed:number){return seed%2===0?1:-1}
function piecesFor(cols:number,rows:number):Piece[]{
 const cw=W/cols,ch=H/rows,depth=Math.min(cw,ch)*.18;
 const horizontal=Array.from({length:rows-1},(_,r)=>Array.from({length:cols},(_,c)=>edge((r+1)*37+c*19)));
 const vertical=Array.from({length:rows},(_,r)=>Array.from({length:cols-1},(_,c)=>edge(r*31+(c+1)*23)));
 const make=(r:number,c:number)=>{const x=c*cw,y=r*ch,top=r?-horizontal[r-1][c]:0,right=c<cols-1?vertical[r][c]:0,bottom=r<rows-1?horizontal[r][c]:0,left=c?-vertical[r][c-1]:0;
  const path=[`M ${x} ${y}`,
   top===0?`L ${x+cw} ${y}`:`L ${x+cw*.34} ${y} C ${x+cw*.38} ${y},${x+cw*.34} ${y-top*depth},${x+cw*.5} ${y-top*depth} C ${x+cw*.66} ${y-top*depth},${x+cw*.62} ${y},${x+cw*.66} ${y} L ${x+cw} ${y}`,
   right===0?`L ${x+cw} ${y+ch}`:`L ${x+cw} ${y+ch*.34} C ${x+cw} ${y+ch*.38},${x+cw+right*depth} ${y+ch*.34},${x+cw+right*depth} ${y+ch*.5} C ${x+cw+right*depth} ${y+ch*.66},${x+cw} ${y+ch*.62},${x+cw} ${y+ch*.66} L ${x+cw} ${y+ch}`,
   bottom===0?`L ${x} ${y+ch}`:`L ${x+cw*.66} ${y+ch} C ${x+cw*.62} ${y+ch},${x+cw*.66} ${y+ch+bottom*depth},${x+cw*.5} ${y+ch+bottom*depth} C ${x+cw*.34} ${y+ch+bottom*depth},${x+cw*.38} ${y+ch},${x+cw*.34} ${y+ch} L ${x} ${y+ch}`,
   left===0?`L ${x} ${y}`:`L ${x} ${y+ch*.66} C ${x} ${y+ch*.62},${x-left*depth} ${y+ch*.66},${x-left*depth} ${y+ch*.5} C ${x-left*depth} ${y+ch*.34},${x} ${y+ch*.38},${x} ${y+ch*.34} L ${x} ${y}`,'Z'].join(' ');
  return {id:r*cols+c,row:r,col:c,path,x,y,w:cw,h:ch};};
 return Array.from({length:rows},(_,r)=>Array.from({length:cols},(_,c)=>make(r,c))).flat();
}
function fmt(seconds:number){return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`}
function PieceSvg({piece,image,className}:{piece:Piece;image:string;className?:string}){const pad=Math.min(piece.w,piece.h)*.22;const clip=`clip-${piece.id}-${piece.w}`.replaceAll('.','-');return <svg className={className} viewBox={`${piece.x-pad} ${piece.y-pad} ${piece.w+pad*2} ${piece.h+pad*2}`} aria-hidden="true"><defs><clipPath id={clip}><path d={piece.path}/></clipPath><filter id={`shadow-${clip}`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity=".28"/></filter></defs><g clipPath={`url(#${clip})`} filter={`url(#shadow-${clip})`}><image href={image} x="0" y="0" width={W} height={H} preserveAspectRatio="none"/><path d={piece.path} fill="none" stroke="rgba(255,255,255,.72)" strokeWidth="4"/></g></svg>}

function sound(kind:'place'|'win',enabled:boolean){if(!enabled)return;const Ctx=window.AudioContext||(window as typeof window&{webkitAudioContext:typeof AudioContext}).webkitAudioContext;if(!Ctx)return;const ctx=new Ctx(),gain=ctx.createGain();gain.connect(ctx.destination);gain.gain.setValueAtTime(.08,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+(kind==='win'?.65:.16));(kind==='win'?[523,659,784]:[660]).forEach((f,i)=>{const o=ctx.createOscillator();o.type='sine';o.frequency.value=f;o.connect(gain);o.start(ctx.currentTime+i*.12);o.stop(ctx.currentTime+(kind==='win'?.55:.15)+i*.12)});setTimeout(()=>ctx.close(),900)}

export function JigsawPuzzle(){
 const [level,setLevel]=useState<Level>('Medium'),[phase,setPhase]=useState<'loading'|'preview'|'play'|'won'>('loading'),[count,setCount]=useState(10),[placed,setPlaced]=useState<number[]>([]),[moves,setMoves]=useState(0),[elapsed,setElapsed]=useState(0),[selected,setSelected]=useState<number|null>(null),[message,setMessage]=useState('Choose a mixed piece and solve it yourself.'),[soundOn,setSoundOn]=useState(true),[hint,setHint]=useState(false),[drag,setDrag]=useState<Drag>(null),[mixSeed,setMixSeed]=useState(()=>Date.now());const hintTimer=useRef<number>(0);
 const [cols,rows]=levels[level],pieces=useMemo(()=>piecesFor(cols,rows),[cols,rows]),image=IMAGES[level];
 const restart=useCallback(()=>{setMixSeed(v=>v+7919);setPhase('preview');setCount(10);setPlaced([]);setMoves(0);setElapsed(0);setSelected(null);setMessage('The pieces are mixed. Rebuild the picture without clues.');setHint(false);setDrag(null)},[]);
 useEffect(()=>{const img=new Image();img.src=image;img.decode().catch(()=>{}).finally(()=>restart())},[restart,image]);
 useEffect(()=>{if(phase!=='preview')return;const start=Date.now();const timer=window.setInterval(()=>{const left=Math.max(0,10-Math.floor((Date.now()-start)/1000));setCount(left);if(Date.now()-start>=10000){clearInterval(timer);setPhase('play');setMessage('No clues now—choose a mixed piece and solve the forest.')}},100);return()=>clearInterval(timer)},[phase,level]);
 useEffect(()=>{if(phase!=='play')return;const timer=window.setInterval(()=>setElapsed(v=>v+1),1000);return()=>clearInterval(timer)},[phase]);
 useEffect(()=>()=>{clearTimeout(hintTimer.current)},[]);
 const attempt=(id:number,slot:number)=>{if(placed.includes(id)||phase!=='play')return;setMoves(v=>v+1);setSelected(null);if(id===slot){const next=[...placed,id];setPlaced(next);sound('place',soundOn);setMessage('Perfect fit! That piece is home.');if(next.length===pieces.length){setPhase('won');sound('win',soundOn)}}else setMessage('Almost! Try a different space.')};
 const showPicture=()=>{if(phase!=='play')return;setHint(true);clearTimeout(hintTimer.current);hintTimer.current=window.setTimeout(()=>setHint(false),2000)};
 const pointerDown=(e:React.PointerEvent,id:number)=>{if(phase!=='play')return;e.currentTarget.setPointerCapture(e.pointerId);setDrag({id,x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,moved:false})};
 const pointerMove=(e:React.PointerEvent)=>setDrag(d=>d?{...d,x:e.clientX,y:e.clientY,moved:d.moved||Math.hypot(e.clientX-d.startX,e.clientY-d.startY)>7}:null);
 const pointerUp=(e:React.PointerEvent,id:number)=>{const d=drag;setDrag(null);const slot=document.elementFromPoint(e.clientX,e.clientY)?.closest<HTMLElement>('[data-slot]');if(d?.moved&&slot)attempt(id,Number(slot.dataset.slot));else setSelected(v=>v===id?null:id)};
 const progress=Math.round(placed.length/pieces.length*100),loose=useMemo(()=>pieces.filter(p=>!placed.includes(p.id)).sort((a,b)=>{const rank=(id:number)=>{let n=(id+1)*2654435761+mixSeed;n^=n>>>16;return n>>>0};return rank(a.id)-rank(b.id)}),[pieces,placed,mixSeed]);
 return <section className="puzzleGame" aria-label="Enchanted forest jigsaw puzzle">
  <div className="puzzleToolbar"><div className="difficulty" aria-label="Difficulty">{(Object.keys(levels) as Level[]).map(l=><button className={l===level?'active':''} onClick={()=>{setLevel(l);restart()}} key={l}>{l}<small>{levels[l][0]*levels[l][1]} pieces</small></button>)}</div><div className="gameActions"><button onClick={showPicture} disabled={phase!=='play'}>Show picture</button><button onClick={restart}>Restart</button><button onClick={()=>setSoundOn(v=>!v)} aria-pressed={soundOn}>{soundOn?'Sound on':'Sound off'}</button></div></div>
  <div className="gameStats"><span><b>{moves}</b> Moves</span><span><b>{fmt(elapsed)}</b> Time</span><span><b>{placed.length}/{pieces.length}</b> Placed</span><span><b>{pieces.length-placed.length}</b> Remaining</span><div className="progress"><i style={{width:`${progress}%`}}/><span>{progress}%</span></div></div>
  <p className="gameMessage" aria-live="polite">{phase==='preview'?`Look carefully! ${count>0?count:''}`:message}</p>
  <div className="puzzleLayout">
   <div className="boardFrame"><div className="puzzleBoard">
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="boardOutlines" aria-label="Empty puzzle board without placement clues">{pieces.map(p=><path key={p.id} d={p.path} data-slot={p.id} onClick={()=>selected!==null&&attempt(selected,p.id)}/>)}</svg>
    {placed.map(id=><svg key={id} className="placedPiece" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"><defs><clipPath id={`board-${level}-${id}`}><path d={pieces[id].path}/></clipPath></defs><image href={image} width={W} height={H} preserveAspectRatio="none" clipPath={`url(#board-${level}-${id})`}/></svg>)}
    {(phase==='preview'||hint||phase==='won')&&<div className="picturePreview"><img src={image} alt="The enchanted forest puzzle illustration"/>{phase==='preview'&&<div><b>{count||'Go!'}</b><span>Remember where everyone belongs.</span></div>}</div>}
   </div></div>
   <aside className="pieceTray"><div><span>Mixed pieces</span><b>{loose.length} to place</b></div><p className="trayInstruction">Drag a piece to the board, or tap a piece and then tap a space.</p><div className="trayGrid" style={{'--tray-cols':Math.min(cols,4)} as React.CSSProperties}>{loose.map((p,i)=><button key={`${mixSeed}-${p.id}`} style={{'--deal-delay':`${Math.min(i,12)*35}ms`} as React.CSSProperties} className={`loosePiece ${selected===p.id?'selected':''} ${drag?.id===p.id?'dragSource':''}`} onPointerDown={e=>pointerDown(e,p.id)} onPointerMove={pointerMove} onPointerUp={e=>pointerUp(e,p.id)} aria-label={`Puzzle piece ${p.id+1}${selected===p.id?', selected':''}`}><PieceSvg piece={p} image={image}/></button>)}</div>{!loose.length&&<p className="emptyTray">Every piece found its home.</p>}</aside>
  </div>
  {drag&&<div className="dragPiece" style={{left:drag.x,top:drag.y}}><PieceSvg piece={pieces[drag.id]} image={image}/></div>}
  {phase==='won'&&<div className="winOverlay" role="dialog" aria-modal="true" aria-labelledby="win-title"><div className="confetti" aria-hidden="true">{Array.from({length:28},(_,i)=><i key={i} style={{'--i':i} as React.CSSProperties}/>)}</div><div className="winCard"><span className="winKicker">The forest is whole again</span><h2 id="win-title">Jigsaw complete!</h2><p className="winLead">You rebuilt the enchanted forest!</p><p>Brilliant work! Every piece and every forest friend is exactly where it belongs.</p><div><b>{moves} moves</b><b>{fmt(elapsed)}</b></div><button className="button primary" onClick={restart}>Play Again</button><button className="textButton" onClick={()=>{setLevel(level==='Easy'?'Medium':level==='Medium'?'Hard':'Easy');restart()}}>Try Another Level</button></div></div>}
 </section>
}
