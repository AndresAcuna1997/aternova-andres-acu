import ErrorMessageProps from "../interfaces/ErrorMessage.interface";

export const ErrorMessage = ({ message, error }: ErrorMessageProps) => {
  
  return (
    <div className={`error-message ${error ? "error" : "sucess"}`}>
      {message}
    </div>
  );
};
