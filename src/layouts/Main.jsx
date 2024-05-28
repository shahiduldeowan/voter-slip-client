import useAuth from "../hooks/useAuth";

const Main = () => {
  const { user } = useAuth();
  console.log(user?.RoleName);
  return <div>Main Layout</div>;
};

export default Main;
