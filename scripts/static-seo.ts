import type {Plugin} from 'vite';
import {cover,entities,host,pages} from './seo-data';
type Page=readonly[string,string,string,string];
function tags(p:Page){
 const [path,title,description,type]=p,url=host+path;
 const crumbs=path==='/'?[]:[{'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:host+'/'},{'@type':'ListItem',position:2,name:path.slice(1),item:url}]}];
 const page={'@type':path==='/about'?'ProfilePage':path==='/books'?'CollectionPage':'WebPage','@id':url+'#webpage',url,isPartOf:{'@id':host+'/#website'},about:{'@id':path==='/books'?host+'/books#book':host+'/#author'},inLanguage:'en'};
 const schema=JSON.stringify({'@context':'https://schema.org','@graph':[...entities,page,...crumbs]}).replaceAll('<','\\u003c');
 return [title,description,type,url,schema].join('|||');
}
export const staticSeo=():Plugin=>({name:'static-route-seo',apply:'build',enforce:'post',generateBundle(_,bundle){
 const asset=bundle['index.html'];
 if(!asset||asset.type!=='asset'||typeof asset.source!=='string')return;
 const base=asset.source.replace(/<title>.*?<\/title>/i,'').replace(/<meta name=.+?description.+?>/i,'').replace(/<meta property=.+?og:.+?>/gi,'');
 for(const [name,p] of Object.entries(pages)){
  const html=base.replace('</head>',head(p)+'</head>');
  if(name==='home')asset.source=html;else this.emitFile({type:'asset',fileName:name+'/index.html',source:html});
 }
}});
function head(p:Page){
 const [title,description,type,url,schema]=tags(p).split('|||');
 return `<title>${title}</title>
<meta name='description' content='${description}'/><meta name='robots' content='index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'/>
<link rel='canonical' href='${url}'/>
<meta property='og:locale' content='en_US'/><meta property='og:type' content='${type}'/><meta property='og:site_name' content='Vaani’s World'/>
<meta property='og:title' content='${title}'/><meta property='og:description' content='${description}'/><meta property='og:url' content='${url}'/>
<meta property='og:image' content='${cover}'/><meta property='og:image:alt' content='The Soul of the Forest illustrated children’s book'/>
<meta name='twitter:card' content='summary_large_image'/><meta name='twitter:title' content='${title}'/><meta name='twitter:description' content='${description}'/><meta name='twitter:image' content='${cover}'/>
<script type='application/ld+json'>${schema}</script>`;
}
