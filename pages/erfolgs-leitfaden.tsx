import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ErfolgsLeitfadenPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the preview page with email gate
    router.replace('/erfolgs-leitfaden-preview');
  }, [router]);

  return null;
};

export default ErfolgsLeitfadenPage;
