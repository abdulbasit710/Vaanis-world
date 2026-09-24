import {useState} from 'react';
import type {KeyboardEvent} from 'react';

const count=17;
const pageSrc=(page:number)=>`/assets/manuscript/page-${String(page).padStart(2,'0')}.jpg`;

export function ManuscriptReader(){
  const [page,setPage]=useState(1);
  const change=(next:number)=>setPage(Math.min(count,Math.max(1,next)));
  const onKeyDown=(event:KeyboardEvent<HTMLElement>)=>{
    if(event.key==='ArrowLeft'){change(page-1);event.preventDefault()}
    if(event.key==='ArrowRight'){change(page+1);event.preventDefault()}
  };

  return <section id="manuscript" className="manuscriptReader" aria-labelledby="manuscriptTitle" onKeyDown={onKeyDown} tabIndex={0}>
    <div className="manuscriptReaderHead">
      <div><span>From Vaani's pages</span><h2 id="manuscriptTitle">Step inside <em>the manuscript.</em></h2><p>Browse all 17 illustrated spreads of <i>The Soul of the Forest</i>, from the opening page to the last.</p></div>
      <a href="/assets/manuscript/the-soul-of-the-forest-manuscript.pdf" download="The-Soul-of-the-Forest-Manuscript.pdf">Download manuscript <b aria-hidden="true">↓</b></a>
    </div>
    <div className="manuscriptReaderFrame">
      <figure><img src={pageSrc(page)} alt={`Illustrated manuscript spread ${page} of ${count}`}/><figcaption aria-live="polite">Spread {String(page).padStart(2,'0')} / {count}</figcaption></figure>
      <div className="manuscriptReaderControls"><button type="button" onClick={()=>change(page-1)} disabled={page===1} aria-label="Previous manuscript spread">←</button><div className="manuscriptReaderProgress" aria-hidden="true"><span style={{width:`${page/count*100}%`}}/></div><button type="button" onClick={()=>change(page+1)} disabled={page===count} aria-label="Next manuscript spread">→</button></div>
    </div>
    <div className="manuscriptReaderThumbs" aria-label="Choose a manuscript spread">{Array.from({length:count},(_,i)=><button type="button" key={i+1} onClick={()=>change(i+1)} aria-label={`Open spread ${i+1}`} aria-current={page===i+1?'page':undefined}><img src={pageSrc(i+1)} alt="" loading="lazy"/><span>{String(i+1).padStart(2,'0')}</span></button>)}</div>
  </section>;
}
