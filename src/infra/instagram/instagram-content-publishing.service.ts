import { InstagramContentPublishingClient } from "@/infra/instagram/instagram-content-publishing.client";
import type {
  IInstagramContentPublishingService,
  IPublishCarouselInput,
  IPublishMediaInput,
  IPublishMediaResult,
} from "@/domain/instagram/instagram-content-publishing.service";

export class InstagramContentPublishingService
  implements IInstagramContentPublishingService
{
  private readonly client = new InstagramContentPublishingClient();

  publishPost(input: IPublishMediaInput): Promise<IPublishMediaResult> {
    return this.client.publishPost(input);
  }

  publishCarouselPost(input: IPublishCarouselInput): Promise<IPublishMediaResult> {
    return this.client.publishCarouselPost(input);
  }

  publishStory(input: IPublishMediaInput): Promise<IPublishMediaResult> {
    return this.client.publishStory(input);
  }
}
