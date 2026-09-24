type InnerBannerProps = {
  title: string;
  tagline: string;
  eyebrow?: string;
};

export function InnerBanner({title,tagline,eyebrow='Welcome to the forest'}:InnerBannerProps){
  return <section className="innerBanner" aria-labelledby="innerBannerTitle">
    <img className="innerBannerImage" src="/assets/inner-pages-forest-banner.png" alt="" fetchPriority="high"/>
    <div className="innerBannerShade"/>
    <div className="innerBannerContent">
      <span className="innerBannerEyebrow">{eyebrow}</span>
      <h1 id="innerBannerTitle">{title}</h1>
      <p>{tagline}</p>
    </div>
  </section>;
}
