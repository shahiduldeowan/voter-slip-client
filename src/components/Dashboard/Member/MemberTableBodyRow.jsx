import PropTypes from "prop-types";

const MemberTableBodyRow = ({ member }) => {
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>{member?.SerialNumber || "N/A"}</td>

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
            <div className="font-bold">{member?.Name || "N/A"}</div>
            <div>
              <div className="badge badge-success gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-4 h-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                success
              </div>
            </div>
          </div>
        </div>
      </td>
      <td>{member?.AccountNumber || "N/A"}</td>
      <td>{member?.PhoneNumber || "N/A"}</td>
      <td>{member?.Email || "N/A"}</td>
      <th>
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
    </tr>
  );
};
MemberTableBodyRow.propTypes = {
  member: PropTypes.object.isRequired,
};
export default MemberTableBodyRow;
