import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@/shared/theme';
import { AppProps } from 'next/dist/shared/lib/router/router';
import DialogContainer from '@/components/layout/dialog-container';
import { SnackbarProvider } from 'notistack';

import Amplify from 'aws-amplify';
import config from '@/aws-exports';
import 'tailwindcss/tailwind.css'

Amplify.configure({
  ...config,
});

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles: Element | null = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{process.env.NEXT_PUBLIC_PROJECT_NAME}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StylesProvider injectFirst>
            <Component {...pageProps} />
          </StylesProvider>
          <DialogContainer />
        </ThemeProvider>
      </SnackbarProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
