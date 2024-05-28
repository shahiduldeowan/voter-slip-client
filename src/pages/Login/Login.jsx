import { LiaSpinnerSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import bgRmDeSoftLogo from "../../assets/images/bg-rm-logo.png";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location?.state;
  const { loginUser, isLoading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const Username = formData.get("username");
    const Password = formData.get("password");
    const user = { Username, Password };

    loginUser(user)
      .then((user) => {
        if (user?.RoleName === "Admin" || user?.RoleName === "Supervisor") {
          navigate("/dashboard", { replace: true });
        } else if (user?.RoleName === "Operator") {
          navigate("/slip-issue", { replace: true });
        } else if (user?.RoleName === "Viewer") {
          navigate("/", { replace: true });
        }
      })
      .catch(() => {
        // handle error
      });
    // loginUser(user)
    //   .then((user) => {
    //     if (user?.RoleName === "Admin" || user?.RoleName === "Supervisor") {
    //       const to = from || "/dashboard";
    //       console.log(1, to);
    //       navigate(to);
    //     } else if (user?.RoleName === "Operator") {
    //       const to = from || "/slip-issue";
    //       console.log(2, to);
    //       navigate(to);
    //     } else if (user?.RoleName === "Viewer") {
    //       const to = from || "/";
    //       console.log(3, to);
    //       navigate(to);
    //     }
    //   })
    //   .catch(() => {});
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content my-28 lg:my-0 bg-base-200 rounded-3xl lg:w-4/5 flex-col justify-between lg:p-8 lg:flex-row">
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <img className="w-40" src={bgRmDeSoftLogo} alt="desoft logo" />
          </div>
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Use your De-Soft Account</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                name="username"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <div className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                <span className="w-full h-full  bg-gradient-to-br from-[#f7dd13] via-[#ff5478] to-[#ff00c6] group-hover:from-[#f7dd13] group-hover:via-[#f7dd13] group-hover:to-[#f7dd13] absolute"></span>
                <span className="w-full h-full relative  transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                  {isLoading ? (
                    <button
                      disabled={true}
                      className="relative w-full h-full px-6 py-3 text-xl text-white hover:text-black text-center"
                    >
                      <LiaSpinnerSolid className="animate-spin m-auto " />
                    </button>
                  ) : (
                    <input
                      className="relative w-full h-full px-6 py-3 text-xl text-white hover:text-black text-center"
                      type="submit"
                      value="Login"
                    />
                  )}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
