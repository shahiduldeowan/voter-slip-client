import MemberExcelFileUpload from "../../components/Dashboard/Member/MemberExcelFileUpload";
import MemberHeader from "../../components/Dashboard/Member/MemberHeader";
import MemberTable from "../../components/Dashboard/Member/MemberTable";
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

  return (
    <div className="w-full h-full flex flex-col">
      <MemberHeader members={members} refetch={refetch} />
      <MemberTable members={members} refetch={refetch} />
    </div>
  );
};

export default Members;
