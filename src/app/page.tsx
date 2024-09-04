import Image from "next/image";
import { UserInfo } from "./components/UserInfo/UserInfo";

export default function Home() {
  return (
  <main className="grid place-items-center h-screen -mt-24">
    <UserInfo />
  </main>
  );
}
