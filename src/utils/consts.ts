export const StorageKeys = {
  TOKEN: "token",
} as const;

export const ToastSeverity = {
  INFO: "info",
  WARMOMG: "warn",
  SUCCESS: "success",
  DANGER: "danger"
} as const;

export const ActionSeverity  = {
  USER_JOINED: ToastSeverity.INFO,
  DOCUMENT_DELETED: ToastSeverity.WARMOMG,
} as const;

export const ActionsToRefresh = [
  "USER_JOINED",
  "DOCUMENT_DELETED"
];

export const ActionsToDahsboardNavigate = [
  "DOCUMENT_DELETED",
]