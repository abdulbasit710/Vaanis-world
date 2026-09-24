import {InfiniteSlider} from './ui/infinite-slider';

const logos=[
  {name:'Amazon Kindle',src:'/assets/amazon-color.png'},
  {name:'Barnes & Noble',src:'/assets/barnes-noble-color.png'},
  {name:'CreateSpace',src:'/assets/createspace-color.png'},
  {name:'Kobo',src:'/assets/kobo-color.png'}
];

export function BookLogoSlider(){
  return <section className="bookLogoSection" aria-labelledby="bookLogoTitle">
    <div className="bookLogoHeading">
      <span>Beyond the forest</span>
      <h2 id="bookLogoTitle">A story that travels.</h2>
    </div>
    <InfiniteSlider duration={26} className="bookLogoMarquee">
      {logos.map(logo=><div className="bookLogoCard" key={logo.name}><img src={logo.src} alt={logo.name} loading="lazy"/></div>)}
    </InfiniteSlider>
  </section>;
}
