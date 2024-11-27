import { MobileNavIsland } from "./MobileNavIsland";

const headings = [
  {
    text: "Layout Changes",
    id: "layout-changes",
    level: 2
  },
  {
    text: "Animating With CSS",
    id: "animating-with-css",
    level: 2
  },
  {
    text: "Introducing FLIP",
    id: "introducing-flip",
    level: 2
  },
  {
    text: "Animating Size",
    id: "animating-size",
    level: 2
  },
  {
    text: "Consolidating Size with Position",
    id: "consolidating-size-with-position",
    level: 2
  },
  {
    text: "Correcting Child Distortions",
    id: "correcting-child-distortions",
    level: 2
  },
  {
    text: "Summary",
    id: "summary",
    level: 2
  },
];

export const Default = () => <MobileNavIsland headings={headings} />;