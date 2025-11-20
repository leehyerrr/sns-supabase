import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function PostEditorModal() {
  const { isOpen, close } = usePostEditorModal();
  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      close();
    },
    onError: (error) => {
      toast.error("포스트 생성에 실패했습니다.", { position: "top-center" });
    },
  });

  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCloseModal = () => {
    close();
  };

  const handleCreatePostClick = () => {
    if (content.trim() === "") return;
    createPost(content);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!isOpen) return;
    textareaRef.current?.focus();
    setContent("");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>포스트 작성</DialogTitle>
          <textarea
            disabled={isCreatePostPending}
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="max-h-125 min-h-25 focus:outline-none"
            placeholder="무슨 일이 있었나요?"
          />
          <Button
            className="cursor-pointer"
            variant={"outline"}
            disabled={isCreatePostPending}
          >
            <ImageIcon />
            이미지 추가
          </Button>
          <Button
            className="cursor-pointer"
            onClick={handleCreatePostClick}
            disabled={isCreatePostPending}
          >
            저장
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PostEditorModal;
