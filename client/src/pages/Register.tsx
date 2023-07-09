import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Webcam from 'react-webcam';

import { socket } from '../socket';

import ReplayIcon from '@mui/icons-material/Replay';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const Register = () => {
  const [showWebcam, setShowWebcam] = useState(true);
  const [captureImage, setCaptureImage] = useState<any>(null);
  const [rfid, setRfid] = useState('');

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const handleReceivedId = (id: string) => {
      console.log(id);
      setRfid(id.trim());
    };

    socket.on('received-id', handleReceivedId);

    return () => {
      socket.off('received-id', handleReceivedId);
    };
  }, []);

  const camRef = useRef<Webcam>(null);

  const webcamCaptureHandler = (e: any) => {
    e.preventDefault();
    const imageSrc = camRef.current?.getScreenshot();
    setCaptureImage(imageSrc);
    setShowWebcam(false);
  };

  const handleFormSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('image', captureImage);
    data.image = captureImage;
    await axios.post('/api/members', data);
    setRfid('');
  };

  return (
    <>
      {!rfid ? (
        <h1>Scan the rfid first that you want to register!</h1>
      ) : (
        <>
          {showWebcam ? (
            <div>
              <Webcam
                audio={false}
                height={420}
                width={390}
                mirrored
                screenshotFormat="image/jpeg"
                ref={camRef}
                className="mb-5"
              />

              <button
                type="button"
                onClick={webcamCaptureHandler}
                className="leading-normal px-4 py-2 bg-blue-500 text-white rounded mb-5"
              >
                <CameraAltIcon />
              </button>
            </div>
          ) : (
            <>
              <div>
                <img src={captureImage} className="mb-5" />
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowWebcam((prev) => !prev);
                  setCaptureImage(null);
                }}
                className="py-2 px-4 mb-5 bg-red-400 rounded text-white leading-normal"
              >
                <ReplayIcon />
              </button>
            </>
          )}
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="rfid" className="font-semibold text-[1.15rem]">
                RFID
              </label>
              <input
                id="rfid"
                {...register('rfid')}
                type="text"
                value={rfid}
                readOnly
                className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label htmlFor="name" className="font-semibold text-[1.15rem]">
                  Name
                </label>
                <input
                  id="name"
                  {...register('name', { required: 'This is required.' })}
                  autoComplete="off"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  placeholder="Enter member's name"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white h-[2.5rem] w-[18rem] rounded font-semibold transition-all duration-[0.3s] ease-in-out hover:bg-blue-600"
            >
              Add Member
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Register;
