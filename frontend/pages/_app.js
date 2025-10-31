import Head from "next/head";
// frontend/pages/_app.js
import '../styles/globals.css';
import 'leaflet/dist/leaflet.css';
import Navbar from "../components/Navbar";





function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
