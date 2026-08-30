const heroDecorationUrl = new URL('../../1.png', import.meta.url).href;

export function HeroImageDecoration() {
  return (
    <div
      className="pointer-events-none relative mx-auto w-full max-w-[390px] select-none sm:max-w-[470px] lg:absolute lg:-right-20 lg:-top-5 lg:w-[600px] lg:max-w-none xl:-right-24 xl:-top-7 xl:w-[630px]"
      aria-hidden="true"
    >
      <img
        src={heroDecorationUrl}
        alt=""
        width="1312"
        height="1199"
        draggable="false"
        className="block h-auto w-full object-contain drop-shadow-[0_28px_38px_rgba(21,84,57,0.14)]"
      />
    </div>
  );
}
