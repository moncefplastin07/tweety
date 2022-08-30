import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Response => {
  const tweetID = _ctx.params?.id;
  if (tweetID) {
    const res = await fetch(`https://twimage.vercel.app/api/tweet/${tweetID}`);
    return new Response(await res.text(), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return new Response("Error! 404", { status: 404 });
};
