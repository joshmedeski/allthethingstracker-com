import React from "react";
import GifSearchModal from "./GifSearchModal";

const Image: React.FC<{ imageUrl: string | null }> = ({ imageUrl }) => {
  if (imageUrl) {
    return (
      <section className="group relative">
        <div className="absolute top-1 right-1 z-40 h-full w-full rounded-3xl bg-neutral transition-all group-hover:top-2 group-hover:right-2 group-hover:bg-primary" />
        <div className="absolute bottom-1 left-1 z-30 h-full w-full rounded-3xl bg-neutral-subtle transition-all group-hover:bottom-2 group-hover:left-2 group-hover:bg-primary-subtle" />
        <div
          className="relative z-50 aspect-video rounded-3xl bg-cover bg-center bg-no-repeat shadow-lg"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </section>
    );
  } else {
    return <GifSearchModal onSelect={() => {}} />;
  }
};

export default Image;
