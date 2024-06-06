import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { LiaSpinnerSolid } from "react-icons/lia";
import avatar from "../../../assets/images/avatar.png";
import { API_ENDPOINT } from "../../../config/api";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { formatWithDayMonthTimeByDateString } from "../../../utils/dateTimeFormat";

const MemberTableBodyRow = ({ member, refetch }) => {
  const [slipCancelLoading, setSlipCancelLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSlipCancel = () => {
    if (!member.VoterID) {
      toast.error(`Voter id is not found`);
      return;
    }

    setSlipCancelLoading(true);
    axiosSecure
      .get(`${API_ENDPOINT.VOTER_SLIP_RESET}/${member.VoterID}`)
      .then((res) => {
        if (res.data?.data?.VoterID) {
          toast.success(`slip reset successfully`);
          refetch();
        }
        setSlipCancelLoading(false);
      })
      .catch(() => {
        setSlipCancelLoading(false);
        toast.error(`Voter id is not found`);
      });
  };

  const isIssued = member?.SlipStatus === "Issued";
  const createDate = member?.VoterCreatedAt
    ? formatWithDayMonthTimeByDateString(member?.VoterCreatedAt)
    : "?";
  const issuedDate = member?.IssuedAt
    ? formatWithDayMonthTimeByDateString(member?.IssuedAt)
    : "?";

  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>{member?.SerialNumber || "N/A"}</td>

      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={member.PhotoURL || avatar}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{member?.Name || "N/A"}</div>
            <div>
              <div
                className={`badge ${
                  isIssued ? "badge-success" : "badge-neutral"
                } gap-2`}
              >
                {isIssued && !slipCancelLoading && (
                  <button onClick={handleSlipCancel}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-4 h-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                )}
                {slipCancelLoading && (
                  <LiaSpinnerSolid className="animate-spin m-auto " />
                )}
                {member?.SlipStatus ? member?.SlipStatus.toUpperCase() : "?"}
              </div>
            </div>
          </div>
        </div>
      </td>
      <td>{member?.AccountNumber || "N/A"}</td>
      <td>{member?.PhoneNumber || "N/A"}</td>
      <td>{member?.Email || "N/A"}</td>
      <th>{member?.CreatedByUser}</th>
      <th>{member?.Issuer || "N/A"}</th>
      <th>{createDate}</th>
      <th>{issuedDate}</th>
    </tr>
  );
};

MemberTableBodyRow.propTypes = {
  member: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default MemberTableBodyRow;
