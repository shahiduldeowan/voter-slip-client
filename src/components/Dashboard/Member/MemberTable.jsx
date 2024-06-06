import PropTypes from "prop-types";
import "./MemberTable.css";
import MemberTableBodyRow from "./MemberTableBodyRow";
const MemberTable = ({ members, refetch }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-base-200 shadow rounded-2xl scrollbar-hide p-4">
      <div className="w-full overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>S/N</th>
              <th>Name</th>
              <th>ID</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Created By</th>
              <th>Issuer</th>
              <th>Created Date</th>
              <th>Issue Date</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {members.map((member) => {
              return (
                <MemberTableBodyRow
                  key={member?.VoterID}
                  member={member}
                  refetch={refetch}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

MemberTable.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default MemberTable;
