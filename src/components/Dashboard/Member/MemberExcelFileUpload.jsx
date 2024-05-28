import PropTypes from "prop-types";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { FaFileExcel } from "react-icons/fa";
import { API_ENDPOINT } from "../../../config/api";
import {
  UPLOAD_FILES_STATUS,
  UPLOAD_FILE_KEYS,
} from "../../../config/constants";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { isExcelFileByType } from "../../../utils/checkFiles";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const MemberExcelFileUpload = ({ refetch }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(UPLOAD_FILES_STATUS.SELECT);
  const axiosSecure = useAxiosSecure();

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const receivedFile = acceptedFiles[0];
      if (!isExcelFileByType(receivedFile?.type)) {
        toast.error("Please select a valid excel file!");
        return;
      }
      setFile(receivedFile);
      await handleUpload(receivedFile);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const clearFileInput = () => {
    setFile(null);
    setProgress(0);
    setUploadStatus(UPLOAD_FILES_STATUS.SELECT);
  };

  const handleUpload = async (excelFile) => {
    if (uploadStatus === UPLOAD_FILES_STATUS.DONE) {
      clearFileInput();
      return;
    }

    setUploadStatus(UPLOAD_FILES_STATUS.UPLOADING);
    try {
      const formData = new FormData();
      formData.append(UPLOAD_FILE_KEYS.MEMBERS, excelFile);

      const response = await axiosSecure.post(
        API_ENDPOINT.MEMBERS_EXCEL_FILE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            setProgress(percent);
          },
        }
      );

      if (response.data?.data?.created) {
        setUploadStatus(UPLOAD_FILES_STATUS.DONE);
        refetch();
        toast.success(
          `${response.data?.data?.created} members added successfully!`
        );
        return;
      }

      setUploadStatus(UPLOAD_FILES_STATUS.SELECT);
    } catch (error) {
      setUploadStatus(UPLOAD_FILES_STATUS.FAILED);
      toast.error(error.message || "Something went wrong!");
    }
  };

  if (progress >= 100 && uploadStatus === UPLOAD_FILES_STATUS.UPLOADING) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        {!file ? (
          <div
            {...getRootProps()}
            className=" p-6 flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG, JPEG, XLSX or GIF (MAX. 800x400px)
              </p>
            </div>
            <input {...getInputProps()} />
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 flex items-center gap-6">
            <FaFileExcel className=" text-4xl text-app-primary" />
            <div className="flex flex-col gap-1 w-72">
              {file && <p className="truncate w-72">{file.name}</p>}
              <progress
                className="progress progress-warning w-full"
                value={progress}
                max={100}
              ></progress>
            </div>
            <div className=" bg-base-300 rounded-full h-14 w-14 flex items-center justify-center  text-center">
              {progress}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

MemberExcelFileUpload.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default MemberExcelFileUpload;
