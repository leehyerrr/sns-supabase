import CreatePostButton from "@/components/post/creat-post-button";
import { Button } from "@/components/ui";
import supabase from "@/lib/supabase";

function IndexPage() {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };
  return (
    <div className="flex flex-col gap-10">
      <Button onClick={signOut}>로그아웃</Button>
      <CreatePostButton />
    </div>
  );
}

export default IndexPage;
