"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { EagleItem, ImageData } from "@/app/types/eagle";

const token = process.env.NEXT_PUBLIC_EAGLE_LOCAL_TOKEN;
const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_PATH;

function generateImageList(data: EagleItem[]): ImageData[] {
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    url: `${baseImageUrl}/${item.id}.info/${encodeURIComponent(item.name)}.${
      item.ext
    }`,
  }));
}

export default function ListPage() {
  const [data, setData] = useState<ImageData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const tagName = searchParams.get("tag");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/eagle/item/list?orderBy=-CREATEDATE&limit=500&tags=${
          tagName ? tagName : ""
        }&token=${token}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP Error ${res.status}`);
        }
        const json = await res.json();

        const dataList = tagName
          ? json.data
          : json.data.filter(
              (img: EagleItem) =>
                (!img.tags || img.tags.length === 0) &&
                (!img.folders || img.folders.length === 0)
            );

        const images = generateImageList(dataList);
        setData(images);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      }
    };
    fetchData();
  }, [tagName]);

  return (
    <div>
      {error && <p>Error..: {error}</p>}
      {data === null && !error && <p>Loading...</p>}
      <ul className="grid grid-cols-3 gap-1 m-1">
        {data?.map((img) => (
          <li key={img.id}>
            <Link href={`/detail/${img.id}`}>
              <img
                loading="lazy"
                src={img.url}
                alt={img.name}
                className="w-full aspect-square object-cover"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
