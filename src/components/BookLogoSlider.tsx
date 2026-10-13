import {InfiniteSlider} from './ui/infinite-slider';
import {bookRetailers} from '../data/bookRetailers';

export function BookLogoSlider(){
  return <section className="bookLogoSection" aria-labelledby="bookLogoTitle">
    <div className="bookLogoHeading">
      <span>Available at your favourite bookstores</span>
      <h2 id="bookLogoTitle">A story that travels.</h2>
    </div>
    <InfiniteSlider duration={26} className="bookLogoMarquee">
      {bookRetailers.map(store=><a className="bookLogoCard" key={store.name} href={store.url} target="_blank" rel="noopener noreferrer" aria-label={`Buy at ${store.name} (opens in a new tab)`}><img src={store.logo} alt={store.name} loading="lazy"/></a>)}
    </InfiniteSlider>
  </section>;
}
