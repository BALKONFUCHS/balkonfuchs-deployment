import dynamic from 'next/dynamic';

// Dynamically import the calculator component
const BALKONFUCHSKalkulatorFunnel = dynamic(
  () => import('../balkonfuchs-kalkulator-funnel'),
  { ssr: false }
);

export default function KalkulatorPage() {
  return <BALKONFUCHSKalkulatorFunnel />;
}
