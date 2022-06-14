import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...page } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...page} />
    </SessionProvider>
  )
}

export default MyApp
