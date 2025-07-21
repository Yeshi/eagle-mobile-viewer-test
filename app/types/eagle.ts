// types/eagle.ts
export type TagGroup = {
  id: string;
  name: string;
  tags: string[];
};

export type TagsGroupsResponse = {
  status: "success" | "error";
  data: {
    tagsGroups: TagGroup[];
  };
};