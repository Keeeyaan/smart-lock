import { socket } from '../socket';
import axios from 'axios';

const Control = ({ isLocked }: { isLocked: boolean }) => {
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

      <div className="">
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
    </>
  );
};

export default Control;
