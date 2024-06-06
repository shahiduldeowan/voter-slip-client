import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { LiaSpinnerSolid } from "react-icons/lia";
import { API_ENDPOINT } from "../../../config/api";
import useFetchData from "../../../hooks/useFetchData";

const UsersForm = ({ isRegisterLoading, userRegister }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const { data: roles = [] } = useFetchData({
    queryKey: "roles",
    endpoint: API_ENDPOINT.ROLES,
  });

  const handleChange = (event) => {
    const parsedRoles = parseInt(event.target.value);
    setSelectedRole(parsedRoles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    const formData = new FormData(event.target);
    const Username = formData.get("username");
    const Password = formData.get("password");
    const Email = formData.get("email");
    const RoleID = selectedRole;
    const FirstName = formData.get("firstName");
    const LastName = formData.get("lastName");

    const myUser = {
      Username,
      Password,
      Email,
      RoleID,
      FirstName,
      LastName,
    };

    userRegister(myUser)
      .then((res) => {
        toast.success(res);
        event.target.reset();
      })
      .catch((err) => {
        toast.error(err.message || "Something went wrong");
      });
  };

  return (
    <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
      <form
        onSubmit={handleSubmit}
        className="container flex flex-col mx-auto space-y-12"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Personal Inormation</p>
            <p className="text-xs">Please enter user personal information</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label className="label">
                <span className="label-text">Fist Name</span>
              </label>
              <input
                name="firstName"
                type="text"
                placeholder="Type here your first name"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                name="lastName"
                type="text"
                placeholder="Type here your last name"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Type here your email"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                name="username"
                type="text"
                placeholder="Type here your username"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="text"
                placeholder="Type here your password"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
            {roles && (
              <div className="col-span-full sm:col-span-3">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  // value={selectedRole}
                  onChange={handleChange}
                  className="select select-bordered w-full max-w-xs"
                  defaultValue="Select user role"
                >
                  {/* <option disabled selected defaultValue="Select user role">
                    Select user role
                  </option> */}
                  {roles.map((role) => (
                    <option key={role?.RoleID} value={role?.RoleID}>
                      {role?.RoleName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="form-control mt-6">
              <div className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                <span className="w-full h-full  bg-gradient-to-br from-[#f7dd13] via-[#ff5478] to-[#ff00c6] group-hover:from-[#f7dd13] group-hover:via-[#f7dd13] group-hover:to-[#f7dd13] absolute"></span>
                <span className="w-full h-full relative  transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                  {isRegisterLoading ? (
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
                      value="Create"
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

UsersForm.propTypes = {
  isRegisterLoading: PropTypes.bool,
  userRegister: PropTypes.func,
};

export default UsersForm;
