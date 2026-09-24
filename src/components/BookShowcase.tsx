export function BookShowcase(){
  return <section className="bookshelfShowcase" aria-labelledby="bookshelfShowcaseTitle">
    <div className="bookshelfShowcaseInner">
      <div className="bookshelfShowcaseArt">
        <div className="bookshelfShowcaseHalo" aria-hidden="true"/>
        <div className="bookshelfShowcaseBook">
          
          <img src="/assets/the-soul-of-the-forest-book-3d-optimized.png" alt="The Soul of the Forest illustrated book cover by Vaani Halwasiya" loading="lazy"/>
          
        </div>
        <span className="bookshelfShowcaseSparkle" aria-hidden="true">✦</span>
      </div>
      <div className="bookshelfShowcaseCopy">
        <span className="bookshelfShowcaseEyebrow">The featured story</span>
        <h2 id="bookshelfShowcaseTitle">The Soul <em>of the Forest.</em></h2>
        <p className="bookshelfShowcaseSub">A little voice. A forest full of heart.</p>
        <p>Follow Voz and her forest friends through an illustrated story about feelings, friendship, kindness, and finding the courage to be heard.</p>
        <p>Every page invites young readers to notice what they feel and discover the little things that help them find their way back to happiness.</p>
        <div className="bookshelfShowcaseTags" aria-label="Story themes"><span>Illustrated story</span><span>Friendship</span><span>Every feeling belongs</span></div>
        <div className="bookshelfShowcaseActions"><a className="bookshelfShowcasePrimary" href="/contact">Buy your book now <b aria-hidden="true">↗</b></a><a className="bookshelfShowcaseSecondary" href="#characters">Meet the forest friends <b aria-hidden="true">↑</b></a></div>
      </div>
    </div>
  </section>;
}
