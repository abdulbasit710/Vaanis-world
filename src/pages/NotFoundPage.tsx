import {Seo} from '../components/Seo';
export function NotFoundPage(){return <main className='notFound'><Seo title='Page Not Found | Vaani Halwasiya' description='The page you requested could not be found.' path={location.pathname}/><p>404 · A lost forest path</p><h1>This story page could not be found.</h1><a className='button primary' href='/'>Return to the forest</a></main>}
