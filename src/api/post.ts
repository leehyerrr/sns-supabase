import supabase from "@/lib/supabase";

export async function createPost(content: string) {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content,
    })
    .select()
    .single();
  console.log(data);
  return data;
}
