const PresignedUrlType = ["getObject", "putObject"] as const;

export type PresignedUrlType = (typeof PresignedUrlType)[number];
