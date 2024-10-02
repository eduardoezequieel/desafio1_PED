type Props = {
  show: boolean;
  message?: string;
};

export const ErrorLabel = ({ show, message }: Props) => {
  if (!show || !message) return null;
  return <span className="text-sm pl-1 text-red-400 font-semibold">{message}</span>;
};
