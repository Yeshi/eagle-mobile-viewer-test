"use client";

type EagleItem = {
  id: string;
  name: string;
  ext: string;
};

type ImageData = {
  id: string;
  name: string;
  url: string;
};

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const token = process.env.NEXT_PUBLIC_EAGLE_LOCAL_TOKEN;
const baseApiUrl = process.env.NEXT_PUBLIC_EAGLE_API_PATH;
const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_PATH;
// const tagName = "ながも";

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
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const tagName = searchParams.get("tag");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${baseApiUrl}/item/list?orderBy=-CREATEDATE&limit=90&tags=${tagName}&token=${token}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP Error ${res.status}`);
        }
        const json = await res.json();
        const images = generateImageList(json.data);
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
  }, []);

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
