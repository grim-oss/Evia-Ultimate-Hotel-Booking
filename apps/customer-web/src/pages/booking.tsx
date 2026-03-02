import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '../components/layout/Header';
import PaymentSelector from '../components/payment/PaymentSelector';

export default function BookingPage() {
  const { t } = useTranslation('common');
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">{t('book_hotel')}</h2>
        <PaymentSelector />
      </main>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}