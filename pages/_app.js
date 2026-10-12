import '../styles/globals.css'
import 'leaflet/dist/leaflet.css'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'

const progress = new ProgressBar({
  size: 3,
  color: '#FF385C',
  className: 'z-[100]',
  delay: 100,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
