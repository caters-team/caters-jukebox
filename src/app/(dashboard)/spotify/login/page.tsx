import LoginButton from "@/components/login/LoginButton";
import Alert from "@/components/ui/alert/Alert";
import { refreshTokenExists } from "@/lib/redis";

const Page = async () => {
  const isLogin = await refreshTokenExists();

  return (
    <>
      {isLogin ? (
        <Alert variant="success" title="Spotifyにログインしています。">
          <LoginButton>Spotifyアカウントを変更する</LoginButton>
        </Alert>
      ) : (
        <Alert variant="warning" title="Spotifyにログインしていません。">
          <LoginButton>Spotifyにログイン</LoginButton>
        </Alert>
      )}
    </>
  );
};

export default Page;
