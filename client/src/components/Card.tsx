const Card = ({
  rfid,
  name,
  image,
  permission,
}: {
  rfid: string;
  name: string;
  image: string;
  permission: string;
}) => {
  return (
    <div className="w-[250px] h-auto shadow flex justify-center items-center flex-col p-4">
      <div className="h-[150px] w-[150px] border border-slate-400 rounded mb-4">
        <img
          src={`./image/${image}`}
          alt={image}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-slate-600">RFID: {rfid}</h1>
        <h1 className="font-semibold text-slate-600">Name: {name}</h1>
        <select
          defaultValue={permission}
          className="px-4 py-1 font-normal text-gray-700 border border-gray-300 rounded outline-none"
        >
          <option value="restrict">Restrict</option>
          <option value="unrestrict">Unrestrict</option>
        </select>
      </div>
    </div>
  );
};

export default Card;
