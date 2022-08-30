
/** @jsx h */

import { h } from "preact";
import { tw } from "@twind";
export default function Footer() {
  return (
    <footer
      className={tw`flex items-center flex-col justify-center w-full border-t text-center py-1`}
    >
      <p className={tw`mx-5 mb-3`}>
        <span className={tw`pb-5 font-mono`}>
          <a href="https://github.com/moncefplastin07/tweet-to-image-with-fresh">
            Source Code
          </a>
        </span>
        <span>{" "}.{" "}</span>
        <span className={tw`pb-5 font-mono`}>
          <a href="https://twitter.com/moncefplastin07/">Twitter</a>
        </span>
        <span>{" "}.{" "}</span>
        <span>
          <a href="https://facebook.com/moncefplastin07/">Facebook</a>
        </span>
      </p>
    </footer>
  );
}
