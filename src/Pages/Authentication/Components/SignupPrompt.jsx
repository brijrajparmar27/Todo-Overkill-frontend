import { motion } from "framer-motion";
import { SigninpopupVariant } from "../Variants/AuthVariants";
export const SignupPrompt = ({ toogleLogin }) => {
  return (
    <motion.div
      variants={SigninpopupVariant}
      initial="hide"
      animate="show"
      exit="close"
      className="flex-1 flex justify-center items-center flex-col gap-6 h-full"
      id="signup-prompt"
    >
      <h1 className="font-bold text-white text-title">Welcome Back!</h1>
      <p className=" text-white text text-content text-center">
        New to the Place? <br /> No worries, Create an Account.
      </p>
      <button
        className="border border-solid text-white text-content bg-[transparent] px-10 py-2 rounded-full mt-5 hover:bg-white hover:text-green"
        onClick={toogleLogin}
      >
        Sign Up
      </button>
    </motion.div>
  );
};
