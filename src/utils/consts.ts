export const StorageKeys = {
  TOKEN: "token",
} as const;

export const ToastSeverity = {
  INFO: "info",
  WARMOMG: "warn",
  SUCCESS: "success",
  DANGER: "error"
} as const;

export const ActionSeverity  = {
  USER_JOINED: ToastSeverity.INFO,
  DOCUMENT_DELETED: ToastSeverity.WARMOMG,
  DOCUMENT_ACCESS_REVOKED: ToastSeverity.DANGER,
} as const;

export const ActionsToRefresh = [
  "USER_JOINED",
  "DOCUMENT_DELETED",
  "DOCUMENT_ACCESS_REVOKED"
];

export const ActionsToDahsboardNavigate = [
  "DOCUMENT_DELETED",
  "DOCUMENT_ACCESS_REVOKED"
]