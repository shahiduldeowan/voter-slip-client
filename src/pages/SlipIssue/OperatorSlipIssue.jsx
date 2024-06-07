import toast from "react-hot-toast";
import { LiaSpinnerSolid } from "react-icons/lia";
import avatar from "../../assets/images/avatar.png";
import logo from "../../assets/images/slip_logo.png";
import { SLIP_STATUS } from "../../config/constants";
import useVoter from "../../hooks/useVoter";

const OperatorSlipIssue = () => {
  const { voter, loading, getVoterByQuery, getVoterSlip } = useVoter();

  const handlePrint = () => {
    if (!voter) {
      toast.error("Please enter your voter ID");
    } else {
      getVoterSlip(voter?.AccountNumber)
        .then((res) => {
          if (res) {
            toast.success("Slip Issued Successfully");
          } else {
            toast.error("Please contact your administrator");
          }
        })
        .catch(() => {
          toast.error("Slip not issued");
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryText = e.target.elements.queryText.value;
    getVoterByQuery(queryText).then((newVoter) => {
      if (newVoter?.Name) {
        if (newVoter?.SlipStatus === SLIP_STATUS.ISSUED) {
          toast.error("Slip already issued");
        }
      } else {
        toast.error("Voter not found");
      }

      e.target.elements.queryText.value = "";
    });
  };

  const isActivePrintButton = voter?.SlipStatus === SLIP_STATUS.PENDING;
  const isDataShow = true;

  return (
    <div className="h-screen w-screen border">
      <div className="w-full h-full relative">
        <div className="absolute inset-y-0 inset-x-0 flex justify-center items-center">
          <div className="h-4/6 w-4/5 bg-gradient-to-br from-[#ff00c6] via-[#ff5478] to-[#f7dd13] rounded-2xl shadow-2xl p-1">
            <div className="w-full h-full bg-base-100 rounded-2xl">
              <div className=" h-full w-full flex">
                <div className="flex-1 flex flex-col justify-center items-center">
                  <div className="">
                    <img
                      src={isDataShow ? voter?.PhotoURL || avatar : avatar}
                      className="h-56 w-52 bg-no-repeat object-cover"
                      alt="Profile Image"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h2 className="text-3xl font-bold">
                      {isDataShow ? voter?.Name || "?" : "?"}
                    </h2>
                    <h2 className="text-3xl font-bold text-gray-500">
                      {isDataShow ? voter?.AccountNumber || "?" : "?"}
                    </h2>
                    <div className="flex gap-4 justify-around mt-6 w-full">
                      <div className="flex flex-col justify-center items-center">
                        <h2 className="text-3xl font-bold">
                          {isDataShow ? voter?.SerialNumber || "00" : "00"}
                        </h2>
                        <h3 className="text-gray-500 font-semibold">
                          Serial No.
                        </h3>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <h2 className="text-3xl font-bold">
                          {isDataShow && isActivePrintButton
                            ? voter?.CounterNumber || "00"
                            : "00"}
                        </h2>
                        <h3 className="text-gray-500 font-semibold">Counter</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-auto my-16 w-[1px] bg-gradient-to-br from-[#ff00c6] via-[#ff5478] to-[#f7dd13]"></div>
                <div className="flex-1 flex flex-col justify-center items-center">
                  <div className="bg-white p-2 mb-2">
                    <img src={logo} alt="" />
                  </div>
                  <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f7dd13] to-pink-600">
                    Dhaka Club Ltd
                  </h1>
                  <div className="mt-14">
                    <form onSubmit={handleSubmit} className="w-full">
                      <input
                        type="text"
                        name="queryText"
                        placeholder="Type here..."
                        className="input w-full input-bordered max-w-xs"
                        required
                      />
                    </form>
                    <div>
                      {loading ? (
                        <button
                          disabled={true}
                          className="relative w-full h-full px-6 py-3 text-xl text-white hover:text-black text-center"
                        >
                          <LiaSpinnerSolid className="animate-spin m-auto " />
                        </button>
                      ) : (
                        <div className="flex justify-center items-center mt-4">
                          <div className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                            <span className="w-full h-full  bg-gradient-to-br from-[#f7dd13] via-[#ff5478] to-[#ff00c6] group-hover:from-[#f7dd13] group-hover:via-[#f7dd13] group-hover:to-[#f7dd13] absolute"></span>
                            <span className="w-full h-full relative  transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                              <button
                                disabled={!isActivePrintButton}
                                onClick={handlePrint}
                                type="button"
                                className="relative w-full h-full px-6 py-3 text-xl text-white hover:text-black text-center"
                              >
                                Print
                              </button>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-1/2 bg-base-100">
          <div className="w-full h-full bg-app-primary rounded-bl-[5rem]"></div>
        </div>
        <div className="w-full h-1/2 bg-app-primary">
          <div className="w-full h-full bg-base-100 rounded-tr-[5rem]"></div>
        </div>
      </div>
    </div>
  );
};

export default OperatorSlipIssue;
