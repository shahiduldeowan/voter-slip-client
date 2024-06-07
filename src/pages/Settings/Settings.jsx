const Settings = () => {
  const handleCounterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const StartSerial = parseInt(formData.get("startSerial"));
    const EndSerial = parseInt(formData.get("endSerial"));
    const Counter = parseInt(formData.get("counterNumber"));

    const voterCounter = { StartSerial, EndSerial, Counter };
    console.log(voterCounter);
  };
  return (
    <div className="w-full h-full">
      {/* <div className="flex">
        <div>
          <div className="flex items-center -mx-4 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:bg-gray-100 dark:text-gray-800">
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border border-b-0 rounded-t-lg dark:border-gray-600 dark:text-gray-600"
            >
              <MdOutlineCountertops />
              <span>Counter</span>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b dark:border-gray-600 dark:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span>Role</span>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b dark:border-gray-600 dark:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>Queue</span>
            </a>
          </div>
        </div>
        <div className="border-b dark:border-gray-600 flex-1"></div>
      </div> */}
      <div className=" flex bg-base-300">
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
                    type="number"
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
    </div>
  );
};

export default Settings;
