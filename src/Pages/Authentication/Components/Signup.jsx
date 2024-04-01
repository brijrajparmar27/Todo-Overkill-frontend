export const Signup = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-title font-bold text-green">SignIn</h1>
      <div>
        <label for="first_name" class="auth-label">
          Username
        </label>
        <input
          type="text"
          id="first_name"
          class="auth-textfeils"
          placeholder="John"
          required
        />
      </div>
      <div>
        <label for="first_name" class="auth-label">
          Email Address
        </label>
        <input
          type="text"
          id="first_name"
          class="auth-textfeils"
          placeholder="John"
          required
        />
      </div>
      <div>
        <label for="first_name" class="auth-label">
          Password
        </label>
        <input
          type="text"
          id="first_name"
          class="auth-textfeils"
          placeholder="John"
          required
        />
      </div>
      <button
        className="border border-solid text-white text-subititle bg-green px-10 py-2 rounded-xl mt-5 w-full"
        onClick={() => {}}
      >
        SignUp
      </button>
    </div>
  );
};
