const locationIconUrl = new URL('../../1.png', import.meta.url).href;
const cameraIconUrl = new URL('../../2.png', import.meta.url).href;
const noteIconUrl = new URL('../../3.png', import.meta.url).href;

const featureIconClassName = 'h-24 w-24 object-contain';

export function FeatureIconLocation() {
  return <img src={locationIconUrl} alt="" className={featureIconClassName} aria-hidden="true" />;
}

export function FeatureIconCamera() {
  return <img src={cameraIconUrl} alt="" className={featureIconClassName} aria-hidden="true" />;
}

export function FeatureIconNote() {
  return <img src={noteIconUrl} alt="" className={featureIconClassName} aria-hidden="true" />;
}
