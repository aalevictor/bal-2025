import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <>{session && <h1>{session.user.firstName}</h1>}</>
  );
}
