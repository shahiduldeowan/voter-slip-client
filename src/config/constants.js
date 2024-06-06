const UPLOAD_FILES_STATUS = {
  SELECT: "select",
  UPLOADING: "uploading",
  FAILED: "failed",
  DONE: "done",
};

const UPLOAD_FILES_TYPE = {
  XLSX: "xlsx",
  JPG: "jpg",
  JPEG: "jpeg",
  PNG: "png",
};

const UPLOAD_FILE_KEYS = {
  MEMBERS: "members",
  MEMBERS_IMAGE_ZIP_FILE: "members-images-zip-file",
  FILES: "files",
};

const SLIP_STATUS = {
  PENDING: "Pending",
  ISSUED: "Issued",
  INITIAL: "Initial",
  PROCESS: "Processing",
  DONE: "Done",
  REJECT: "Rejected",
};

const SOCKET_EVENT_ENUM = Object.freeze({
  CONNECTED_EVENT: "connected",
  DISCONNECTED_EVENT: "disconnect",
  SLIP_ISSUE_QUEUE_EVENT: "slip_issue_queue",
  SOCKET_ERROR_EVENT: "socket_error",
  VOTER_COUNT_EVENT: "voter_counts",
});

export {
  SLIP_STATUS,
  SOCKET_EVENT_ENUM,
  UPLOAD_FILES_STATUS,
  UPLOAD_FILES_TYPE,
  UPLOAD_FILE_KEYS,
};
