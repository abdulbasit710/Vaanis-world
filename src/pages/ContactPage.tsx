import {FormEvent,useState} from 'react';
import {InnerBanner} from '../components/InnerBanner';

const reasons=[
 {number:'01',title:'Reader messages',text:'Share what a story, character, or forest feeling meant to your family.'},
 {number:'02',title:'Schools & libraries',text:'Ask about readings, classroom conversations, library visits, and children’s events.'},
 {number:'03',title:'Press & collaborations',text:'Connect about interviews, creative partnerships, publishing, and thoughtful projects.'}
];

export function ContactPage(){
 const [sent,setSent]=useState(false);
 const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();setSent(true)};
 return <main className="contactPage">
  <InnerBanner title="Contact Vaani" eyebrow="Begin a conversation" tagline="For readers, schools, libraries, events, and thoughtful collaborations."/>
  <section className="contactStart">
   <div className="contactStartInner">
    <div className="contactCardIntro">
     <span>Stories begin with listening</span>
     <h2>Begin a conversation <em>with Vaani.</em></h2>
     <p>Whether you are reaching out as a reader, parent, teacher, librarian, or creative collaborator, every thoughtful note is welcome.</p>
     <div className="contactChannels"><article><i>01</i><div><b>Reader notes</b><small>Thoughts about the book and its forest friends</small></div></article><article><i>02</i><div><b>Schools & events</b><small>Readings, workshops, visits, and conversations</small></div></article><article><i>03</i><div><b>Creative enquiries</b><small>Publishing, press, and purposeful collaborations</small></div></article></div>
     <p className="contactGuardian">Messages from young readers should be sent with a parent, guardian, or teacher.</p>
    </div>
    <form className="contactForm" onSubmit={submit}>
     <div className="contactFormHead"><span>Send a little note</span><h2>How can we help?</h2><p>Complete the form and Vaani’s team can connect it to the right conversation.</p></div>
     <div className="contactFields">
      <label>First name<input name="firstName" autoComplete="given-name" required/></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required/></label>
      <label className="wide">What are you reaching out about?<select name="subject" required defaultValue=""><option value="" disabled>Select an enquiry</option><option>Reader message</option><option>School or library visit</option><option>Book and purchase question</option><option>Press or interview</option><option>Creative collaboration</option><option>Something else</option></select></label>
      <label className="wide">Subject<input name="title" required/></label>
      <label className="wide">Message<textarea name="message" rows={6} required/></label>
     </div>
     {sent?<div className="contactFormSuccess" role="status"><b>Thank you for writing.</b><span>Your message details are complete. External email delivery can be connected when the approved contact address is provided.</span><button type="button" onClick={()=>setSent(false)}>Write another note</button></div>:<div className="contactSubmit"><button type="submit">Prepare message <b>→</b></button><span>All fields are required.</span></div>}
    </form>
   </div>
  </section>
  <section className="contactStory">
   <div className="contactPortrait"><div><img src="/assets/vaani-author.jpeg" alt="Vaani Halwasiya with her dog"/></div><span className="portraitNote one">Young author</span><span className="portraitNote two">Big imagination</span><span className="portraitNote three">Kind stories</span></div>
   <div className="contactStoryCopy"><span>A note from the forest</span><h2>Stories mean more when they <em>start a conversation.</em></h2><p>Vaani’s world grew from feelings children know well: joy, tiredness, worry, frustration, friendship, and the comfort of someone who listens.</p><p>She hopes each message becomes another small bridge between young readers, families, teachers, and the stories that help us understand one another.</p><blockquote>“Every feeling deserves a place to belong.”</blockquote><div><a href="/about">Meet Vaani <b>↗</b></a><a href="/bookshelf">Explore the book</a></div></div>
  </section>
  <section className="contactReasons"><div className="contactReasonsHead"><span>Ways to connect</span><h2>What can you reach out about?</h2><p>Kind notes, useful questions, and thoughtful ideas are always a good place to begin.</p></div><div className="contactReasonGrid">{reasons.map(reason=><article key={reason.number}><span>{reason.number}</span><h3>{reason.title}</h3><p>{reason.text}</p></article>)}</div></section>
 </main>
}