import { motion } from "framer-motion";
export const LoginPrompt = ({ toogleLogin }) => {
  const popupVariant = {
    hide: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 1,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
    close: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      // variants={popupVariant}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      transition={{duration: 1}}
      key={"login-prompt"}
      className="flex-1 flex justify-center items-center flex-col gap-6 h-full"
      id="login-prompt"
    >
      <h1 className="font-bold text-white text-title">Hello Friend!</h1>
      <p className=" text-white text text-content text-center">
        Already Have an account? <br />
        go ahead and login.
      </p>
      <button
        className="border border-solid text-white text-content bg-[transparent] px-10 py-2 rounded-full mt-5 hover:bg-white hover:text-green"
        onClick={toogleLogin}
      >
        Sign In
      </button>
    </motion.div>
  );
};
