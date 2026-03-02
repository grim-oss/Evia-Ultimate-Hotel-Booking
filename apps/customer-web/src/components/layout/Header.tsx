import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { locale, asPath } = router;
  const switchLocale = locale === 'am' ? 'en' : 'am';

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          {t('app_name')}
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:underline">
            {t('home')}
          </Link>
          <Link href="/booking" className="hover:underline">
            {t('booking')}
          </Link>
          <Link href="/payment" className="hover:underline">
            {t('payment')}
          </Link>

          {/* Language Switcher */}
          <Link href={asPath} locale={switchLocale} className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-400">
            {switchLocale === 'am' ? 'አማርኛ' : 'English'}
          </Link>
        </div>
      </nav>
    </header>
  );
}