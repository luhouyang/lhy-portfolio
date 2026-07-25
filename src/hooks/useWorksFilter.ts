import { useMemo, useState } from "react";
import type { Work, WorkTag } from "../types";
import { portfolioWorks } from "../data/works";

export type WorkFilter = WorkTag | "All";

const FILTERS: WorkFilter[] = [
  "All",
  "AI/ML",
  "Robotics",
  "Computer Vision",
  "Flutter",
  "Mixed Reality",
  "App",
  "Hackathon",
  "Workshop",
  "Event",
  "Community",
];

export function useWorksFilter(works: Work[] = portfolioWorks) {
  const [activeTags, setActiveTags] = useState<WorkFilter[]>(["All"]);

  const toggleTag = (tag: WorkFilter) => {
    setActiveTags((prev) => {
      if (tag === "All") {
        return ["All"];
      }

      const withoutAll = prev.filter((activeTag) => activeTag !== "All");

      if (withoutAll.includes(tag)) {
        const nextTags = withoutAll.filter((activeTag) => activeTag !== tag);
        return nextTags.length === 0 ? ["All"] : nextTags;
      }

      return [...withoutAll, tag];
    });
  };

  const isActive = (tag: WorkFilter) => activeTags.includes(tag);

  const filteredWorks = useMemo(() => {
    if (activeTags.length === 0 || activeTags.includes("All")) {
      return works;
    }

    const workTags = activeTags.filter((tag): tag is WorkTag => tag !== "All");

    return works.filter((work) =>
      workTags.every((tag) => work.tags.includes(tag))
    );
  }, [works, activeTags]);

  return {
    filters: FILTERS,
    activeTags,
    toggleTag,
    isActive,
    filteredWorks,
  };
}