import PropTypes from "prop-types";
import "./styles.css";

const SlipIssueQueueHeader = ({ voterCounts }) => {
  return (
    <div className="flex justify-end">
      <div>
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdowns font-mono text-5xl">
              <span
                style={{ "--value": voterCounts?.TotalVoters || "00" }}
              ></span>
            </span>
            Voters
          </div>
          <div className="flex">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <div className="flex">
                <span className="countdowns font-mono text-5xl">
                  <span
                    style={{ "--value": voterCounts?.IssuedSlips || 0 }}
                  ></span>
                </span>
                <div
                  className="radial-progress  text-app-primary text-xs"
                  style={{
                    "--value": voterCounts?.IssuedPercentage || 0.0,
                    "--size": "3rem",
                  }}
                  role="progressbar"
                >
                  {Math.round(voterCounts?.IssuedPercentage || 0.0)}%
                </div>
              </div>
              Issued
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <div className="flex">
                <span className="countdowns font-mono text-5xl">
                  <span
                    style={{ "--value": voterCounts?.PendingVoters || 0 }}
                  ></span>
                </span>
                <div
                  className="radial-progress text-primary text-xs"
                  style={{
                    "--value": Math.round(voterCounts?.PendingPercentage),
                    "--size": "3rem",
                  }}
                  role="progressbar"
                >
                  {Math.round(voterCounts?.PendingPercentage || 0.0)}%
                </div>
              </div>
              Pending
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SlipIssueQueueHeader.propTypes = {
  voterCounts: PropTypes.object,
};

export default SlipIssueQueueHeader;
