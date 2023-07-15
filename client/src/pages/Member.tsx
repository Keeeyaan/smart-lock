import { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../components/Card';

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

  if (!members) {
    return <h1>No members found!</h1>;
  }

  return (
    <div className="flex gap-5 flex-wrap">
      {members.map((member: any) => {
        return (
          <Card
            key={member.id}
            rfid={member.uid}
            name={member.name}
            image={member.image}
            permission={member.permission}
          />
        );
      })}
    </div>
  );
};

export default Member;
