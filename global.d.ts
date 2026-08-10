import React from 'react'; // Asegurate de tener esto si usás React.DetailedHTMLProps

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
        'shadow-intensity'?: string;
        exposure?: string;
        'environment-image'?: string;
        'skybox-image'?: string;
        suppressHydrationWarning?: boolean;
        // Permite cualquier otra propiedad personalizada que necesites a futuro
        [key: string]: any; 
      };
    }
  }
}