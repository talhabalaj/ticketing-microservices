import "bootstrap/dist/css/bootstrap.min.css";

import { buildClient } from "../api/client";
import Header from "../components/Header";

export default function MyApp({ Component, pageProps, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />;
    </div>
  );
}

MyApp.getInitialProps = async (context) => {
  const client = buildClient(context.ctx);
  const { data } = await client.get("/api/users/currentuser");

  return {
    ...data, // will be passed to the page component as props
  };
};
