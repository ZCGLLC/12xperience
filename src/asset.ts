/** Resolves public files against Vite's base, so GitHub Pages and local preview both work. */
export const asset = (path: string) => {
  const clean = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${clean}`;
};
