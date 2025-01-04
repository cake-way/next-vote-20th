"use client";

export const getPartUrlName = (part: string, leader?: string | null) => {
  switch (part) {
    case "FE":
      return "FRONTEND";

    case "BE":
      return "BACKEND";

    case "TEAM":
      if (leader) {
        return "team";
      } else {
        return "demoday";
      }
    default:
      return "";
  }
};

export const getToken = async () => {
  return localStorage.getItem("token");
};

export const gettoken = () => {
  return localStorage.getItem("token");
};
