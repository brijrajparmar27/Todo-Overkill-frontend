import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/features/userSlice";

export const Login = () => {
  const dispach = useDispatch();
  const { loading, Error } = useSelector((state) => state.userReducer);
  const handleLogin = (e) => {
    e.preventDefault();
    let data = {
      email: e.target.email.value.trim(),
      password: e.target.pass.value.trim(),
    };
    dispach(loginUser(data));
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
      <h1 className="text-title font-bold text-green">LogIn</h1>
      <div>
        <label htmlFor="email" className="auth-label">
          email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="John@yupmail.com"
          className="auth-textfeils"
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
          placeholder="Password"
          className="auth-textfeils"
          required
        />
      </div>
      <p className="text-red font-semibold">{Error}</p>
      <button
        type="submit"
        className="border border-solid text-white text-subititle bg-green px-10 py-2 rounded-xl mt-5 w-full"
      >
        LogIn
      </button>
    </form>
  );
};
