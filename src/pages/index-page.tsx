import CreatePostButton from "@/components/post/creat-post-button";
import { Button } from "@/components/ui";
import PostFeed from "@/components/post/post-feed";
import supabase from "@/lib/supabase";

function IndexPage() {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };
  return (
    <div className="flex flex-col gap-10">
      <Button onClick={signOut}>로그아웃</Button>
      <CreatePostButton />
      <PostFeed />
    </div>
  );
}

export default IndexPage;
