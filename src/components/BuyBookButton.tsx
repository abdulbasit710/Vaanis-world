import {useEffect,useRef} from 'react';
import {createPortal} from 'react-dom';
import {bookRetailers} from '../data/bookRetailers';

export function BuyBookButton({className}:{className:string}){
  const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{
    const element=dialog.current;
    if(!element)return;
    let previousOverflow='';
    const observer=new MutationObserver(()=>{
      if(element.open){previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';}
      else document.body.style.overflow=previousOverflow;
    });
    observer.observe(element,{attributes:true,attributeFilter:['open']});
    return()=>{observer.disconnect();if(element.open)document.body.style.overflow=previousOverflow;};
  },[]);
  return <>
    <button type="button" className={className} onClick={()=>dialog.current?.showModal()} aria-haspopup="dialog">Buy your copy now <b aria-hidden="true">↗</b></button>
    {createPortal(<dialog ref={dialog} className="bookPurchaseDialog" aria-labelledby="bookPurchaseTitle" aria-describedby="bookPurchaseDescription" onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close();}}>
      <div className="bookPurchasePanel">
        <button type="button" className="bookPurchaseClose" aria-label="Close store selector" onClick={()=>dialog.current?.close()} autoFocus>×</button>
        <span className="bookPurchaseEyebrow">Bring the forest home</span>
        <h2 id="bookPurchaseTitle">Choose your bookstore.</h2>
        <p id="bookPurchaseDescription">Find The Soul of the Forest at your favourite store. Each link opens in a new tab.</p>
        <div className="bookPurchaseStores">{bookRetailers.map(store=><a key={store.name} href={store.url} target="_blank" rel="noopener noreferrer" aria-label={`Buy The Soul of the Forest at ${store.name} (opens in a new tab)`}>
          <span className="bookPurchaseLogo"><img src={store.logo} alt={store.name}/></span>
          <span>{store.name}<b aria-hidden="true">↗</b></span>
        </a>)}</div>
      </div>
    </dialog>,document.body)}
  </>;
}
