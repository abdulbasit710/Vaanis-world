import {Navigate,Route,Routes} from 'react-router-dom';
import App,{Footer} from './App';
import {Seo} from './components/Seo';
import {CurvedMenu,type MenuItem} from './components/ui/curved-menu';
import {siteContent as c} from './data/siteContent';
import {PageShell} from './pages/PageShell';
import {KidsActivityPage} from './pages/KidsActivityPage';
import {NotFoundPage} from './pages/NotFoundPage';
const notes=['Enter the enchanted forest','Meet the imagination behind the story','Discover every book and world','Play, create, and learn together','Send a note to Vaani'];
const items:MenuItem[]=c.nav.map(([heading,href],i)=>({heading,href,subheading:notes[i]}));
const socialProfiles=['https://www.facebook.com/profile.php?id=61594459104680','https://www.instagram.com/authorvaani/','https://www.youtube.com/channel/UC53QiDpBbMLY1l9SyibE1Ug','https://x.com/authorvaani','https://www.linkedin.com/in/authorvaani-halwasiya-360889433/'];
const author={'@context':'https://schema.org','@type':'Person',name:'Vaani Halwasiya',url:'https://www.vaanisworld.com/about',jobTitle:'Children’s Author',sameAs:socialProfiles};
const book={'@context':'https://schema.org','@type':'Book',name:'The Soul of the Forest',author:{'@type':'Person',name:'Vaani Halwasiya'},image:'https://www.vaanisworld.com/assets/soul-of-the-forest-front-cover.png',genre:'Children’s literature'};
const organization={'@context':'https://schema.org','@type':'Organization',name:'Vaani’s World',url:'https://www.vaanisworld.com',logo:'https://www.vaanisworld.com/assets/brand/vaani-logo.png',sameAs:socialProfiles};
const website={'@context':'https://schema.org','@type':'WebSite',name:'Vaani’s World',url:'https://www.vaanisworld.com'};
function Shell({children}:{children:React.ReactNode}){return <><CurvedMenu items={items}/>{children}<Footer/></>}
export default function RoutedApp(){return <Routes>
 <Route path='/' element={<><Seo title={'Vaani Halwasiya | Children\'s Author | The Soul of the Forest'} description='Discover Vaani Halwasiya, young children’s author of The Soul of the Forest, and meet her magical forest friends.' path='/' schema={[author,book,organization,website]}/><App/></>}/>
 <Route path='/about' element={<Shell><Seo title={'About Vaani Halwasiya | Children\'s Book Author'} description='Meet Vaani Halwasiya, the young children’s book author behind The Soul of the Forest.' path='/about' schema={author}/><PageShell page='about'/></Shell>}/>
 <Route path='/books' element={<Shell><Seo title={'Children\'s Books by Vaani Halwasiya'} description='Explore The Soul of the Forest and children’s books by author Vaani Halwasiya.' path='/books' type='book' schema={book}/><PageShell page='bookshelf'/></Shell>}/>
 <Route path='/contact' element={<Shell><Seo title='Contact Vaani Halwasiya' description='Contact Vaani Halwasiya’s team about reader messages, schools, libraries, events, press, and collaborations.' path='/contact'/><PageShell page='contact'/></Shell>}/>
 <Route path='/kids-activity' element={<Shell><KidsActivityPage/></Shell>}/>
 <Route path='/bookshelf' element={<Navigate to='/books' replace/>}/>
 <Route path='*' element={<Shell><NotFoundPage/></Shell>}/>
 </Routes>}
