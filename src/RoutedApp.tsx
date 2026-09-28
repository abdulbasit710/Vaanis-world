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
function Shell({children}:{children:React.ReactNode}){return <><CurvedMenu items={items}/>{children}<Footer/></>}
export default function RoutedApp(){return <Routes>
 <Route path='/' element={<><Seo title='The Soul of the Forest by Vaani Halwasiya | Official Website' description='Discover The Soul of the Forest by Vaani Halwasiya, a magical illustrated children’s book about feelings, friendship, kindness, family and finding your voice.' path='/'/><App/></>}/>
 <Route path='/about' element={<Shell><Seo title='Vaani Halwasiya | Children’s Book Author' description='Meet Vaani Halwasiya, author of The Soul of the Forest, and discover how feelings, family, kindness and imagination inspire her children’s stories.' path='/about' type='profile'/><PageShell page='about'/></Shell>}/>
 <Route path='/books' element={<Shell><Seo title='The Soul of the Forest | Book by Vaani Halwasiya' description='Explore The Soul of the Forest by Vaani Halwasiya, an illustrated children’s story about emotions, kindness, friendship and finding your voice.' path='/books' type='book'/><PageShell page='bookshelf'/></Shell>}/>
 <Route path='/contact' element={<Shell><Seo title='Contact Vaani Halwasiya | Author Enquiries' description='Contact Vaani Halwasiya’s team about reader messages, school and library visits, children’s events, interviews and collaborations.' path='/contact'/><PageShell page='contact'/></Shell>}/>
 <Route path='/kids-activity' element={<Shell><Seo title='Kids Activities | The Soul of the Forest' description='Play puzzles and creative children’s activities inspired by The Soul of the Forest, the illustrated book by Vaani Halwasiya.' path='/kids-activity'/><KidsActivityPage/></Shell>}/>
 <Route path='/bookshelf' element={<Navigate to='/books' replace/>}/>
 <Route path='*' element={<Shell><NotFoundPage/></Shell>}/>
 </Routes>}
