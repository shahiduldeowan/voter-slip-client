import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import SlipIssueQueueHeader from "../../components/SlipQueue/SlipIssueQueueHeader";
import SlipQueueCard from "../../components/SlipQueue/SlipQueueCard";
import useSocket from "../../hooks/useSocket";

const SlipIssueQueue = () => {
  const { slipQueueList, loading, voterCounts } = useSocket();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-5">
        <SlipIssueQueueHeader voterCounts={voterCounts} />
      </div>
      {slipQueueList && slipQueueList.length > 0 && (
        <div className="grid grid-cols-4 gap-5">
          {slipQueueList.map((queue, index) => (
            <SlipQueueCard
              key={queue?.AccountNumber}
              queue={queue}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SlipIssueQueue;
