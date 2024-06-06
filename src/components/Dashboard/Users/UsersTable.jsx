import PropTypes from "prop-types";
import { formatWithDayMonthTimeByDateString } from "../../../utils/dateTimeFormat";

const UsersTable = ({ users }) => {
  return (
    <div className="my-6 bg-base-200">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Role</th>
              <th>Username</th>
              <th>Login Date</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user) => {
              const loginDate = user?.LastLogin
                ? formatWithDayMonthTimeByDateString(user?.LastLogin)
                : "?";

              return (
                <tr key={user?.UserID}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.FullName}</div>
                        <div className="text-sm opacity-50">De-Soft</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user?.RoleName}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {user?.Description}
                    </span>
                  </td>
                  <td>{user?.Username}</td>
                  <th>
                    <span className="text-sm opacity-50">{loginDate}</span>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UsersTable;
