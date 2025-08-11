import { getPlaiceholder } from "plaiceholder";

export async function getBlurData(imageSrc) {
  const buffer = await fetch(imageSrc).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  return await getPlaiceholder(buffer);
}
