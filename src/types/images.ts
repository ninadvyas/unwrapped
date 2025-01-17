import { ImageResponse } from '@vercel/og';

export type ImageFile = {
  fileName: string;
  data: Buffer;
  image?: ImageResponse;
};

export type UpdatedImageFile = {
  fileName: string;
  data: string;
  url: string;
};

export type ImageAPIResponse = {
  data: UpdatedImageFile[];
  shareAllUrl: string;
};
