"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import type { EagleItem } from "@/app/types/eagle";

const token = process.env.NEXT_PUBLIC_EAGLE_LOCAL_TOKEN;
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

  const [isEditing, setIsEditing] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const handleAddClick = () => {
    setIsEditing(true); // 入力フィールド表示
  };

  const handleSubmit = async () => {
    if (!tagInput.trim() || !data) return;

    const mergedTags = Array.from(
      new Set([...(data.tags || []), tagInput.trim()])
    );

    try {
      const res = await fetch(`/api/eagle/item/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          tags: mergedTags,
          token: token,
        }),
      });

      const result = await res.json();
      console.log("更新成功:", result);

      // 更新後の状態を反映（タグ再取得 or 直接更新）
      setData({ ...data, tags: mergedTags });
    } catch (error) {
      console.error("タグ更新失敗:", error);
      alert("タグの追加に失敗しました");
    }

    setTagInput("");
    setIsEditing(false);
  };

  // 評価表示
  const handleStarClick = async (starValue: number) => {
    if (!data) return;
    try {
      const res = await fetch(`/api/eagle/item/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          star: starValue,
          token: token,
        }),
      });
      const result = await res.json();
      console.log("評価更新成功:", result);

      // 状態を更新
      setData({ ...data, star: starValue });
    } catch (error) {
      console.error("評価更新失敗:", error);
      alert("評価の更新に失敗しました");
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const url = `/api/eagle/item/info?id=${id}&token=${token}`;
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
          <div className="mx-2">
            <dl className="flex flex-wrap">
              <dt className="text-sm font-bold mr-2 w-fit">タグ：</dt>
              {data?.tags?.map((tag) => (
                <dd
                  key={tag}
                  className="text-xs bg-blue-200 px-2 py-1 text-gray-800 mr-2 mb-2 rounded w-fit"
                >
                  {tag}
                </dd>
              ))}
              {isEditing ? (
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    } else if (e.key === "Escape") {
                      setTagInput("");
                      setIsEditing(false);
                    }
                  }}
                  className="text-ls border-1 p-1"
                  placeholder="タグを入力"
                />
              ) : (
                <dd
                  onClick={handleAddClick}
                  className="text-xs bg-orange-600 px-2 py-1 text-white mr-2 mb-2 rounded w-fit"
                >
                  ＋タグ追加
                </dd>
              )}
            </dl>
            <dl className="flex flex-wrap">
              <dt className="text-sm font-bold mr-2 w-fit">分類：</dt>
              <dd>
                {data.folders[0] === "MCPWURP67AP34" ? (
                  <span className="bg-orange-300 text-xs px-2 py-1">完了</span>
                ) : (
                  <span className="bg-gray-300 text-xs px-2 py-1">未了</span>
                )}
              </dd>
            </dl>
            <dl className="flex flex-wrap mt-2">
              <dt className="text-sm font-bold mr-2 w-fit">評価：</dt>
              <dd className="text-2xl font-bold w-fit text-yellow-500 tracking-widest">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    className="cursor-pointer"
                    onClick={() => handleStarClick(num)}
                  >
                    {num <= (data.star ?? 0) ? "★" : "☆"}
                  </span>
                ))}
              </dd>
            </dl>
          </div>
        </>
      )}
    </div>
  );
}

/*
          <pre className="mt-4 text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
*/
