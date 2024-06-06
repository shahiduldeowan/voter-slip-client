import { PropTypes } from "prop-types";
import { FaRegClock } from "react-icons/fa";
import { HiMiniPrinter } from "react-icons/hi2";
import avatar from "../../assets/images/avatar.png";

const SlipQueueCard = ({ queue }) => {
  const { Name, AccountNumber, PhotoURL, IssueDate } = queue;

  return (
    <div
      className={`h-[19.5vh] card w-full bg-base-300 shadow-xl border-app-primary p-3`}
    >
      <div className="h-[80%] w-full mb-2 flex gap-3">
        <div className="w-[25%] h-full flex items-center">
          <div className="avatar w-full">
            <div className="w-full rounded-full">
              <img src={PhotoURL || avatar} />
            </div>
          </div>
        </div>
        <div className="w-[70%] h-full flex flex-col justify-center">
          <div className="mb-2">
            <h2 className="text-xl font-semibold">{Name || "N/A"}</h2>
            <h3 className="text-lg font-medium text-gray-500">
              {AccountNumber || "N/A"}
            </h3>
          </div>
          <div className="flex">
            <div className="bg-base-100 py-1 px-3">
              <h3 className="text-lg text-app-primary font-medium">
                <HiMiniPrinter />
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[20%] text-lg w-full flex justify-end items-center">
        <FaRegClock className="text-app-primary" />
        <h3 className="font-medium ml-3">{IssueDate}</h3>
      </div>
    </div>
  );
};

SlipQueueCard.propTypes = {
  queue: PropTypes.object.isRequired,
};

export default SlipQueueCard;
