import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Header from '../components/layout/Header';
import PaymentSelector from '../components/payment/PaymentSelector';

export default function PaymentPage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { bookingId, amount } = router.query;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">{t('payment')}</h2>
        <PaymentSelector
          bookingId={bookingId as string}
          amount={amount ? Number(amount) : 1000}
        />
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