"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { TagsGroupsResponse } from "./types/eagle";

const token = process.env.NEXT_PUBLIC_EAGLE_LOCAL_TOKEN;
const baseApiUrl = process.env.NEXT_PUBLIC_EAGLE_API_PATH;

export default function Home() {
  const [data, setData] = useState<TagsGroupsResponse["data"] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${baseApiUrl}/library/info?token=${token}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP Error ${res.status}`);
        }
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
  }, []);

  return (
    <div>
      {error && <p>Error..: {error}</p>}
      {data === null && !error && <p>Loading...</p>}
      {data?.tagsGroups?.map((item) => (
        <section key={item.id}>
          <h2 className="mx-2 my-4 p-2 bg-green-200 font-bold text-lg">
            {item.name}
          </h2>
          <ul className="flex flex-wrap mx-4">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="w-fit bg-blue-200 px-2 py-1 text-sm text-gray-800 mr-2 mb-2 rounded"
              >
                <Link href={`/list?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
