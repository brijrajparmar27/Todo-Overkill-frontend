import "@lottiefiles/lottie-player";

export const LottiePlayer = ({ animationData }) => {
  return (
    <div className="min-h-[inherit] min-w-[inherit] flex justify-center items-center">
      <lottie-player
        autoplay
        loop
        mode="normal"
        src={JSON.stringify(animationData)}
        style={{ with: "300px", height: "300px" }}
      />
    </div>
  );
};
