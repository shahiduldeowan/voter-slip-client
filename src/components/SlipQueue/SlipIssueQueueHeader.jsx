import PropTypes from "prop-types";
import logo from "../../assets/images/slip_logo.png";
import "./styles.css";

const SlipIssueQueueHeader = ({ voterCounts }) => {
  return (
    <div className="flex justify-between">
      <div className="flex p-2  rounded-box text-white font-bold">
        <div className="h-full w-20 mr-3 bg-white p-1">
          <img src={logo} alt="" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl">Dhaka Club Limited</h1>
          <h3>Election For The Year 2023-2024</h3>
        </div>
      </div>
      <div>
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-white font-bold border-b border-app-primary">
            <span className="countdowns font-mono text-5xl">
              <span
                style={{ "--value": voterCounts?.TotalVoters || "00" }}
              ></span>
            </span>
            Voters
          </div>
          <div className="flex">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-white font-bold border-b border-app-primary">
              <div className="flex">
                <span className="countdowns font-mono text-5xl">
                  <span
                    style={{ "--value": voterCounts?.IssuedSlips || 0 }}
                  ></span>
                </span>
                <div
                  className="radial-progress text-green-600 text-xs"
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
            <div className="flex flex-col p-2 bg-neutral rounded-box text-white font-bold border-b border-app-primary">
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
