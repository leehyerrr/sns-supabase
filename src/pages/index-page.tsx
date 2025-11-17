import { Button } from "@/components/ui";
import supabase from "@/lib/supabase";

function IndexPage() {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };
  return (
    <div>
      <Button onClick={signOut}>로그아웃</Button>
    </div>
  );
}

export default IndexPage;
