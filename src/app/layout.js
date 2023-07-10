import './globals.css'
import RecoilRootProvider from '../../utils/RecoilRootProvider'
import ReactQueryProvider from '../../utils/ReactQueryProvider'
import ReCaptchaProvider from '../../utils/ReCaptchaProvider'
import Header from '@/component/common/Header'
import Footer from '@/component/common/Footer'
export const metadata = {
  title: 'Koicode',
  description: 'koicode',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReCaptchaProvider>
        <ReactQueryProvider>
          <RecoilRootProvider>
            <body >
              <Header></Header>
              {children}
              <Footer></Footer>
            </body>
          </RecoilRootProvider>
        </ReactQueryProvider>
      </ReCaptchaProvider>
    </html>
  )
}
