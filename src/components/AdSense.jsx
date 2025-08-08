import React, { useEffect } from 'react';
import './AdSense.css';

const AdSense = ({ 
  slot = '0000000000', 
  format = 'auto',
  layout = '',
  style = {},
  className = 'adsense-container'
}) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && window.adsbygoogle.length === 0) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
        }}
        data-ad-client="ca-pub-0000000000000000"
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

// Componente para banner horizontal (topo/rodapé)
export const AdSenseBanner = ({ position = 'top' }) => {
  return (
    <AdSense 
      slot="1111111111"
      format="horizontal"
      className={`adsense-banner adsense-${position}`}
      style={{
        minHeight: '90px',
        marginBottom: position === 'top' ? '20px' : '0',
        marginTop: position === 'bottom' ? '20px' : '0'
      }}
    />
  );
};

// Componente para anúncio retangular (sidebar)
export const AdSenseRectangle = () => {
  return (
    <AdSense 
      slot="2222222222"
      format="rectangle"
      className="adsense-rectangle"
      style={{
        minHeight: '250px',
        marginBottom: '20px'
      }}
    />
  );
};

// Componente para anúncio responsivo
export const AdSenseResponsive = ({ className = '' }) => {
  return (
    <AdSense 
      slot="3333333333"
      format="auto"
      className={`adsense-responsive ${className}`}
      style={{
        minHeight: '120px',
        marginBottom: '20px'
      }}
    />
  );
};

export default AdSense;
