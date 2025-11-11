"use client";

import Button from "@/components/ui/button/Button";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify?: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume: number;
      }) => SpotifyPlayer;
    };
  }

  interface SpotifyPlayer {
    addListener(
      event: string,
      callback: (data: { deviceId?: string; message?: string }) => void
    ): void;
    connect(): Promise<boolean>;
    disconnect(): void;
    togglePlay(): Promise<void>;
  }
}

const Player = ({ accessToken }: { accessToken: string }) => {
  const [player, setPlayer] = useState<SpotifyPlayer | undefined>(undefined);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (!window.Spotify) return;

      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: (token: string) => void) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ deviceId }) => {
        console.log("Ready with Device ID", deviceId);
      });

      player.addListener("not_ready", ({ deviceId }) => {
        console.log("Device ID has gone offline", deviceId);
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });

      player.connect();
    };
  }, [accessToken]);

  return (
    <Button
      type="button"
      size="sm"
      variant="primary"
      onClick={() => player?.togglePlay()}
    >
      再生/停止
    </Button>
  );
};

export default Player;
