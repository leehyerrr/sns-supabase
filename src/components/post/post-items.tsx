import { MessageCircle } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { formatTimeAgo } from "@/lib/time";
import EditPostButton from "./edit-post-button";
import DeletePostButton from "./delete-post-button";
import { useSession } from "@/store/session";
import { usePostByIdData } from "@/hooks/queries/use-post-by-id-data";
import Loader from "../loader";
import Fallback from "../fallback";
import LIkePostButton from "./like-post-button";

export default function PostItem({ postId }: { postId: number }) {
  const session = useSession();
  const userId = session?.user.id;
  const {
    data: post,
    isPending,
    error,
  } = usePostByIdData({ postId, type: "FEED" });

  if (isPending) return <Loader />;
  if (error) return <Fallback />;

  const isMine = post.author_id === userId;

  return (
    <div className="flex flex-col gap-4 border-b pb-8">
      <div className="flex justify-between">
        <div className="flex items-start gap-4">
          <img
            src={post.author.avatar_url || defaultAvatar}
            alt={`${post.author.nickname}의 프로필 이미지`}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="font-bold hover:underline">
              {post.author.nickname}
            </div>
            <div className="text-muted-foreground text-sm">
              {/* {new Date(post.created_at).toLocaleString()} */}
              {formatTimeAgo(post.created_at)}
            </div>
          </div>
        </div>

        <div className="text-muted-foreground flex text-sm">
          {isMine && (
            <>
              <EditPostButton {...post} />
              <DeletePostButton id={post.id} />
            </>
          )}
        </div>
      </div>

      <div className="flex cursor-pointer flex-col gap-5">
        <div className="wrap-break-words line-clamp-2 whitespace-pre-wrap">
          {post.content}
        </div>

        <Carousel>
          <CarouselContent>
            {post.image_urls?.map((url, index) => (
              <CarouselItem className={`basis-3/5`} key={index}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={url}
                    className="h-full max-h-[350px] w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex gap-2">
        <LIkePostButton
          id={post.id}
          likeCount={post.like_count}
          isLiked={post.isLiked}
        />

        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm">
          <MessageCircle className="h-4 w-4" />
          <span>댓글 달기</span>
        </div>
      </div>
    </div>
  );
}
