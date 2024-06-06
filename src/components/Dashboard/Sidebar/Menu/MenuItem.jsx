import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `${
          isActive ? "bg-app-primary text-gray-900 font-bold" : ""
        } flex items-center p-2 space-x-3 rounded-md`
      }
    >
      <Icon className="w-5 h-5 fill-current text-gray-400 dark:text-gray-600" />
      <span>{label}</span>
    </NavLink>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default MenuItem;
