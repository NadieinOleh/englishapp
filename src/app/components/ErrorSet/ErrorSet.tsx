import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return message ? (
    <p className="text-red-500 text-2xl font-bold animate-pulse">{message}</p>
  ) : null;
};

export default ErrorMessage;
