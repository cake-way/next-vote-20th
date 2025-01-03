export const getPartUrlName = (part: string) => {
  switch (part) {
    case "FE":
      return "FRONTEND";

    case "BE":
      return "BACKEND";

    case "TEAM":
      return "demoday";
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
