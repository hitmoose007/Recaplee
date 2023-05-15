import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

function useUserId() {
  const [userId, setUserId] = useState('');
  const supabase = useSupabaseClient();
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error);
      } else {
        setUserId(data?.user.id || '');
      }
    };

    fetchUser();
  }, []);

  return userId;
}

export default useUserId;
