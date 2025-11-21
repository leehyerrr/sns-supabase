import { Button } from "@/components/ui";
import { BUCKET_NAME } from "@/lib/constants";
import supabase from "@/lib/supabase";
import { useState, type ChangeEvent } from "react";

function TestImageUpload() {
  const [image, setImage] = useState<File | null>(null);

  const handleTest = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      //   console.log(e.target.files[0]);
      setImage(e.target.files[0]);
      console.log(image);
    }
  };

  const xx = async function uploadImage2({
    file,
    filePath,
  }: {
    file: File;
    filePath: string;
  }) {
    const { data: aa, error } = await supabase.storage
      .from("test")
      .upload(filePath, file);

    console.log(aa);

    if (error) throw error;

    const {
      //   data: { publicUrl },
      data: bb,
    } = supabase.storage.from("test").getPublicUrl(aa.path);

    console.log(bb);
    return bb.publicUrl;
  };

  return (
    <>
      <input type="file" accept="image/*" multiple onChange={handleTest} />
      <Button
        onClick={() =>
          image && xx({ file: image, filePath: `images/image.webp` })
        }
      >
        보내기
      </Button>
    </>
  );
}

export default TestImageUpload;
