import '../styles/global.css'
import { ApolloProvider } from '@apollo/client'
import client from "/graphql/apollo-client"
import {NextUIProvider} from '@nextui-org/react'
 
export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <NextUIProvider>
          <Component {...pageProps} />
      </NextUIProvider>
    </ApolloProvider>
  )
}