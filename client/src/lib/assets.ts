// Asset imports for product images
import logoImage from "@assets/LL-removebg-preview_1751631586310.png";
import luxuryCarDetailingImage from "@assets/Luxury Car Detailing in Action_1751633951336.png";
import envisionImage from "@assets/envision_1751633056861.webp";
import exceliteImage from "@assets/excelite_1751633056862.webp";
import maxxlinkImage from "@assets/maxxlink_1751633056862.webp";
import brazoImage from "@assets/brazo_1751633056863.webp";
import jumpStarterImage from "@assets/jump starter_1751633125531.webp";
import bergmannImage from "@assets/bergmann_1751633125532.webp";
import dashboardAccessoriesImage from "@assets/DASHBOARD ACCESSORIES_1751633571622.png";
import carFloorMatImage from "@assets/CAR FLOOR MAT_1751633571624.png";
import carSeatCoversImage from "@assets/CAR SEAT COVERS_1751633571624.png";
// Showroom gallery images
import showroom1 from "@assets/2025-05-20 (1)_1751633753234.jpg";
import showroom2 from "@assets/2025-05-20 (2)_1751633753235.webp";
import showroom3 from "@assets/2023-05-06 (1)_1751633753236.webp";
import showroom4 from "@assets/2025-03-09 (1)_1751633753236.webp";
import showroom5 from "@assets/2025-05-06 (1)_1751633753237.webp";
import showroom6 from "@assets/2025-05-20_1751633753237.jpg";
import showroom7 from "@assets/2023-05-06_1751633753238.webp";
import showroom8 from "@assets/2025-03-03_1751633753238.webp";
import showroom9 from "@assets/2025-05-20 (1)_1751633753238.webp";
import showroom10 from "@assets/2025-03-09_1751633753238.webp";
import showroom11 from "@assets/2025-05-03_1751633753239.webp";
import showroom12 from "@assets/2025-05-06_1751633753239.webp";
import luxuryCarDetailingImage from "@assets/Luxury Car Detailing in Action_1751633951336.png";
import dashcam70mai from "@assets/70mai_1751634096290.webp";
import dashcam70maiNew from "@assets/70mai_1751644567623.webp";
import heroImage1 from "@assets/1001_1751652556369.png";
import heroImage2 from "@assets/1002_1751652556369.png";
import heroImage3 from "@assets/1003_1751652556368.png";

export const assetMap: Record<string, string> = {
  "LL-removebg-preview_1751631586310.png": logoImage,
  "Luxury Car Detailing in Action_1751633951336.png": luxuryCarDetailingImage,
  "envision_1751633056861.webp": envisionImage,
  "excelite_1751633056862.webp": exceliteImage,
  "maxxlink_1751633056862.webp": maxxlinkImage,
  "brazo_1751633056863.webp": brazoImage,
  "jump starter_1751633125531.webp": jumpStarterImage,
  "bergmann_1751633125532.webp": bergmannImage,
  "DASHBOARD ACCESSORIES_1751633571622.png": dashboardAccessoriesImage,
  "CAR FLOOR MAT_1751633571624.png": carFloorMatImage,
  "CAR SEAT COVERS_1751633571624.png": carSeatCoversImage,
  // Showroom images
  "2025-05-20 (1)_1751633753234.jpg": showroom1,
  "2025-05-20 (2)_1751633753235.webp": showroom2,
  "2023-05-06 (1)_1751633753236.webp": showroom3,
  "2025-03-09 (1)_1751633753236.webp": showroom4,
  "2025-05-06 (1)_1751633753237.webp": showroom5,
  "2025-05-20_1751633753237.jpg": showroom6,
  "2023-05-06_1751633753238.webp": showroom7,
  "2025-03-03_1751633753238.webp": showroom8,
  "2025-05-20 (1)_1751633753238.webp": showroom9,
  "2025-03-09_1751633753238.webp": showroom10,
  "2025-05-03_1751633753239.webp": showroom11,
  "2025-05-06_1751633753239.webp": showroom12,
  "Luxury Car Detailing in Action_1751633951336.png": luxuryCarDetailingImage,
  "70mai_1751634096290.webp": dashcam70mai,
  "70mai_1751644567623.webp": dashcam70maiNew,
  "1001_1751652556369.png": heroImage1,
  "1002_1751652556369.png": heroImage2,
  "1003_1751652556368.png": heroImage3,
};

export function getAssetUrl(assetPath: string): string {
  if (assetPath.startsWith("@assets/")) {
    const filename = assetPath.replace("@assets/", "");
    return assetMap[filename] || assetPath;
  }
  return assetPath;
}