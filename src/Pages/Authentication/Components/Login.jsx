export const Login = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-title font-bold text-green">LogIn</h1>
      <div>
        <label htmlFor="first_name" className="auth-label">
          Username
        </label>
        <input
          type="text"
          id="first_name"
          className="auth-textfeils"
          placeholder="John"
          required
        />
      </div>

      <div>
        <label htmlFor="first_name" className="auth-label">
          Password
        </label>
        <input
          type="text"
          id="first_name"
          className="auth-textfeils"
          placeholder="John"
          required
        />
      </div>
      <button
        className="border border-solid text-white text-subititle bg-green px-10 py-2 rounded-xl mt-5 w-full"
        onClick={() => {}}
      >
        LogIn
      </button>
    </div>
  );
};
