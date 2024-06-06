import { useEffect, useState } from "react";
import MemberExcelFileUpload from "../../components/Dashboard/Member/MemberExcelFileUpload";
import MemberHeader from "../../components/Dashboard/Member/MemberHeader";
import MemberTable from "../../components/Dashboard/Member/MemberTable";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useMembers from "../../hooks/useMembers";

const Members = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const { data: members = [], isLoading, refetch } = useMembers();

  useEffect(() => {
    if (members.length > 0) {
      setFilteredMembers(
        members.filter((member) => {
          const nameQuery = member.Name?.toLowerCase().includes(
            searchQuery.toLowerCase()
          );
          const accountNumberQuery =
            member.AccountNumber?.toLowerCase().includes(
              searchQuery.toLowerCase()
            );
          return nameQuery || accountNumberQuery;
        })
      );
    }
  }, [members, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (members.length <= 0) {
    return <MemberExcelFileUpload refetch={refetch} />;
  }

  return (
    <div className="w-full h-[calc(100vh-40px)] flex flex-col">
      <MemberHeader members={members} refetch={refetch} />
      <div className="flex justify-center mb-6">
        <div className="w-1/3">
          <label className="input input-bordered flex items-center gap-2">
            <input
              onChange={handleSearchChange}
              type="text"
              className="grow"
              placeholder="Search"
            />
            <kbd className="kbd kbd-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </kbd>
          </label>
        </div>
      </div>
      <MemberTable members={filteredMembers} refetch={refetch} />
    </div>
  );
};

export default Members;
