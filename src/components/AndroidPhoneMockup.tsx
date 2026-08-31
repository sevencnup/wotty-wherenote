const frameUrl = new URL('../../Android.png', import.meta.url).href;
const screenUrl = new URL('../../y.jpg', import.meta.url).href;

export function AndroidPhoneMockup() {
  return (
    <div className="relative mx-auto aspect-[2/3] w-full max-w-[340px] select-none sm:max-w-[390px]">
      {/* y.jpg 是应用完整界面，放在透明手机外框下方 */}
      <img
        src={screenUrl}
        alt="随记 Android 应用界面"
        width="1080"
        height="2376"
        className="absolute left-[18.2%] top-[4.8%] z-0 h-[91%] w-[63.7%] rounded-[12%] object-cover"
        draggable="false"
      />
      <img
        src={frameUrl}
        alt=""
        width="1024"
        height="1536"
        className="relative z-10 block h-auto w-full drop-shadow-[0_25px_35px_rgba(18,56,42,0.22)]"
        draggable="false"
      />
    </div>
  );
}
