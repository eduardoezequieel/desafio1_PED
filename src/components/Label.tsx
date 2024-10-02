type Props = {
  children: React.ReactNode;
  required?: boolean;
  htmlFor: string;
};

export const Label = ({ children, htmlFor, required }: Props) => {
  return (
    <label className="pl-1 block text-sm text-gray-600 dark:text-gray-400" htmlFor={htmlFor}>
      {children} {required && <span className="text-sm text-red-400">*</span>}
    </label>
  );
};
