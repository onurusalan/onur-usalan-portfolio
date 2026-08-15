import { existsSync } from "node:fs";
import { join } from "node:path";

const publicRoot = join(process.cwd(), "public");

function firstAvailable(paths: string[]) {
  return paths.find((path) => existsSync(join(publicRoot, path.replace(/^\//, "")))) ?? null;
}

export const media = {
  headshot: firstAvailable([
    "/images/onur-headshot.webp",
    "/images/onur-headshot.jpg",
    "/images/onur-headshot.png",
  ]),
  warsawContext: firstAvailable(["/images/warsaw-business-context.webp", "/images/warsaw-business-context.png"]),
  resume: firstAvailable(["/Onur_Usalan_CV.pdf"]),
  introduction: {
    webm: firstAvailable(["/media/onur-introduction.webm"]),
    mp4: firstAvailable(["/media/onur-introduction.mp4"]),
    poster: firstAvailable(["/media/onur-introduction-poster.webp"]),
    captions: firstAvailable(["/media/onur-introduction-captions.vtt"]),
  },
  projectDashboards: {
    "eu-procurement":
      firstAvailable(["/images/projects/eu-procurement/dashboard.webp"]) ??
      "https://raw.githubusercontent.com/onurusalan/eu-digital-procurement-intelligence/main/reports/executive_dashboard.png",
    "ecommerce-decision-system":
      firstAvailable(["/images/projects/ecommerce-decision-system/dashboard.webp"]) ??
      "https://raw.githubusercontent.com/onurusalan/ecommerce-decision-system/main/reports/executive_dashboard.png",
  },
} as const;

export const mediaAvailability = {
  headshot: Boolean(media.headshot),
  warsawContext: Boolean(media.warsawContext),
  resume: Boolean(media.resume),
  introductionVideo: Boolean(media.introduction.webm || media.introduction.mp4),
  introductionPoster: Boolean(media.introduction.poster),
} as const;
