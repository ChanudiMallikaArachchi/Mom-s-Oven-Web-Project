"use client";

import Image from "next/image";

interface Props {
  image: string;
}

export default function CakeGallery({ image }: Props) {
  return (
    <div className="relative h-[550px] overflow-hidden rounded-3xl bg-white shadow-xl">
      <Image
        src={image}
        alt="Cake"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition duration-500 hover:scale-105"
      />
    </div>
  );
}