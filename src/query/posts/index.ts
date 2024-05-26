import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/utils/fetcher";
import { Comment } from "@/utils/validations/comments";
import { Post } from "@/utils/validations/posts";

export const getPostsConfig = (page: number) => {
  return {
    queryKey: ["posts/getPosts", page],
    queryFn: () => fetchData<Post[]>(`/posts?page=${page}`),
  };
};

export const useGetPosts = (page: number) => {
  return useQuery(getPostsConfig(page));
};

export const getPostByIdConfig = (postId: number) => {
  return {
    queryKey: ["posts/getPostById", postId],
    queryFn: () => fetchData<Post>(`/posts/${postId}`),
  };
};

export const useGetPostById = (postId: number) => {
  return useQuery(getPostByIdConfig(postId));
};

export const getPostByIdCommentConfig = (postId: number) => {
  return {
    queryKey: ["posts/getPostByIdComment", postId],
    queryFn: () => fetchData<Comment[]>(`/posts/${postId}/comments`),
  };
};

export const useGetPostByIdComment = (postId: number) => {
  return useQuery(getPostByIdCommentConfig(postId));
};
