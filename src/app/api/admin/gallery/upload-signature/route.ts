import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/utils/auth";
import { cloudinary } from "@/utils/cloudinary";

const UPLOAD_FOLDER = "om-kapan-dental/gallery";

export async function POST(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const timestamp = Math.round(Date.now() / 1000);

  // Only params actually included here need to match what the client later
  // sends to Cloudinary — everything else about the upload (resource type,
  // filename, etc.) is inferred by Cloudinary itself at upload time.
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: UPLOAD_FOLDER },
    process.env.CLOUDINARY_API_SECRET as string
  );

  return NextResponse.json({
    signature,
    timestamp,
    folder: UPLOAD_FOLDER,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
}