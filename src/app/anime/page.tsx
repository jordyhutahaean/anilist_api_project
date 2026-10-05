"use client";

import Image from "next/image";
import styles from "../page.module.css";
import {getAnimeList} from "@/lib/animedesc";
import { useEffect, useState } from "react";

export default function Home() {
  const [anime, setAnimeList] = useState<any[]>([]);
  const [page, setPage] = useState(1);

    useEffect(() => {
        async function loadAnimeList() {
        const result = await getAnimeList(page,9);
        setAnimeList(result);
        }

        loadAnimeList();
     }, [page]);

 return (
    <div className={styles.page}>
        <main className={styles.main}>
            <div className={styles.animelistflex}>
                <div className={styles.animecard}>              
                    {anime.map((anime) => (
                        <div key={anime.id} className={styles.animeitem}>

                        <Image 
                            src={anime.coverImage.large}
                            alt={anime.title.english || anime.title.native}
                            width={300}
                            height={400}
                        />

                        <h1>{anime.title.english || anime.title.native}</h1>
                        <p>{anime.title.native}</p>
                        <p>Episodes: {anime.episodes}</p>
                        <p>Status: {anime.status}</p>
 
                        </div>
                        ))}
                </div>
              </div>
        </main>
            <div>
                <button onClick={() => setPage(page - 1)} 
                disabled={page === 1}>
                    Previous
                </button>

                <span> Page {page} </span>

                <button onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>
    </div>


 );
}