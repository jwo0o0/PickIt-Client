function getImageName(url: string): string {
  return url.split("/").pop() || "";
}

export default getImageName;
