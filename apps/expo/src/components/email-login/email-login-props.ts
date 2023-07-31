export interface EmailLoginProps {
  emailAddress: string;
  setEmailAddress: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  setError: (error: string) => void;
}
