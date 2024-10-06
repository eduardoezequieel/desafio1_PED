type Props = {
  title: string;
  data: string;
};

export const Counter = ({ title, data }: Props) => {
  return (
    <div className="flex p-5 flex-col justify-center items-center border rounded-md dark:border-neutral-700 border-gray-300">
      <h1 className="text-indigo-700 dark:text-indigo-400 text-[60px]">{data}</h1>
      <p className="text-gray-500">{title}</p>
    </div>
  );
};
