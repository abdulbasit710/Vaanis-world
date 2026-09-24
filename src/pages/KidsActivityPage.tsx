import {InnerBanner} from '../components/InnerBanner';
import {JigsawPuzzle} from '../components/JigsawPuzzle';
import {WordScramble} from '../components/WordScramble';

export function KidsActivityPage(){return <main className="activityPage"><InnerBanner title="Kids Activity" eyebrow="Play in the forest" tagline="Little hands, bright ideas, and a forest full of playful discoveries."/>
 
 
 <section id="play-puzzle" className="activityIntro"><p>Forest activity no. 01</p><h2>A little memory.<br/>A lot of magic.</h2><p>Look closely for ten seconds. When the picture disappears, rebuild it one wonderful piece at a time.</p></section>
 <JigsawPuzzle/>
 <WordScramble/>
 <section className="activityBenefits"><article><span>01</span><h3>Look closely</h3><p>Build visual memory by noticing tiny details in the forest and manuscript.</p></article><article><span>02</span><h3>Think creatively</h3><p>Fit puzzle pieces and arrange letters while learning through play.</p></article><article><span>03</span><h3>Celebrate</h3><p>Complete each challenge and celebrate every small discovery.</p></article></section>
 </main>}

export function HomeActivity(){return <section className="homeActivity"><div className="homeActivityArt"><img loading="lazy" src="/assets/enchanted-forest-puzzle.jpg" alt="The enchanted forest jigsaw scene"/><div className="miniPieces" aria-hidden="true"><i/><i/><i/></div></div><div className="homeActivityCopy"><span>Play in the forest</span><h2>A story you can piece together.</h2><p>Look carefully, remember every forest friend, then rebuild the magical scene in a real interactive jigsaw.</p><div className="activityChips"><b>3 levels</b><b>6–20 pieces</b><b>Touch friendly</b></div><a className="button primary" href="/kids-activity">Open Kids Activity <b>↗</b></a></div></section>}
