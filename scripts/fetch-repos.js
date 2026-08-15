import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const USER = 'brunocesarr';
const OUT = resolve('src/data/repos.json');

const EXCLUDE = new Set(['brunocesarr.github.io', 'brunocesarr', 'BDproject']);

const token = process.env.GH_TOKEN;

async function main() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(
    `https://api.github.com/users/${USER}/repos?per_page=100&sort=created&direction=desc`,
    { headers }
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);

  const repos = (await res.json())
    .filter((r) => !r.fork && !r.archived && !r.private && !EXCLUDE.has(r.name))
    .map((r) => ({
      name: r.name,
      description: r.description ?? '',
      url: r.html_url,
      homepage: r.homepage || null,
      language: r.language,
      topics: r.topics ?? [],
      stars: r.stargazers_count,
      createdAt: r.created_at,
      pushedAt: r.pushed_at,
    }))
    // Newest created first. Re-sorted locally so the order is guaranteed
    // even if the API param is ignored or the payload arrives paginated.
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(repos, null, 2) + '\n');
  console.log(`✓ ${repos.length} repos → src/data/repos.json`);
}

main().catch(async (err) => {
  console.error(`✗ fetch failed: ${err.message}`);
  try {
    const stale = JSON.parse(await readFile(OUT, 'utf8'));
    console.warn(`→ keeping ${stale.length} cached repos; build continues.`);
  } catch {
    await mkdir(dirname(OUT), { recursive: true });
    await writeFile(OUT, '[]\n');
    console.warn('→ no cache; wrote empty array.');
  }
});