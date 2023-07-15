const Card = ({
  rfid,
  name,
  image,
  permission,
}: {
  rfid: string;
  name: string;
  image: string;
  permission?: string;
}) => {
  return (
    <div className="w-[300px] h-[400px] shadow rounded flex justify-center items-center flex-col pb-4">
      <div className="h-[250px] w-full mb-4">
        <img
          src={`./image/${image}`}
          alt={image}
          className="w-full h-full object-cover rounded-t"
        />
      </div>
      <div className="flex flex-col gap-2 m-2 text-center">
        <h1 className="font-semibold text-slate-600 text-2xl">{name}</h1>
        <h1 className="font-semibold text-slate-600 text-lg">{rfid}</h1>
        <h1 className={`${!permission && 'mb-6'}`}></h1>
        <select
          defaultValue={permission}
          className={`${
            !permission && 'hidden'
          } px-4 py-1 text-gray-700 border font-medium border-gray-300 rounded outline-none`}
        >
          <option value="restrict">Restricted</option>
          <option value="unrestrict">Unrestricted</option>
        </select>
      </div>
    </div>
  );
};

export default Card;
