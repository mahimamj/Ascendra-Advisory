"use client";

import Image, { type ImageProps } from "next/image";

type OptimizedImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
};

/** Next.js Image with sensible defaults: lazy load, WebP/AVIF via optimizer, quality 80 */
export default function OptimizedImage({
  alt,
  quality = 80,
  loading,
  priority,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      alt={alt}
      quality={quality}
      loading={priority ? undefined : loading ?? "lazy"}
      {...props}
    />
  );
}
