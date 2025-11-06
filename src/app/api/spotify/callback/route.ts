import { setFlash } from "@/lib/flash";
import { requestAccessToken } from "@/lib/spotify/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("spotify_auth_state")?.value;

  if (state === null || state !== storedState) {
    throw new Error("state mismatch");
  } else {
    cookieStore.delete("spotify_auth_state");

    if (code !== null) {
      await requestAccessToken(code);

      await setFlash("success", "Spotifyアカウントに連携しました。");
    } else {
      await setFlash("error", "Spotifyの認証に失敗しました。");
    }
  }

  redirect("/spotify/login");
};
