import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme';

const hitsteps = `<script type="text/javascript">(function(){var hstc=document.createElement('script'); hstc.src='https://log.hitsteps.com/track.php?code=35678bc2881ac2ea2a09e72f77cca75e';hstc.async=true;var htssc = document.getElementsByTagName('script')[0];htssc.parentNode.insertBefore(hstc, htssc);})();
</script><noscript><a href="http://www.hitsteps.com/"><img src="//log.hitsteps.com/track.php?mode=img&amp;code=35678bc2881ac2ea2a09e72f77cca75e" alt="web stats" width="1" height="1" />visitor activity monitoring</a></noscript>`;

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en" style={{ overflowY: 'scroll', height: '100%' }}>
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
        </Head>
        <body style={{ minHeight: '100%' }}>
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{ __html: hitsteps }} />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  };
};
