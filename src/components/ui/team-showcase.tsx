import {motion} from 'framer-motion';

export interface TeamMember{name:string;role:string;imageSrc:string;themeColor:string}
interface TeamShowcaseProps{eyebrow?:string;title:string;description:string;buttonText?:string;buttonHref?:string;members:TeamMember[]}

const container={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.12}}};
const card={hidden:{opacity:0,scale:.96},visible:{opacity:1,scale:1,transition:{duration:.45,ease:'easeOut' as const}}};

export function TeamShowcase({eyebrow='Meet the neighbours',title,description,buttonText='Discover their stories',buttonHref='/bookshelf',members}:TeamShowcaseProps){return <section id="characters" className="teamShowcase">
 <div className="teamShowcaseHead">
  <span>{eyebrow}</span>
  <h2>{title}</h2>
  <p>{description}</p>
  <a href={buttonHref}>{buttonText}<b>↗</b></a>
 </div>
 <motion.div className="teamShowcaseGrid" variants={container} initial="hidden" whileInView="visible" viewport={{once:true,amount:.2}}>
  {members.map((member,index)=><motion.article key={member.name} variants={card} whileHover={{y:-12,scale:1.025}} style={{'--card-tone':member.themeColor,'--card-index':index} as React.CSSProperties}>
   <div className="teamCardCopy"><h3>{member.name}</h3><p>{member.role}</p></div>
   <img src={member.imageSrc} alt={`${member.name}, ${member.role}`}/>
  </motion.article>)}
 </motion.div>
 </section>}
