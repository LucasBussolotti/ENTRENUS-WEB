import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean | string;
        'camera-controls'?: boolean | string;
        'camera-orbit'?: string;
        'camera-target'?: string;
        'interaction-prompt'?: string;
        'shadow-intensity'?: string | number;
        exposure?: string | number;
        'environment-image'?: string;
        'skybox-image'?: string;
        loading?: 'auto' | 'lazy' | 'eager';
        poster?: string;
        suppressHydrationWarning?: boolean;
        // El comodín por si agregás algo nuevo en el futuro
        [key: string]: any; 
      };
    }
  }
}