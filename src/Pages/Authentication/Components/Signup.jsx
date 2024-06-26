import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../redux/features/userSlice";
export const Signup = () => {
  const dispach = useDispatch();
  const { loading, Error } = useSelector((state) => state.userReducer);
  const handleSignup = (e) => {
    e.preventDefault();
    let data = {
      username: e.target.username.value.trim(),
      email: e.target.email.value.trim(),
      password: e.target.pass.value.trim(),
    };
    dispach(signupUser(data));
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSignup}>
      <h1 className="text-title font-bold text-green">SignUp</h1>
      <div>
        <label htmlFor="username" className="auth-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="auth-textfeils"
          placeholder="JohnD"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="auth-label">
          Email Address
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="auth-textfeils"
          placeholder="John@yupmail.com"
          required
        />
      </div>
      <div>
        <label htmlFor="pass" className="auth-label">
          Password
        </label>
        <input
          type="text"
          id="pass"
          name="pass"
          className="auth-textfeils"
          placeholder="Password"
          required
        />
      </div>
      <p className="text-red font-semibold">{Error}</p>
      <button
        className="border border-solid text-white text-subititle bg-green px-10 py-2 rounded-xl mt-5 w-full"
        type="submit"
      >
        SignUp
      </button>
    </form>
  );
};
