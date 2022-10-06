import { buildClient } from "../api/client";

export default function Root({ currentUser }) {
  if (currentUser) {
    return <h1>You are signed in</h1>;
  } else {
    return <h1>You are NOT signed in</h1>;
  }
}

export async function getServerSideProps(context) {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return {
    props: data, // will be passed to the page component as props
  };
}
