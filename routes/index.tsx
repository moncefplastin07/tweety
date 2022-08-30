/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";
import Convertor from "../islands/Convertor.tsx";
import Footer from "../components/Footer.tsx";
export default function Home() {
  return (
    <div className={tw`p-4 mx-auto max-w-screen-md bg-cyan-500 my-5`}>
      <Head>
        <title>
        Tweet to Image
        </title>
      </Head>
      <h1 className={tw`text-3xl my-6 font-bold`} style="color: rgb(14 165 233);"><span className={tw`rounded-md text-white px-3 py-1`} style="background: rgb(14 165 233);">Tweet</span> to <span>Image</span></h1>
      <Convertor/>
      <Footer/>
    </div>
  );
}
