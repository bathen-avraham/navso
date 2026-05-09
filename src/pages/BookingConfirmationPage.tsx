import { Link, useSearchParams } from 'react-router-dom';
import BookingButton from '../components/BookingButton';
import ConfirmationCard from '../components/ConfirmationCard';
import EmptyState from '../components/EmptyState';
import { useLanguage } from '../contexts/LanguageContext';
import { getBookingById } from '../utils/storage';

export default function BookingConfirmationPage() {
  const { t } = useLanguage();
  const [params] = useSearchParams();
  const id = params.get('id');
  const booking = id ? getBookingById(id) : undefined;

  return (
    <div className="container-page section max-w-3xl">
      {booking ? (
        <ConfirmationCard booking={booking} />
      ) : (
        <EmptyState
          title={t('confirm.notFound.title')}
          subtitle={t('confirm.notFound.subtitle')}
          action={
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/" className="btn-secondary">
                {t('confirm.backHome')}
              </Link>
              <BookingButton labelKey="confirm.bookAnother" />
            </div>
          }
        />
      )}
    </div>
  );
}
