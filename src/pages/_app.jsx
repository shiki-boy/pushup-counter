import { Theme } from '@radix-ui/themes'
import '@/styles/globals.scss'
import '@radix-ui/themes/styles.css'
import { Inter } from 'next/font/google'

const inter = Inter( { subsets: [ 'latin' ] } )

export default function App( { Component, pageProps } ) {

  return (
    <Theme appearance='dark'>
      <div className={ `${ inter.className }` } >
        <Component { ...pageProps } />
      </div>
    </Theme>
  )
}
