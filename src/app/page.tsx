"use client"

import Image from "next/image";
import styles from "./page.module.css";
import {getAnimeById} from "@/lib/animedesc";
import { useState } from "react";

export default function Home() {
 
  const [malId, setMalId] = useState("");
  const [anime, setAnime] = useState<any>(null);

    async function searchAnime() {
    if (!malId) return;

    const result = await getAnimeById(Number(malId));
    setAnime(result);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.flexpage}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <div className={styles.intro}>
            <h1>
              To get started, see the information below and edit the{" "}
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
                    src={anime.coverImage.medium}
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
 
 
      </main>
    </div>
  );
}
