"use server";

import { setFlash } from "@/lib/flash";
import * as api from "@/lib/spotify/api";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const redirectToSpotify = async () => {
  const generateRandomString = (length: number) => {
    return crypto.randomBytes(60).toString("hex").slice(0, length);
  };

  const state = generateRandomString(16);
  (await cookies()).set("spotify_auth_state", state);

  redirect(api.getAuthorizeUrl(state));
};

export const startPlayback = async () => {
  try {
    await api.startPlayback();
    await setFlash("success", "再生を開始しました。");
  } catch (error) {
    console.log(error);
    await setFlash("error", "再生を開始できませんでした。");
  }

  redirect("/player");
};

export const pausePlayback = async () => {
  try {
    await api.pausePlayback();
    await setFlash("success", "再生を停止しました。");
  } catch (error) {
    console.log(error);
    await setFlash("error", "再生を停止できませんでした。");
  }

  redirect("/player");
};

export const skipToNext = async () => {
  try {
    await api.skipToNext();
    await setFlash("success", "次のトラックにスキップしました。");
  } catch (error) {
    console.log(error);
    await setFlash("error", "次のトラックにスキップできませんでした。");
  }

  redirect("/player");
};

export const skipToPrevious = async () => {
  try {
    await api.skipToPrevious();
    await setFlash("success", "前のトラックにスキップしました。");
  } catch (error) {
    console.log(error);
    await setFlash("error", "前のトラックにスキップできませんでした。");
  }

  redirect("/player");
};

export const setPlaybackVolume = async (volumePercent: number) => {
  try {
    await api.setPlaybackVolume(volumePercent);
    await setFlash("success", "ボリュームを設定しました。");
  } catch (error) {
    console.log(error);
    await setFlash("error", "ボリュームを設定できませんでした。");
  }

  redirect("/player");
};

export const addItemToPlaybackQueue = async (uri: string) => {
  try {
    await api.addItemToPlaybackQueue(uri);
    await setFlash("success", "トラックをキューに追加しました。");
  } catch (error) {
    console.log(error);
    await setFlash("error", "トラックをキューに追加できませんでした。");
  }

  redirect("/dashboard");
};
