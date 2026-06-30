import type { Publication } from "@/domain/entities/publication.entity";
import type { IPublicationDto } from "@/app/usecases/publication/dto/publication.dto";

export function mapPublicationToDto(publication: Publication): IPublicationDto {
  const data = publication.toObject();
  const objectKeys = data.objectKeys.length > 0
    ? data.objectKeys
    : data.objectKey
      ? [data.objectKey]
      : [];

  const objectsPath = "/public/objects/";
  const objectsPathIndex = data.mediaUrl.indexOf(objectsPath);
  const mediaUrls =
    objectKeys.length > 0 && objectsPathIndex >= 0
      ? objectKeys.map((objectKey) => {
          const base = data.mediaUrl.slice(0, objectsPathIndex + objectsPath.length);
          return `${base}${objectKey}`;
        })
      : [data.mediaUrl];

  return {
    id: data.id,
    type: data.type,
    destinationScope: data.destinationScope,
    caption: data.caption,
    mediaUrl: data.mediaUrl,
    mediaUrls,
    status: data.status,
    targets: data.targets.map((target) => ({
      id: target.id,
      instagramConnectedAccountId: target.instagramConnectedAccountId,
      status: target.status,
      instagramMediaId: target.instagramMediaId,
      instagramPermalink: target.instagramPermalink,
      errorMessage: target.errorMessage,
    })),
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  };
}
