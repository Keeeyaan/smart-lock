import { useEffect, useState } from 'react';
import axios from 'axios';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await axios.get('/api/logs', {
          cancelToken: ourRequest.token,
        });
        setLogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div className="h-[400px] w-[1000px] bg-slate-100 border rounded shadow p-4">
        {logs.length !== 0 ? (
          <table className="h-auto w-full">
            <thead className="border-b border-slate-400 text-left text-slate-800">
              <tr>
                <th className="pb-2">Date</th>
                <th className="pb-2">Message</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {logs.map((log: { date: Date; message: string }) => {
                return (
                  <tr>
                    <td className="pt-2">{log.date.toLocaleDateString()}</td>
                    <td className="pt-2">{log.message}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1>No Logs found!</h1>
        )}
      </div>
    </div>
  );
};

export default Logs;
