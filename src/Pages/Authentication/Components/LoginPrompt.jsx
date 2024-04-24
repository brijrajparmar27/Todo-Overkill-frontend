import { motion } from "framer-motion";
import { LoginpopupVariant } from "../Variants/AuthVariants";
export const LoginPrompt = ({ toogleLogin }) => {
  return (
    <motion.div
      variants={LoginpopupVariant}
      initial="hide"
      animate="show"
      exit="close"
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
