import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Post } from "@/utils/validations/posts";

type PostCardProps = {
  post: Post | undefined;
};

export function PostCard({ post }: PostCardProps) {
  if (!post) return null;
  return (
    <Link href={`/posts/${post.id.toString()}`}>
      <Card>
        <CardHeader>
          <CardTitle>
            <p className="line-clamp-1">{post.title}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-6">{post.body}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
