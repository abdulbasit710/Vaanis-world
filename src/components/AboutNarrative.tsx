import {useEffect,useRef} from 'react';

export function AboutNarrative(){
  const sectionRef=useRef<HTMLElement>(null);

  useEffect(()=>{
    const section=sectionRef.current;
    if(!section)return;
    const items=section.querySelectorAll<HTMLElement>('.aboutReveal');
    if(!('IntersectionObserver' in window)){
      items.forEach(item=>item.classList.add('is-visible'));
      return;
    }
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.16,rootMargin:'0px 0px -5% 0px'});
    items.forEach(item=>observer.observe(item));
    return ()=>observer.disconnect();
  },[]);

  return <section id="vaani-story" ref={sectionRef} className="aboutNarrative aboutNarrativeReveal">
    <div className="aboutNarrativeIntro">
      <span className="aboutReveal">Why she wrote the book</span>
      <h2 className="aboutReveal">Every feeling has a place in the forest.</h2>
      <div className="aboutNarrativeAccent aboutReveal" aria-hidden="true"/>
      <p className="aboutNarrativeAside aboutReveal">A story that makes room for every mood, and for the people who help us through them.</p>
    </div>
    <div className="aboutNarrativeText">
      <p className="aboutReveal">Vaani wrote <i>The Soul of the Forest</i> to bring children joy and encourage kindness, especially toward the mothers and caregivers who do so much for them. She wanted a story where every feeling could be noticed rather than hidden.</p>
      <p className="aboutReveal">Vaani describes an overwhelming mood as a little “monster” that can appear from time to time. Learning what brings it out is the first step. Rest, play, a song, creativity, or a patient friend can help that feeling settle.</p>
      <blockquote className="aboutReveal">It is okay to feel like Knotty, Dottie, or Nancy. There is always a path back to Voz.</blockquote>
      <p className="aboutReveal">The friends in her forest reflect parts of her own life: Dottie rests when she needs to feel better, Mona comes alive with friends, Nancy knows frustration, and Knotty needs reassurance when anxiety ties him in knots. Voz reminds Vaani of the joy of singing and being herself.</p>
      <p className="aboutReveal">At the heart of the book is Vaani’s love for her mother. She sees Mama as a queen and superhero who cares for the whole family. The story is also a reminder that mothers need time to look after their own feelings and enjoy the things that make them happy.</p>
      <p className="aboutReveal">Meeting children at Manzil deepened Vaani’s wish to make a forest for everyone. She saw many ways to speak, play, and share feelings. Her dream is a place where children can sing, paint, move, learn, and know that friendship helps them do more than they imagined.</p>
    </div>
  </section>;
}
