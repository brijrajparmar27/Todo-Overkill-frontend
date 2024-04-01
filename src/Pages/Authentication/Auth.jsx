import { GoCheckCircleFill } from "react-icons/go";
import shape1 from "../../assets/shape1.svg";
import shape2 from "../../assets/shape2.svg";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useState } from "react";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { LoginPrompt } from "./Components/LoginPrompt";
import { SignupPrompt } from "./Components/SignupPrompt";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [scope, animate] = useAnimate();

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 100,
  };

  const toogleLogin = () => {
    setIsLogin((prev) => {
      return !prev;
    });
  };

  return (
    <motion.div
      className="FitPage flex justify-center items-center overflow-hidden"
      transition={{
        when: "beforeChildren", //use this instead of delay
        staggerChildren: 1,
      }}
    >
      <motion.div
        className="absolute top-0 left-0 FitPage overflow-hidden bg-white "
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <motion.img
          animate={{ rotate: 360 }}
          transition={{ ease: "linear", duration: 120, repeat: Infinity }}
          src={shape1}
          className="absolute  h-[100vw] top-0 left-[-40vw]"
        />
        <motion.img
          animate={{ rotate: 360 }}
          transition={{ ease: "linear", duration: 120, repeat: Infinity }}
          src={shape2}
          className="absolute h-[100vw] bottom-0 right-[-40vw]"
        />
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="h-[70vh] w-[50vw] z-10 rounded-xl bg-white flex overflow-hidden p-4 relative"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          flexDirection: isLogin ? "row" : "row-reverse",
        }}
      >
        <div
          className="h-full w-full forest-gradient absolute top-0 left-0 z-10 flex"
          ref={scope}
        >
          <div className="flex-1 overflow-hidden">
            <AnimatePresence>
              {!isLogin && <LoginPrompt toogleLogin={toogleLogin} />}
            </AnimatePresence>
          </div>
          <div className="flex-1 overflow-hidden">
            <AnimatePresence>
              {isLogin && <SignupPrompt toogleLogin={toogleLogin} />}
            </AnimatePresence>
          </div>
        </div>
        <motion.div
          className="h-full w-[50%] bg-white rounded-lg z-20 p-8 flex flex-col gap-3 justify-center "
          layout
          transition={spring}
        >
          {isLogin && <Login />}
          {!isLogin && <Signup />}
        </motion.div>
      </motion.div>
      <motion.div
        className="fixed z-50 top-14 left-14 font-bold text-title flex justify-center items-center gap-[1px] text-green"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h1>TOD</h1>
        <GoCheckCircleFill className="text-subititle" />
      </motion.div>
    </motion.div>
  );
};
