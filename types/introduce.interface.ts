/**
 * <Quick Rule>
 * For `React Component Props`, use `type`
 * For other object-like or class-like stuffs, use `interface`
 */

export interface IClubIntroduce {
  content: string;
  location: string;
  representative: string;
  contact: string;
  logoName: string;
  homepage_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
}

export interface IAssociationIntroduce {
  content: string;
  location: string;
  representative: string;
  contact: string;
  logoName: string;
  homepage_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
}
