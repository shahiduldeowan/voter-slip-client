import MemberExcelFileUpload from "../../components/Dashboard/Member/MemberExcelFileUpload";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useMembers from "../../hooks/useMembers";

const Members = () => {
  const { data: members = [], isLoading, refetch } = useMembers();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (members.length <= 0) {
    return <MemberExcelFileUpload refetch={refetch} />;
  }
  const member = members[0];
  console.log(member);

  return (
    <div>
      <h1>Total members : {members.length}</h1>
      <div>
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
                <th>S/N</th>

                <th>Name</th>
                <th>ID</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{/* row 1 */}</tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
/*
AccountNumber
: 
"FM-001"
Email
: 
"skinny58_99@yahoo.com"
Name
: 
"Dr. Md. Azam Khan                                             "
PhoneNumber
: 
"+8801711563218"
PhotoURL
: 
null
SerialNumber
: 
1
VoterID
: 
102928
*/
export default Members;
