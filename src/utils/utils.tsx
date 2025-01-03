export const getPartUrlName = (part: string) => {
  switch (part) {
    case "FE":
      return "frontend";

    case "BE":
      return "BACKEND";

    case "TEAM":
      return "demoday";
    default:
      return "";
  }
};
