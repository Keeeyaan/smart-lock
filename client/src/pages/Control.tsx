import { socket } from '../socket';
import Card from '../components/Card';

const Control = ({
  isLocked,
  rfidAccess,
}: {
  isLocked: boolean;
  rfidAccess: {
    id: number;
    image: string;
    uid: string;
    name: string;
    permission: string;
  }[];
}) => {
  return (
    <>
      <div className="bg-slate-100 rounded h-16 mb-10 w-auto p-4 items-center">
        <h1 className="text-[#454545] text-2xl">
          Lock Status:
          <span
            className={`${
              isLocked ? 'text-red-400' : 'text-green-400'
            } ml-2 uppercase`}
          >
            {isLocked ? 'Locked' : 'Unlocked'}
          </span>
        </h1>
      </div>

      <div className="flex gap-20">
        <div>
          <button
            onClick={() => socket.emit('lock')}
            className="w-28 p-2 block mb-4 bg-red-400  hover:bg-red-500 duration-300 transition-all ease-in-out text-md text-white font-semibold rounded-sm"
          >
            Lock
          </button>
          <button
            onClick={() => socket.emit('unlock')}
            className="w-28 p-2 bg-green-400 hover:bg-green-500 duration-300 transition-all ease-in-out text-sm text-white font-semibold rounded-sm"
          >
            Unlock
          </button>
        </div>
        <div>
          <h1 className="text-slate-800 text-lg font-semibold mb-2">
            Member Access Info:{' '}
          </h1>
          {rfidAccess.length !== 0 ? (
            <Card
              rfid={rfidAccess[0].uid}
              name={rfidAccess[0].name}
              image={rfidAccess[0].image}
            />
          ) : (
            <div className="w-[300px] h-[400px] shadow border rounded flex justify-center items-center flex-col pb-4">
              <h1 className="font-bold text-slate-800 text-2xl">
                ID NOT FOUND!
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Control;
