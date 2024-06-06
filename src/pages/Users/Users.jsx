import UsersForm from "../../components/Dashboard/Users/UsersForm";
import UsersTable from "../../components/Dashboard/Users/UsersTable";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useUsers from "../../hooks/useUsers";

const Users = () => {
  const { users, isLoading, isRegisterLoading, userRegister } = useUsers();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div>
        <UsersForm
          isRegisterLoading={isRegisterLoading}
          userRegister={userRegister}
        />
      </div>

      {users && <UsersTable users={users} />}
    </div>
  );
};

export default Users;
