import '../styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
