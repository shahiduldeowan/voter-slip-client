import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { API_ENDPOINT } from "../../config/api";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useFetchData from "../../hooks/useFetchData";
import { formatWithDayMonthTimeByDateString } from "../../utils/dateTimeFormat";

const Settings = () => {
  const {
    data: counters,
    isLoading,
    refetch,
  } = useFetchData({
    queryKey: "counters",
    endpoint: API_ENDPOINT.COUNTER,
  });

  const axiosSecure = useAxiosSecure();

  const handleCounterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const StartSerial = parseInt(formData.get("startSerial"));
    const EndSerial = parseInt(formData.get("endSerial"));
    const Counter = formData.get("counterNumber");

    const voterCounter = { StartSerial, EndSerial, Counter };

    axiosSecure
      .post(API_ENDPOINT.COUNTER, voterCounter)
      .then(() => {
        toast.success("Counter created successfully!");
        refetch();
        e.target.reset();
      })
      .catch(() => toast.error("Counter creation failed!"));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className=" flex bg-base-300 mb-6">
        <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
          <form
            onSubmit={handleCounterSubmit}
            className="container flex flex-col mx-auto space-y-12"
          >
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
              <div className="space-y-2 col-span-full lg:col-span-1">
                <p className="font-medium">Counter Information</p>
                <p className="text-xs">
                  Please give your counter according to voter serial number
                </p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="email" className="text-sm">
                    Start Serial
                  </label>
                  <br />
                  <input
                    type="number"
                    name="startSerial"
                    placeholder="Type here start serial number"
                    className="input input-bordered w-full max-w-xs mt-1"
                    required
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="email" className="text-sm">
                    End Serial
                  </label>
                  <br />
                  <input
                    type="number"
                    name="endSerial"
                    placeholder="Type here end serial number"
                    className="input input-bordered w-full max-w-xs mt-1"
                    required
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="email" className="text-sm">
                    Counter
                  </label>
                  <br />
                  <input
                    type="text"
                    name="counterNumber"
                    placeholder="Type here counter number"
                    className="input input-bordered w-full max-w-xs mt-1"
                    required
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <br />
                  <input
                    type="submit"
                    className="btn btn-outline btn-info"
                    value="Insert"
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </section>
      </div>
      <div className="flex-1 bg-base-200 shadow rounded-2xl p-4 max-h-[65vh]">
        <div className="h-full  flex flex-col">
          <div className="flex-grow overflow-auto">
            <div className="table-wrapper relative">
              <table className=" table">
                <thead className="dark:bg-gray-300 sticky top-0 z-10 bg-base-200">
                  <tr className="text-left text-xl">
                    <th>Counter</th>
                    <th>Start Serial</th>
                    <th>End Serial</th>
                    <th>Created By</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <tbody className="max-h-full overflow-y-auto">
                  {counters &&
                    counters.length > 0 &&
                    counters.map((counter, index) => {
                      const createDate = counter?.CreatedAt
                        ? formatWithDayMonthTimeByDateString(counter?.CreatedAt)
                        : "?";
                      return (
                        <tr key={index}>
                          <td className="p-3">{counter?.Counter || "N/A"}</td>
                          <td className="p-3">
                            {counter?.StartSerial || "N/A"}
                          </td>
                          <td className="p-3">{counter?.EndSerial || "N/A"}</td>
                          <td className="p-3">{counter?.Username || "N/A"}</td>
                          <th className="p-3">{createDate}</th>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
