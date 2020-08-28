import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../context/auth";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Head>
        <title>Realtime Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
