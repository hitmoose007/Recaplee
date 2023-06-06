import {
    createPagesServerClient,
  SupabaseClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

type LoggedInHandler<T> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  user: User,
  supabaseClient: SupabaseClient<any, 'public', any>
) => void;

export default function isLoggedIn<T>(handler: LoggedInHandler<T>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const supabaseServerClient = createPagesServerClient({
      req,
      res,
    });

    const {
      data: { user },
    } = await supabaseServerClient.auth.getUser();

    if (!user) {
      return res.status(401).json({ message: 'Not logged in' });
    }

    return handler(req, res, user, supabaseServerClient);
  };
}
