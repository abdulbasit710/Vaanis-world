export const host='https://www.vaanisworld.com';
export const cover=host+'/assets/soul-of-the-forest-front-cover.png';
export const pages={
 home:['/','Vaani Halwasiya | Children’s Author | The Soul of the Forest','Discover Vaani Halwasiya, young children’s author of The Soul of the Forest, a magical illustrated story about feelings, friendship and finding your voice.','website'],
 about:['/about','About Vaani Halwasiya | Children’s Book Author','Meet Vaani Halwasiya, the young children’s book author behind The Soul of the Forest, and discover how feelings, family and imagination inspire her stories.','profile'],
 books:['/books','Children’s Books by Vaani Halwasiya','Explore The Soul of the Forest by children’s author Vaani Halwasiya, an illustrated story about kindness, friendship, emotions and finding your voice.','book'],
 contact:['/contact','Contact Vaani Halwasiya | Author Enquiries','Contact Vaani Halwasiya’s team about reader messages, school and library visits, children’s events, interviews and thoughtful collaborations.','website'],
} as const;
export const entities=[
 {'@type':'Person','@id':host+'/#author',name:'Vaani Halwasiya',url:host+'/about',jobTitle:'Children’s Book Author',image:host+'/assets/vaani-author.jpeg',sameAs:['https://www.facebook.com/profile.php?id=61594459104680','https://www.instagram.com/authorvaani/','https://www.youtube.com/channel/UC53QiDpBbMLY1l9SyibE1Ug','https://x.com/authorvaani','https://www.linkedin.com/in/authorvaani-halwasiya-360889433/']},
 {'@type':'Book','@id':host+'/books#book',name:'The Soul of the Forest',url:host+'/books',author:{'@id':host+'/#author'},image:cover,genre:['Children’s literature','Picture book'],inLanguage:'en',audience:{'@type':'PeopleAudience',suggestedMinAge:4,suggestedMaxAge:12}},
 {'@type':'Organization','@id':host+'/#organization',name:'Vaani’s World',url:host,logo:{'@type':'ImageObject',url:host+'/assets/brand/vaani-logo.png'},sameAs:['https://www.facebook.com/profile.php?id=61594459104680','https://www.instagram.com/authorvaani/','https://www.youtube.com/channel/UC53QiDpBbMLY1l9SyibE1Ug','https://x.com/authorvaani','https://www.linkedin.com/in/authorvaani-halwasiya-360889433/']},
 {'@type':'WebSite','@id':host+'/#website',name:'Vaani’s World',alternateName:'Vaani Halwasiya',url:host,publisher:{'@id':host+'/#organization'},inLanguage:'en'},
];
