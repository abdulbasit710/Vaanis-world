const questions=[
  {question:'Why did Vaani write The Soul of the Forest?',answer:'Vaani wanted children to notice their feelings and see that every mood has a place. Her story offers gentle ways to feel more like themselves again, through rest, play, creativity, music, and being heard.'},
  {question:'Are the forest friends inspired by Vaani?',answer:'Yes. The characters reflect different parts of her own experience. Dottie needs rest, Mona loves to play, Nancy can feel frustrated, Knotty worries, and Voz finds joy in her voice.'},
  {question:'How did Vaani’s mother inspire the story?',answer:'Vaani sees her mother as a queen and superhero who cares for everyone. Their bond shaped the story’s message that mothers deserve care and time for themselves too.'},
  {question:'What did Vaani learn from Manzil?',answer:'Meeting children at Manzil helped Vaani understand that people communicate and experience the world in different ways. That understanding helped shape a forest where every child belongs.'},
  {question:'What does Vaani hope to create next?',answer:'She hopes to create a playful forest space at Manzil with music, painting, movement, a climbing wall, and a Cherry Jerry tree of knowledge.'}
];

export function AboutFaq(){
  return <section className="aboutFaq" aria-labelledby="aboutFaqTitle">
    <div className="aboutFaqInner">
      <div className="aboutFaqHeading">
        <span>Get to know Vaani</span>
        <h2 id="aboutFaqTitle">Questions from the forest.</h2>
        <p>A few little answers about the story, the people behind it, and the feelings that bring the forest to life.</p>
      </div>
      <div className="aboutFaqList">
        {questions.map(({question,answer},index)=><details key={question}>
          <summary><span>{String(index+1).padStart(2,'0')}</span><strong>{question}</strong><i aria-hidden="true">+</i></summary>
          <p>{answer}</p>
        </details>)}
      </div>
    </div>
  </section>;
}
