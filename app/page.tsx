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

import { useEffect, useState } from "react";

const token = process.env.NEXT_PUBLIC_EAGLE_LOCAL_TOKEN;
const baseApiUrl = `http://192.168.1.38:41595/api`;
const baseImageUrl = `http://192.168.1.38:8080`;
const tagName = "ながも";

function generateImageList(data: EagleItem[]): ImageData[] {
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    url: `${baseImageUrl}/${item.id}.info/${encodeURIComponent(item.name)}.${
      item.ext
    }`,
  }));
}

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${baseApiUrl}/item/list?orderBy=-CREATEDATE&limit=10&tags=${encodeURIComponent(
          tagName
        )}&token=${token}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP Error ${res.status}`);
        }
        const json = await res.json();
        const images = generateImageList(json.data);
        setData(images);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {error && <p>Error..: {error}</p>}
      {data === null && !error && <p>Loading...</p>}
      <ul>
        {data && data.map((img) => (
          <li key={img.id}>
            <img
              src={img.url}
              alt={img.name}
              className="max-w-full max-h-screen mb-2"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
