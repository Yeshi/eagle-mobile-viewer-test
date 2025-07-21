// タグ一覧に必要な情報
export type TagGroup = {
  id: string;
  name: string;
  tags: string[];
};

// 画像一覧に必要な情報
export type EagleItem = {
  id: string;
  name: string;
  ext: string;
  tags: string[]
  folders: string[]
  star?: number
};

// 画像詳細に必要な情報
export type ImageData = {
  id: string;
  name: string;
  url: string;
};

export type TagsGroupsResponse = {
  status: "success" | "error";
  data: {
    tagsGroups: TagGroup[];
  };
};