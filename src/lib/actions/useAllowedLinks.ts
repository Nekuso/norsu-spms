import { links } from "@/components/layout/side-bar/link";

// a function that takes in a role parameter and returns an array of allowed links
export const useAllowedLinks = (role: string) => {
  switch (role) {
    case "Administrator":
      return links.filter((link) => link.label !== "Supplies");
    case "Receiving":
      return links.filter(
        (link) =>
          link.label !== "Restock Reports" &&
          link.label !== "Management" &&
          link.label !== "Supplies"
      );
    case "Releasing":
      return links.filter(
        (link) =>
          link.label !== "Restock Reports" &&
          link.label !== "Management" &&
          link.label !== "Supplies"
      );
    case "Sector":
      return links.filter(
        (link) =>
          link.label !== "Restock Reports" &&
          link.label !== "Main Supplies" &&
          link.label !== "Management" &&
          link.label !== "Sectors"
      );
    default:
      return [];
  }
};
