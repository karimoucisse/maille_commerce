const CustomNotification = ({
  data,
}: {
  data: { title: string; content: string };
}) => (
  <div className="flex flex-col w-full bg-green-500 text-white p-4 rounded-md shadow-md">
    <h3 className="text-sm font-semibold text-white">{data?.title}</h3>
    <div className="flex items-center justify-between">
      <p className="text-sm">{data.content}</p>
    </div>
  </div>
);

export default CustomNotification;
