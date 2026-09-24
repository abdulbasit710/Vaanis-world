import type {CSSProperties,ReactNode} from 'react';

type InfiniteSliderProps={
  children:ReactNode;
  duration?:number;
  className?:string;
};

export function InfiniteSlider({children,duration=28,className=''}:InfiniteSliderProps){
  return <div className={`infiniteSlider ${className}`} style={{'--slider-duration':`${duration}s`} as CSSProperties}>
    <div className="infiniteSliderTrack">
      <div className="infiniteSliderGroup">{children}</div>
      <div className="infiniteSliderGroup" aria-hidden="true">{children}</div>
    </div>
  </div>;
}
