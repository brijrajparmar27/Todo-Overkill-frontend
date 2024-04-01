import Lottie from "react-lottie";

export const LottiePlayer = ({ animationData }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };
  return (
    <div className="min-h-[inherit] min-w-[inherit] flex justify-center items-center">
      <Lottie
        options={defaultOptions}
        height={300}
        width={300}
        isClickToPauseDisabled={true}
      />
    </div>
  );
};
