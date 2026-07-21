export function parseFrontmatter(raw) {
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

export function toPostRecord(path, raw) {
  const { data, content } = parseFrontmatter(raw);

  return {
    slug: path.split("/").pop().replace(".md", ""),
    title: data.title,
    date: data.date,
    tag: data.tag,
    category: data.category || "Uncategorized",
    excerpt: data.excerpt,
    content,
  };
}

export function groupPostsByCategory(posts) {
  const categories = new Map();

  posts.forEach((post) => {
    const categoryName = post.category?.trim() || "Uncategorized";

    if (!categories.has(categoryName)) {
      categories.set(categoryName, {
        name: categoryName,
        posts: [],
      });
    }

    categories.get(categoryName).posts.push(post);
  });

  return Array.from(categories.values());
}

export function createExpandedCategoryState(categories) {
  return categories.reduce((state, category) => {
    state[category.name] = true;
    return state;
  }, {});
}

export function toggleCategoryState(currentState, categoryName) {
  return {
    ...currentState,
    [categoryName]: !currentState[categoryName],
  };
}
