const ANILIST_URL = "https://graphql.anilist.co";

//Get one anime
export async function getAnimeById(malId: number) {
 const query = `
    query GetAnime($malId: Int) {
      Media(id: $malId, sort: POPULARITY_DESC, type: ANIME) {
        id  
        title{
          romaji
          english
          native
        }
          genres
          episodes
          status
          bannerImage
          coverImage {
            large
          }
      popularity
    }
}
`;

const response = await fetch(ANILIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query,
      variables: { 
        malId 
        },
    }),
  });


    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Failed to fetch anime list: ${response.status} ${errorText}`
      );
    }

    const result = await response.json();

    return result.data.Media;
}

//Get a list
export async function getAnimeList(page: number, perPage: number) {
  const query = `
    query getAnimeList($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          genres
          episodes
          status
          bannerImage
          coverImage {
            extraLarge
            large
            medium
            color
          }
          popularity
        }
      }
    }
  `;

  const response = await fetch(ANILIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        page,
        perPage,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Failed to fetch anime list: ${response.status} ${errorText}`
    );
  }

  const result = await response.json();

  return result.data.Page.media;
}

export async function getTopAnime(perPage: number, page = 1) {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
          id
          idMal
          title { romaji english native }
          coverImage { large color }
        }
      }
    }
  `;

  const response = await fetch(ANILIST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { page, perPage } }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch top anime: ${response.status}`);
  }

  const result = await response.json();
  return result.data.Page.media;
}