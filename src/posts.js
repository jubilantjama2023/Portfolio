const postFiles = import.meta.glob("./posts/*.md", { query: "?raw", import: "default", eager: true });

function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: normalized };

  const [, frontmatter, content] = match;
  const data = {};
  frontmatter.split("\n").forEach((line) => {
    const i = line.indexOf(":");
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    value = value.replace(/^["']|["']$/g, "");
    data[key] = value;
  });

  return { data, content: content.trim() };
}

export const posts = Object.entries(postFiles).map(([path, raw]) => {
  const { data, content } = parseFrontmatter(raw);
  return {
    slug: path.split("/").pop().replace(".md", ""),
    title: data.title,
    date: data.date,
    tag: data.tag,
    excerpt: data.excerpt,
    content,
  };
});