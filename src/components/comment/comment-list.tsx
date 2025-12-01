import CommentItem from "@/components/comment/comment-item";
import { useCommentData } from "@/hooks/queries/use-comments-data";
import Fallback from "../fallback";
import Loader from "../loader";

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    error: fetchCommentsError,
    isPending: isFetchCommentPending,
  } = useCommentData(postId);

  if (fetchCommentsError) return <Fallback />;
  if (isFetchCommentPending) return <Loader />;

  return (
    <div className="flex flex-col gap-5">
      {comments?.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
