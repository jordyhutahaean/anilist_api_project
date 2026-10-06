"use client"

import Image from "next/image";
import styles from "./page.module.css";
import marquee from "./scrolleffect.module.css";
import {getAnimeById, getTopAnime} from "@/lib/animedesc";
import { useState , useEffect , useMemo} from "react";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

  function MarqueeColumn ({
    items,
    reverse = false,
    duration = 20,
  }: {
    items: any[];
    reverse?: boolean;
    duration?: number;
  }) {
    if (items.length === 0) return null;
  // duplicate so the loop is seamless
  const loop = [...items, ...items];
    return (
      <div className={marquee.column}>
       <div
          className={`${marquee.track} ${reverse ? marquee.reverse : ""}`}
          style={{ animationDuration: `${duration}s` }}
        >
          {loop.map((item, i) => (
            <div key={i} className={marquee.card}>
              <Image
                src={item.coverImage.large}
                alt={item.title.english ?? item.title.romaji}
                width={200}
                height={300}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
export default function Home() {
 
  const [malId, setMalId] = useState("");
  const [anime, setAnime] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);

  async function searchAnime() {
  if (!malId) return;

  const result = await getAnimeById(Number(malId));
  setAnime(result);
  }

  const POPULAR_MAL_IDS = [1, 20, 21, 1353, 1575, 5114, 9253, 11061, 13663];
  useEffect(() => {
    async function loadCards() {
    //   const picked = [...POPULAR_MAL_IDS]
    //   .sort(() => 0.5 - Math.random())
    //   .slice(0, 6);

    //   const results = await Promise.allSettled(
    //     picked.map((id) => getAnimeById(id))
    //   );
    //   setCards(
    //     results
    //       .filter((result) => result.status === "fulfilled")
    //       .map((result) => (result as PromiseFulfilledResult<any>).value)
    //   );
    // }
          const top = await getTopAnime(30);
          setCards(shuffle(top).slice(0, 9));
      }
    loadCards();
  }, []);

  
  const shuffled = useMemo(() => {
   const shuffled = [...POPULAR_MAL_IDS].sort(() => 0.5 - Math.random());
  return shuffled;
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.sectionheader}>
          <div className={styles.flexpage}>
            
            <div className={styles.intro}>
              <h1>
                Welcome to my Anime App
              </h1>

              <input
                type="number"
                placeholder="Enter MAL ID"
                value={malId}
                onChange={(e) => setMalId(e.target.value)}
              /><button onClick={searchAnime}>Search</button>
                  {anime && (
                  <>
                    <Image 
                      src={anime.coverImage.large || anime.coverImage.medium}
                      alt={anime.title.english}
                      width={300}
                      height={300}
                    />

                    <h1>{anime.title.english}</h1>
                    <p>{anime.title.native}</p>
                    <p>Episodes: {anime.episodes}</p>
                    <p>Status: {anime.status}</p>
                  </>
                  )}
            </div>
          </div>

          <div className={styles.description}>

             <div className={marquee.floatingcardsarea}>
              <MarqueeColumn items={cards.slice(0, 4)} duration={66} />
              <MarqueeColumn items={cards.slice(4, 7)} reverse duration={42} />
              <MarqueeColumn items={cards.slice(7, 10)} duration={44} />
            </div>  
          </div>
        </section>
        
        <section>

        </section>
      </main>
    </div>
  );
}
