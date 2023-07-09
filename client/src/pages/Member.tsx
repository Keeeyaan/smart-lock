import { useState, useEffect } from 'react';
import axios from 'axios';

const Member = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await axios.get('/api/members', {
          cancelToken: ourRequest.token,
        });
        setMembers(response.data);
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
    <table className="text-center text-md h-auto w-full border border-black">
      <thead className=" border border-black">
        <tr>
          <th className="py-3">ID</th>
          <th>RFID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member: any) => (
          <tr key={member.id} className="border border-black">
            <td className="">{member.id}</td>
            <td>{member.uid}</td>
            <td>{member.name}</td>
            <td className="p-4">
              <select
                defaultValue={member.permission}
                className="px-4 py-1 font-normal text-gray-700 border border-gray-300 rounded outline-none"
              >
                <option value="restrict">Restrict</option>
                <option value="unrestrict">Unrestrict</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Member;
