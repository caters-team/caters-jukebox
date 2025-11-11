import Player from "@/components/play/Player";
import { getAccessToken } from "@/lib/spotify/api";

const Page = async () => {
  const accessToken = await getAccessToken();

  return <Player accessToken={accessToken} />;
};

export default Page;
