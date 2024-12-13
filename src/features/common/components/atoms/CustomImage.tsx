import Image from "next/image";
import React from "react";

interface CustomImageType {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  priority?: boolean;
  style?: any;
  sizes?: string;
  className: string;
}

const CustomImage: React.FC<CustomImageType> = ({
  src,
  width,
  height,
  alt,
  sizes,
  priority,
  style,
  className,
}) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      sizes={sizes}
      priority={priority}
      style={style}
      className={className}
    />
  );
};

export default CustomImage;
