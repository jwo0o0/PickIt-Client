import { useMutation } from "@tanstack/react-query";
import { FeedPayload } from "@/utils/schema/feedSchema";
import { PostFeedResponse } from "../feedTypes";
import { customFetch, FEED_API } from "@/apis";
import { uploadFeedImages } from "@/lib/image/imageApis";

export const usePostFeed = () => {
  return useMutation<PostFeedResponse, Error, { feedData: FeedPayload }>({
    mutationFn: async ({ feedData }) => {
      const feedResponse = await customFetch(FEED_API.POST_FEED, {
        method: "POST",
        body: JSON.stringify({
          content: feedData.content,
          pollContent: feedData.pollContent,
          polls: feedData.polls,
        }),
      });
      if (feedData.images.length > 0) {
        await uploadFeedImages(feedData.images, feedResponse.feedId);
      }
      return feedResponse;
    },
  });
};
