import { FaUsersRectangle } from "react-icons/fa6";
import { HiQueueList } from "react-icons/hi2";
import { IoMdPaper } from "react-icons/io";
import { IoPeople, IoSettingsOutline } from "react-icons/io5";
import logo from "../../../assets/images/bg-rm-logo.png";
import MenuItem from "./Menu/MenuItem";

const Sidebar = () => {
  return (
    <div className="h-[100vh] p-3 space-y-2 w-60 bg-base-300 text-gray-100">
      <div className="flex items-center p-2 space-x-4">
        <img src={logo} alt="" />
      </div>
      <div className="divide-y divide-gray-700 dark:divide-gray-300">
        <div className=" flex-1">
          <nav className="pt-2 pb-4 space-y-1 text-sm">
            <MenuItem label="Members" address="/dashboard" icon={IoPeople} />
            <MenuItem label="Users" address="users" icon={FaUsersRectangle} />
            <MenuItem
              label="Slip Issue"
              address="slip-issue"
              icon={IoMdPaper}
            />
            <MenuItem
              label="Slip Issue Queue"
              address="slip-issue-queue"
              icon={HiQueueList}
            />
          </nav>
        </div>
        <div className="pt-4 pb-2 space-y-1 text-sm">
          <MenuItem
            label="Settings"
            address="/dashboard/settings"
            icon={IoSettingsOutline}
          />
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex items-center p-2 space-x-3 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current text-gray-400 dark:text-gray-600"
            >
              <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
              <rect width="32" height="64" x="256" y="232"></rect>
            </svg>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
