"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import type { EagleItem } from "@/app/types/eagle";

const token = process.env.NEXT_PUBLIC_EAGLE_LOCAL_TOKEN;
const baseApiUrl = process.env.NEXT_PUBLIC_EAGLE_API_PATH;
const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_PATH;

function generateImageUrl(data: EagleItem): string {
  return `${baseImageUrl}/${data.id}.info/${encodeURIComponent(data.name)}.${
    data.ext
  }`;
}

export default function DetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<EagleItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const url = `${baseApiUrl}/item/info?id=${id}&token=${token}`;
        const res = await fetch(url);
        if (!res.ok) return notFound();

        const json = await res.json();
        setData(json.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      }
    };
    fetchData();
  }, [id]);
  return (
    <div>
      {error && <p>Error..: {error}</p>}
      {data === null && !error && <p>Loading...</p>}
      {data && (
        <>
          <img
            src={generateImageUrl(data)}
            alt={data.name}
            className="max-w-full max-h-screen mb-2"
          />
          <pre className="mt-4 text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}

// {`${baseImageUrl}/${id}.info/${encodeURIComponent(data.name)}.${data.ext}`}
