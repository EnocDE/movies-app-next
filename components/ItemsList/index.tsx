"use client";

import { MoviesResultsSchema, MovieType } from "@/types/movies-response";
import { SerieType } from "@/types/series-response";
import { useRef } from "react";
import ItemCard from "../ItemCard";

interface ItemsListProps {
  uknownItems: undefined | unknown;
  classNames?: string;
}

export default function ItemsList(props: ItemsListProps) {
  const { uknownItems, classNames } = props;

  let items: SerieType[] | MovieType[];
  if (MoviesResultsSchema.safeParse(uknownItems).success) {
    items = uknownItems as MovieType[];
  } else {
    items = uknownItems as SerieType[];
  }

  const itemCardRef = useRef<HTMLLIElement>(null);
  const itemsListRef = useRef<HTMLUListElement>(null);
  const movieListContainerRef = useRef<HTMLDivElement>(null);

  const slideItemsListToRight = () => {
    if (itemsListRef.current && itemCardRef.current) {
      const widthCard = itemCardRef.current.offsetWidth + 40;
      itemsListRef.current.scrollBy({ left: widthCard, behavior: "smooth" });
    }
  };

  const slideItemsListToLeft = () => {
    if (itemsListRef.current && itemCardRef.current) {
      const widthCard = itemCardRef.current.offsetWidth + 40;
      itemsListRef.current.scrollBy({ left: -widthCard!, behavior: "smooth" });
    }
  };

  return (
    <section>
      <div
        ref={movieListContainerRef}
        className={`relative after:block after:absolute after:inset-0 after:dark:bg-gradient-btt-h after:pointer-events-none after:z-10 ${classNames}`}
      >
        <ul
          ref={itemsListRef}
          className="w-full flex gap-5 overflow-x-auto disable-scrollbar snap-mandatory snap-x justify-items-center"
        >
          {items != null && items.length ? (
            items.map((item) => (
              <ItemCard
                key={item.id}
                item={item as MovieType}
                itemCardRef={itemCardRef}
              />
            ))
          ) : (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <ItemCard key={index} itemCardRef={itemCardRef} />
              ))}
            </>
          )}
        </ul>
        <button
          onClick={slideItemsListToLeft}
          className="hidden md:block absolute left-10 top-[50%] -translate-y-[50%] z-10 font-bold text-white text-5xl p-5 hover:scale-90 ease-soft-spring transition-transform duration-500 drop-shadow-lg text-w-line"
        >
          {"<-"}
        </button>
        <button
          onClick={slideItemsListToRight}
          className="hidden md:block absolute right-10 top-[50%] -translate-y-[50%] z-10 font-bold text-white text-5xl p-5 hover:scale-90 ease-soft-spring transition-transform duration-500 drop-shadow-lg text-w-line"
        >
          {"->"}
        </button>
      </div>
    </section>
  );
}
