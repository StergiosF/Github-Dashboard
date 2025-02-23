const BASE_URL = "https://api.github.com";

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "GitHub-Dashboard",
  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  "X-GitHub-Api-Version": "2022-11-28",
};

async function fetchUser(username) {
  const res = await fetch(`${BASE_URL}/users/${username}`, { headers });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch User");

  return data;
}

async function fetchRepos(username, page = 1, sort = "stars", order = "desc") {
  const res = await fetch(
    `${BASE_URL}/users/${username}/repos?page=${page}&sort=${sort}&direction=${order}`,
    { headers }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch Repos");

  return data;
}

async function fetchFollowers(username, page = 1) {
  const res = await fetch(
    `${BASE_URL}/users/${username}/followers?page=${page}&per_page=30`,
    { headers }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch Followers");

  return data;
}

async function fetchFollowing(username, page = 1) {
  const res = await fetch(
    `${BASE_URL}/users/${username}/following?page=${page}`,
    { headers }
  );

  const data = await res.json();
  if (!res.ok)
    throw new Error(data.message || "Failed to fetch Following Users");

  return data;
}

async function searchUsers(query) {
  const res = await fetch(`${BASE_URL}/search/users?q=${query}&per_page=5`, {
    headers,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Search Failed");
  if (data.items.length < 1) throw new Error("User Not Found");

  return data.items || [];
}

export { fetchUser, fetchRepos, fetchFollowers, fetchFollowing, searchUsers };
