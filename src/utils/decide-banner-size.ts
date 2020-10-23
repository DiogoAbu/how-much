type BannerSize =
  | 'banner'
  | 'largeBanner'
  | 'mediumRectangle'
  | 'fullBanner'
  | 'leaderboard'
  | 'smartBannerPortrait'
  | 'smartBannerLandscape';

export default function decideBannerSize({ width }: { width: number }): BannerSize {
  if (width > 728) {
    return 'leaderboard';
  }
  if (width > 468) {
    return 'fullBanner';
  }
  return 'banner';
}
