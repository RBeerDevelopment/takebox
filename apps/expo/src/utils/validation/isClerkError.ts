export type ClerkError = {
  status: number;
  clerkError: true;
  errors: Array<{
    code: string;
    message: string;
    longMessage: string;
    meta: {
      paramName: string;
    };
  }>;
};

export function isClerkError(error: unknown): error is ClerkError {
  return Boolean(error && (error as ClerkError).clerkError === true);
}
