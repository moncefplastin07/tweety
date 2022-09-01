/** @jsx h */

import { h } from "preact";
import { tw } from "@twind";

export default function ToggleButton(props: any) {
  return (
    <label for="default-toggle" className={tw`cursor-pointer`}>
      <input
        type="checkbox"
        value=""
        id="default-toggle"
        className={tw`sr-only peer`}
        {...props}
        checked={props.isChecked}
      />
      <div className={tw`w-11 h-6 p-0.5 bg-gray-200 rounded-full relative`}>
        <div
          className={tw`w-5 h-5 bg-white rounded-full transition ease-in-out duration-300 absolute ${
            props.isChecked ? "bg-blue-400 right-0.5	" : ""
          }`}
        >
        </div>
      </div>
    </label>
  );
}
