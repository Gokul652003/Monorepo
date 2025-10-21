import paths from '@/config/paths';
import { supabase } from '../lib/supabase-client';

export const redirectToLoginRoute = () => {
//   const searchParams = new URLSearchParams();
//   const redirectTo = searchParams.get('redirectTo') ?? window.location.pathname;

  window.location.href = paths.auth;
};

export const getBearerToken = async () => {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    const token = data.session.access_token;

    return token ? `Bearer ${token}` : token;
  }
};
