import PropTypes from "prop-types";
import "./MemberTable.css";
import MemberTableBodyRow from "./MemberTableBodyRow";
// import MemberTableBodyRow from "./MemberTableBodyRow";

const MemberTable = ({ members, refetch }) => {
  return (
    <div className="flex-1 bg-base-200 shadow rounded-2xl p-4 max-h-[72vh]">
      <div className="h-full  flex flex-col">
        <div className="flex-grow overflow-auto">
          <div className="table-wrapper relative">
            <table className=" table">
              <thead className="dark:bg-gray-300 sticky top-0 z-10 bg-base-200">
                <tr className="text-left text-xl">
                  <th>S/N</th>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Created By</th>
                  <th>Issuer</th>
                  <th className="text-right">Created Date</th>
                  <th className="text-right">Issue Date</th>
                </tr>
              </thead>
              <tbody className="max-h-full overflow-y-auto">
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
      </div>
    </div>
  );
};

MemberTable.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default MemberTable;

/** 
 <div className="flex-1 overflow-y-auto bg-base-200 shadow rounded-2xl scrollbar-hide p-4">
      <div className="w-full overflow-x-auto">
        <table className="table">
         
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
*/
