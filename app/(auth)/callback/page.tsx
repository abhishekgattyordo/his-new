'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // After magic link, we redirect to the password set page
        router.push('/set-password');
      } else {
        router.push('/login');
      }
    });
  }, [router]);

  return <div>Verifying...</div>;
}