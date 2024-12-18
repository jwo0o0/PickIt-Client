import { useMutation } from "@tanstack/react-query";
import { customFetch, FEED_API } from "@/apis";
import { PatchFeedResponse } from "../feedTypes";
import { FeedEditPayload } from "@/utils/schema/feedSchema";
import { updateFeedImages } from "@/lib/image/imageApis";

export const usePatchFeed = () => {
  return useMutation<
    PatchFeedResponse,
    Error,
    { feedId: number } & FeedEditPayload
  >({
    mutationFn: async ({ feedId, content, pollContent, images }) => {
      const patchResponse = await customFetch(FEED_API.PATCH_FEED(feedId), {
        method: "PATCH",
        body: JSON.stringify({ content, pollContent }),
      });
      if (images.length > 0) {
        await updateFeedImages(images, feedId);
      }
      return patchResponse;
    },
  });
};
