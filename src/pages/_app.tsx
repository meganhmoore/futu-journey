// src/pages/_app.tsx

import '../styles/global.css'

import { AppProps } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default App
