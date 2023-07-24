/**
 * <Quick Rule>
 * For `React Component Props`, use `type`
 * For other object-like or class-like stuffs, use `interface`
 */

export interface IClubIntroduce {
  uuid: string;
  name: string;
  content: string;
  short_desc: string;
  location: string;
  representative: string;
  contact: string;
  image_url?: string;
  homepage_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
}

export interface IAssociationIntroduce {
  uuid: string;
  name: string;
  content: string;
  location: string;
  representative: string;
  contact: string;
  image_url?: string;
  homepage_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
}
