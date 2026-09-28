import type {Plugin} from 'vite';
import {cover,entities,host,pages} from './seo-data';
type Page=readonly[string,string,string,string];
const snapshots:Record<string,string>={
 home:`<main class="seoSnapshot"><h1>The Soul of the Forest by Vaani Halwasiya</h1><p>The official website of Vaani Halwasiya, author of <em>The Soul of the Forest</em>.</p><p>Discover an illustrated children’s story about feelings, friendship, kindness, family and finding your voice. Meet Voz, Dottie, Mona, Nancy, Knotty, Bumpy and Cherry Jerry in a magical forest.</p><nav><a href="/about">About Vaani Halwasiya</a> <a href="/books">Explore The Soul of the Forest</a> <a href="/kids-activity">Kids activities</a></nav></main>`,
 about:`<main class="seoSnapshot"><h1>Vaani Halwasiya, Children’s Book Author</h1><p>Vaani Halwasiya is the young author of <em>The Soul of the Forest</em>, an illustrated story inspired by feelings, family, friendship, kindness and imagination.</p><p>Learn about Vaani’s creative journey and the forest friends who help children recognize and understand their emotions.</p><a href="/books">Read about The Soul of the Forest</a></main>`,
 books:`<main class="seoSnapshot"><h1>The Soul of the Forest by Vaani Halwasiya</h1><p><em>The Soul of the Forest</em> is an illustrated children’s book by Vaani Halwasiya about emotions, kindness, friendship, family and the courage to find your voice.</p><p>Meet Voz and her forest friends in a warm story where every feeling has a place.</p><a href="/about">Meet author Vaani Halwasiya</a></main>`,
 contact:`<main class="seoSnapshot"><h1>Contact Vaani Halwasiya</h1><p>Contact the team behind author Vaani Halwasiya and <em>The Soul of the Forest</em> for reader messages, schools, libraries, events, interviews and collaborations.</p></main>`,
 activity:`<main class="seoSnapshot"><h1>The Soul of the Forest Kids Activities</h1><p>Play children’s puzzles and creative activities inspired by Vaani Halwasiya’s illustrated book, <em>The Soul of the Forest</em>.</p><a href="/books">Discover the book</a></main>`,
};
const faq={'@type':'FAQPage','@id':host+'/#faq',mainEntity:[
 {'@type':'Question',name:'What is The Soul of the Forest about?',acceptedAnswer:{'@type':'Answer',text:'It is an illustrated forest story about friendship, feelings, kindness, and finding a way back to happiness.'}},
 {'@type':'Question',name:'Which themes does the story explore?',acceptedAnswer:{'@type':'Answer',text:'It explores everyday emotions and the comfort children find in friendship, family, rest, creativity, and music.'}},
 {'@type':'Question',name:'Who lives in the forest?',acceptedAnswer:{'@type':'Answer',text:'Cherry Jerry is joined by Voz, Dottie, Mona, Nancy, Bumpy, and Knotty.'}},
 {'@type':'Question',name:'Can I preview the book?',acceptedAnswer:{'@type':'Answer',text:'Yes. Explore the selected illustrated scenes in the preview on this page.'}},
 {'@type':'Question',name:'Where can I purchase the book?',acceptedAnswer:{'@type':'Answer',text:'Purchase details are coming soon.'}}
]};
function tags(p:Page){
 const [path,title,description,type]=p,url=host+path;
 const key=path==='/'?'home':path==='/kids-activity'?'activity':path.slice(1);
 const label=key==='activity'?'Kids Activity':key.charAt(0).toUpperCase()+key.slice(1);
 const crumbs=path==='/'?[]:[{'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:host+'/'},{'@type':'ListItem',position:2,name:label,item:url}]}];
 const page={'@type':path==='/about'?'ProfilePage':path==='/books'?'CollectionPage':'WebPage','@id':(path==='/'?url:url.replace(/\/$/,''))+'#webpage',url,name:title,description,isPartOf:{'@id':host+'/#website'},about:{'@id':path==='/books'?host+'/books#book':host+'/#author'},primaryImageOfPage:{'@type':'ImageObject',url:cover,width:1800,height:1800},inLanguage:'en'};
 const extras=path==='/'?[faq]:[];
 const schema=JSON.stringify({'@context':'https://schema.org','@graph':[...entities,page,...extras,...crumbs]}).replaceAll('<','\\u003c');
 return [title,description,type,url,schema].join('|||');
}
export const staticSeo=():Plugin=>({name:'static-route-seo',apply:'build',enforce:'post',generateBundle(_,bundle){
 const asset=bundle['index.html'];
 if(!asset||asset.type!=='asset'||typeof asset.source!=='string')return;
 const base=asset.source.replace(/<title>.*?<\/title>/i,'').replace(/<meta\s+name=['"]description['"][^>]*>/i,'').replace(/<meta\s+property=['"]og:[^'"]+['"][^>]*>/gi,'');
 for(const [name,p] of Object.entries(pages)){
  const html=base.replace('</head>',head(p)+'</head>').replace('<div id="root"></div>',`<div id="root">${snapshots[name]||''}</div>`);
  if(name==='home')asset.source=html;else this.emitFile({type:'asset',fileName:name+'/index.html',source:html});
 }
}});
function head(p:Page){
 const [title,description,type,url,schema]=tags(p).split('|||');
 const preload=url===host+'/'?"<link rel='preload' as='image' href='/assets/hero/hero-01-optimized.jpg' fetchpriority='high'/>\n":'';
 return `${preload}<title>${title}</title>
<meta name='description' content='${description}'/><meta name='robots' content='index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'/>
<link rel='canonical' href='${url}'/><link rel='author' href='${host}/about'/>
<meta name='author' content='Vaani Halwasiya'/><meta name='application-name' content='Vaani’s World'/>
<meta property='og:locale' content='en_US'/><meta property='og:type' content='${type}'/><meta property='og:site_name' content='Vaani’s World'/>
<meta property='og:title' content='${title}'/><meta property='og:description' content='${description}'/><meta property='og:url' content='${url}'/>
<meta property='og:image' content='${cover}'/><meta property='og:image:secure_url' content='${cover}'/><meta property='og:image:type' content='image/png'/><meta property='og:image:width' content='1800'/><meta property='og:image:height' content='1800'/><meta property='og:image:alt' content='The Soul of the Forest illustrated book by Vaani Halwasiya'/>
<meta name='twitter:card' content='summary_large_image'/><meta name='twitter:title' content='${title}'/><meta name='twitter:description' content='${description}'/><meta name='twitter:image' content='${cover}'/><meta name='twitter:image:alt' content='The Soul of the Forest illustrated book by Vaani Halwasiya'/>
<script id='seo-schema' type='application/ld+json'>${schema}</script>`;
}
