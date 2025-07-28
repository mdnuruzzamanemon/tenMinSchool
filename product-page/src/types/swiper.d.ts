declare module 'swiper/react' {
  import React from 'react';
  import { SwiperOptions } from 'swiper/types';
  
  export interface SwiperProps extends SwiperOptions {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
  
  export const Swiper: React.FC<SwiperProps>;
  export const SwiperSlide: React.FC<{ children?: React.ReactNode; className?: string; [key: string]: any }>;
}

declare module 'swiper/modules' {
  export const Navigation: any;
  export const Pagination: any;
  export const Scrollbar: any;
  export const Autoplay: any;
  export const EffectFade: any;
  export const EffectCube: any;
  export const EffectFlip: any;
  export const EffectCoverflow: any;
  export const Thumbs: any;
  export const Zoom: any;
  export const Controller: any;
  export const A11y: any;
  export const History: any;
  export const HashNavigation: any;
  export const Keyboard: any;
  export const Mousewheel: any;
  export const Parallax: any;
  export const Virtual: any;
  export const FreeMode: any;
  export const Grid: any;
  export const Manipulation: any;
}

declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
declare module 'swiper/css/scrollbar';
declare module 'swiper/css/effect-fade';
declare module 'swiper/css/effect-cube';
declare module 'swiper/css/effect-flip';
declare module 'swiper/css/effect-coverflow';
declare module 'swiper/css/thumbs';
declare module 'swiper/css/zoom';
declare module 'swiper/css/a11y';
declare module 'swiper/css/history';
declare module 'swiper/css/hash-navigation';
declare module 'swiper/css/keyboard';
declare module 'swiper/css/mousewheel';
declare module 'swiper/css/parallax';
declare module 'swiper/css/virtual';
declare module 'swiper/css/free-mode';
declare module 'swiper/css/grid';
declare module 'swiper/css/manipulation'; 