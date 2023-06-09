import React from 'react';
import Image from 'next/image';
import { useUserContext } from '@/context/user';
import { useRouter } from 'next/router';
type Props = {
  queryId: string;
};

const DeleteButton = ({ queryId }: Props) => {
    const router = useRouter();
  const { user } = useUserContext();
  const deleteQuery = async () => {
    const res = await fetch(`/api/deleteQuery`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        queryId: queryId,
        userId: user.id,
      }),
    });
    const json = await res.json();
    if (!res.ok)  alert(json.error);
    else 
    router.push('/');
    

  };

  return (
    <button
      onClick={() => {
        deleteQuery();
        
      }}
      className=" h-9 md:ml-0 ml-9 w-fit text-xs items-center md:text-base space-x-4 rounded-full bg-[#FF7A83] px-3 text-white flex "
    >
      <Image src="/deleteIcon.svg" width={18} height={20} alt="delete icon" />
      <p>Delete query</p>
    </button>
  );
};

export default DeleteButton;
