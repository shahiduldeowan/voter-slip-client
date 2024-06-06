import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiSolidImageAdd } from "react-icons/bi";
import { IoIosPeople, IoIosRefreshCircle } from "react-icons/io";
import { MdHideImage } from "react-icons/md";
import { RiFilePaper2Fill } from "react-icons/ri";
import useSocket from "../../../hooks/useSocket";
import MemberBulkImageUpload from "./MemberBulkImageUpload";

const MemberHeader = ({ members, refetch }) => {
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { voterCounts } = useSocket();

  const missingPhotoPercentage =
    ((voterCounts?.MissingPhotos || 1) * 100) / (voterCounts?.TotalVoters || 1);

  const isImageAvailable = members.some((member) => member.PhotoURL);

  const handleMembersRefresh = () => {
    if (isLoading) return;

    setIsLoading(true);
    refetch();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleImagesUpload = () => {
    if (isImageAvailable) {
      toast.error("Images are available. Please upload for individual");
      return;
    }
    setIsImageUpload((prev) => !prev);
  };

  return (
    <div className="my-6">
      <div className="w-full flex justify-center">
        <div className="stats shadow bg-base-200">
          <div className="stat">
            <div className="stat-figure text-primary">
              <IoIosPeople className="text-app-primary text-4xl" />
            </div>
            <div className="stat-title">Total Members</div>
            <div className="stat-value text-app-primary">
              {voterCounts?.TotalVoters || 3266}
            </div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <MdHideImage className="text-red-500 text-4xl" />
            </div>
            <div className="stat-title">Total Missing Photos</div>
            <div className="stat-value text-red-500">
              {voterCounts?.MissingPhotos || "N/A"}
            </div>
            <div className="stat-desc">
              {missingPhotoPercentage.toFixed(2)}% of Photos Missing
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <RiFilePaper2Fill className="text-green-500 text-4xl" />
            </div>
            <div className="stat-title">Total Slip Issue</div>
            <div className="stat-value text-green-500">
              {voterCounts?.IssuedSlips || "N/A"}
            </div>
            <div className="stat-desc">
              {voterCounts?.IssuedPercentage || 0.5}% Increase in Slip Issuance
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              {/* <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div> */}
              <div>
                <div className="flex justify-center w-full">
                  <kbd
                    onClick={handleMembersRefresh}
                    className="kbd cursor-pointer"
                  >
                    {/*  */}
                    <IoIosRefreshCircle
                      className={`${isLoading ? "animate-spin " : ""} m-auto`}
                    />
                  </kbd>
                </div>
                <div className="flex justify-center gap-12 w-full">
                  <kbd className="kbd">◀︎</kbd>
                  <kbd className="kbd">▶︎</kbd>
                </div>
                <div className="flex justify-center w-full">
                  <kbd
                    onClick={handleImagesUpload}
                    className="kbd cursor-pointer"
                  >
                    <BiSolidImageAdd />
                  </kbd>
                </div>
              </div>
            </div>
            {/* <div className="stat-value">86%</div>
            <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div> */}
          </div>
        </div>
      </div>
      <div>
        {isImageUpload && (
          <MemberBulkImageUpload
            refetch={refetch}
            setIsImageUpload={setIsImageUpload}
          />
        )}
      </div>
    </div>
  );
};

MemberHeader.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default MemberHeader;
