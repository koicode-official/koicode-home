import './globals.css'
import RecoilRootProvider from '../../utils/RecoilRootProvider'
import ReactQueryProvider from '../../utils/ReactQueryProvider'
import ReCaptchaProvider from '../../utils/ReCaptchaProvider'
import WithLoading from '../../utils/withLoading'
import StyledComponentsRegistry from '../../utils/StyleRegistre'
import Header from '@/component/common/Header'
import Footer from '@/component/common/Footer'




export const metadata = {
  title: 'Koicode',
  description: 'koicode',
}

export default function RootLayout({ children }) {
  const isLoading = true;

  return (
    <html lang="en">
      <ReCaptchaProvider>
        <ReactQueryProvider>
          <RecoilRootProvider>
            <body >
              <StyledComponentsRegistry>
                <WithLoading>
                  <Header></Header>
                  {children}
                  <Footer></Footer>
                </WithLoading>
              </StyledComponentsRegistry>
            </body>
          </RecoilRootProvider>
        </ReactQueryProvider>
      </ReCaptchaProvider>
    </html>
  )
}
