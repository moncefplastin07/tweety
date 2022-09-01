/** @jsx h */

import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import domtoimage from "https://esm.sh/dom-to-image@2.6.0";
import Spinner from "./../components/Spinner.tsx";
import ToggleButton from "../components/ToggleButton.tsx";
export default function Counter() {
  const [tweetInformation, setTweetInformation] = useState(null);
  const [randomBackgound, setRandomBackgound] = useState(
    "linear-gradient(225deg, rgb(207, 172, 197), rgb(34, 151, 164));",
  );
  const [tweetTextDirection, setTweetTextDirection] = useState("auto");
  const [addWatermark, setAddWartermark] = useState(true);
  const [padding, setPadding] = useState(5);
  const [copyToClipboardStatus, setCopyToClipboardCopyStatus] = useState(null);
  const [showCopyToClipboardStatus, setShowCopyToClipboardStatus] = useState(
    false,
  );
  const [onWorking, setOnWorking] = useState(false);
  const [showTweetMetrics, setShowTweetMetrics] = useState(true);
  const [showTweetTime, setShowTweetTime] = useState(true);
  const [showTweetSource, setShowTweetSource] = useState(true);
  const gradientColorList = [
    "linear-gradient(328deg, rgb(146, 87, 118), rgb(194, 0, 58))",
    "linear-gradient(150deg, rgb(99, 68, 223), rgb(101, 153, 244))",
    "linear-gradient(225deg, rgb(207, 172, 197), rgb(34, 151, 164))",
    "linear-gradient(267deg, rgb(144, 190, 148), rgb(167, 64, 70))",
    "linear-gradient(98deg, rgb(181, 252, 213), rgb(180, 237, 183))",
    "linear-gradient(24deg, rgb(131, 24, 76), rgb(125, 221, 175))",
    "linear-gradient(144deg, rgb(168, 104, 200), rgb(77, 137, 146))",
    "linear-gradient(267deg, rgb(0 0 0 / .45), rgb(0 0 0 / .45))",
  ];
  const getTweetInformation = async (e) => {
    e.preventDefault();
    setOnWorking(true);
    const tweetURL = document?.getElementById("tweetURL")?.value;
    const tweetID = tweetURL.split("/").at(-1);
    const response = await fetch(`api/tweet/${tweetID}`);
    setTweetInformation(await response.json());
    generateGrad();
    setOnWorking(false);
  };

  const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const generateGrad = () => {
    const angle = Math.floor(Math.random() * 360);
    const randomBG =
      `linear-gradient(${angle}deg, ${randomColor()}, ${randomColor()})`;
    setRandomBackgound(randomBG);
  };
  const switchDirection = () => {
    setTweetTextDirection(tweetTextDirection === "LTR" ? "RTL" : "LTR");
  };
  const publishTime = (dateString: string) => {
    const date = new Date(dateString);

    return `${
      date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    }  .  ${
      date.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    }`;
  };
  const changePadding = (e) => {
    setPadding(e.target.value);
  };
  const setGradBackground = (e) => {
    setRandomBackgound(e.target.value);
  };
  const saveAs = async () => {
    const url = window.URL;
    const blob = await nodeToBlobImage();
    const link = document.createElement("a");
    link.download = `tweet from @${
      tweetInformation?.data?.includes.users[0].username
    }(${tweetInformation?.data?.includes.users[0].name})`;
    link.href = url.createObjectURL(blob);
    link.click();
  };
  const nodeToBlobImage = async () => {
    const node = document?.getElementById("tweetContent");
    const style = {
      transform: "scale(2)",
      transformOrigin: "top left",
    };
    const scale = 2;
    const param = {
      height: node.offsetHeight * scale,
      width: node.offsetWidth * scale,
      quality: 1,
      style,
    };
    return await domtoimage.toBlob(
      document?.getElementById("tweetContent"),
      param,
    );
  };
  const copyToClipboard = async () => {
    setShowCopyToClipboardStatus(true);
    setTimeout(() => {
      setShowCopyToClipboardStatus(false);
    }, 2200);
    try {
      const blob = await nodeToBlobImage();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setCopyToClipboardCopyStatus({ isCopied: true });
    } catch (error) {
      setCopyToClipboardCopyStatus({ isCopied: false });
    }
  };
  const shortNumber = (number: any) => {
    if (number < 1000) {
      return number;
    }
    if (number < 1000000) {
      return `${(number / 1000).toFixed()}k`;
    }
    return `${(number / 1000000).toFixed()}m`;
  };
  return (
    <div class={tw`border border-gray-200 rounded-md font-sans `}>
      <div className={tw`mx-5 my-5`}>
        <form onSubmit={getTweetInformation}>
          <input
            type="text"
            name="tweetURL"
            id="tweetURL"
            className={tw`border border-gray-200 focus:border-gray-200 h-16 w-full px-5`}
            placeholder="Enter the tweet link e.g: https://twitter.com/deno_land/status/1429746895010861056"
            autoFocus={true}
          />
        </form>

        {onWorking ? <Spinner /> : ""}
        {addWatermark}

        {tweetInformation?.data
          ? (
            <div className={tw``}>
              <div>
                <button
                  onClick={switchDirection}
                  className={tw`mx-5 my-3 px-5 py-2 border border-gray-100 rounded-md`}
                >
                  {tweetTextDirection}
                </button>
                <button
                  onClick={generateGrad}
                  className={tw`mx-5 my-3 px-5 py-2 border border-gray-100 rounded-md`}
                >
                  Random background
                </button>
                <input
                  type="range"
                  step={1}
                  min={1}
                  max={25}
                  onChange={changePadding}
                  value={padding}
                  className={tw`w-64 mx-5`}
                />
              </div>
              <div className={tw`flex gap-4 m-5`}>
                {gradientColorList.map((grad) => (
                  <button
                    className={tw`rounded-full h-8 w-8`}
                    style={`background: ${grad}`}
                    value={grad}
                    onClick={setGradBackground}
                  />
                ))}
              </div>
              <div className={tw`grid grid-cols-4 mx-5  py-6`}>
                <div className={tw`inline-flex`}>
                  <span className={tw`mx-3 font-bold text-gray-600`}>
                    Metrics:
                  </span>
                  <ToggleButton
                    isChecked={showTweetMetrics}
                    onChange={() => setShowTweetMetrics(!showTweetMetrics)}
                  />
                </div>
                <div className={tw`inline-flex`}>
                  <span className={tw`mx-3 font-bold text-gray-600`}>
                    Time:
                  </span>
                  <ToggleButton
                    isChecked={showTweetTime}
                    onChange={() => setShowTweetTime(!showTweetTime)}
                  />
                </div>
                <div className={tw`inline-flex`}>
                  <span className={tw`mx-3 font-bold text-gray-600`}>
                    Source:
                  </span>
                  <ToggleButton
                    isChecked={showTweetSource}
                    onChange={() => setShowTweetSource(!showTweetSource)}
                  />
                </div>
                <div className={tw`inline-flex`}>
                  <span className={tw`mx-3 font-bold text-gray-700`}>
                    Watermark:
                  </span>
                  <ToggleButton
                    isChecked={addWatermark}
                    onChange={() => setAddWartermark(!addWatermark)}
                  />
                </div>  
              </div>
            </div>
          )
          : ""}
      </div>
      {tweetInformation?.data
        ? (
          <div
            id="tweetContent"
            className={tw`p-5`}
            style={`background:${randomBackgound}; padding:${padding}%`}
          >
            <div
              className={tw`p-7 bg-white rounded-md shadow-xl bg-opacity-40	 `}
            >
              <div
                dir={tweetTextDirection}
                className={tw`w-full whitespace-pre-line	`}
              >
                <div className={tw`flex`}>
                  <img
                    className={tw`rounded-full mx-5`}
                    src={tweetInformation?.data?.includes.users[0]
                      .profile_image_url}
                    alt=""
                    srcset=""
                  />
                  <div className={tw``}>
                    <p className={tw`flex`}>
                      {tweetInformation?.data?.includes.users[0].name}{" "}
                      {tweetInformation?.data?.includes.users[0].verified
                        ? (
                          <img
                            src="./Twitter_Verified_Badge.png"
                            className={tw`h-5 w-5`}
                            alt=""
                          />
                        )
                        : ""}
                    </p>
                    <span>
                      @{tweetInformation?.data?.includes.users[0].username}
                    </span>
                  </div>
                </div>
                {tweetInformation?.data?.data?.text}
              </div>
              <div className={tw`text-gray-700`}>
                {
                  showTweetSource || showTweetTime ? (
                      <p>
                        {showTweetTime ? publishTime(tweetInformation?.data?.data?.created_at) : ""} {" "}
                        {showTweetSource ? `. ${tweetInformation?.data?.data?.source}` : ""}
                      </p>
                  ) : ""
                }
                {showTweetMetrics ? (
                  <div>
                    <span className={tw`mr-5`}>
                      <strong className={tw`mr-2 text-black`}>
                        {shortNumber(
                          tweetInformation?.data?.data?.public_metrics?.like_count,
                        )}
                      </strong>Likes
                    </span>
                    <span className={tw`mr-5`}>
                      <strong className={tw`mr-2 text-black`}>
                        {shortNumber(
                          tweetInformation?.data?.data?.public_metrics
                            ?.retweet_count,
                        )}
                      </strong>Retweets
                    </span>
                  </div>
                ) :
                ""}
              </div>
            </div>
            {addWatermark
              ? (
                <span className={tw`text-gray-100 text-opacity-40`}>
                  generated By {window.location.host}
                </span>
              )
              : ""}
          </div>
        )
        : (
          tweetInformation
            ? (
              <div className={tw`bg-red-100 p-5 text-lg text-center`}>
                Sorry, there was an unintentional error 🥺
              </div>
            )
            : ""
        )}

      {tweetInformation?.data
        ? (
          <div className={tw`grid grid-cols-4`}>
            <button
              onClick={saveAs}
              className={tw`mx-5 my-3 px-5 py-2 border border-gray-200 rounded-md`}
            >
              Save As
            </button>
            <button
              onClick={copyToClipboard}
              className={tw`mx-5 my-3 px-5 py-2 border border-gray-200 rounded-md relative`}
            >
              Copy
              {showCopyToClipboardStatus
                ? (copyToClipboardStatus
                  ? (
                    <span
                      className={tw`absolute bottom-10 bg-opacity-40 min-w-max mx-5 my-3  p-2 border-0 outline-none bg-white text-sm rounded-md ${
                        !copyToClipboardStatus?.isCopied
                          ? "text-red-500 border-red-200 bg-red-50"
                          : ""
                      }`}
                    >
                      {copyToClipboardStatus?.isCopied
                        ? "Image Copied Done!"
                        : "Error: Image don't copied"}
                    </span>
                  )
                  : "")
                : ""}
            </button>
          </div>
        )
        : ""}
    </div>
  );
}
