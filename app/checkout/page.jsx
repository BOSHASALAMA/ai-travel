import CheckoutForm from './CheckoutForm';

export default function Page({ searchParams }) {
  const destinationId = searchParams?.destinationId || null;
  const name = searchParams?.name || '';
  const price = searchParams?.price || '0';

  return <CheckoutForm initial={{ destinationId, name, price }} />;
}