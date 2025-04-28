"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Artist } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Music2 } from "lucide-react";
interface ArtistCardProps {
  artist: Artist;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}
export function ArtistCard({
  artist,
  size = "md",
  onClick,
  className
}: ArtistCardProps) {
  const router = useRouter();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  const sizes = {
    sm: {
      container: "w-36",
      image: "h-36 w-36",
      title: "text-sm"
    },
    md: {
      container: "w-48",
      image: "h-48 w-48",
      title: "text-base"
    },
    lg: {
      container: "w-64",
      image: "h-64 w-64",
      title: "text-lg"
    }
  };
  return <div className={cn("flex flex-col items-center rounded-lg p-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer", sizes[size].container, className)} onClick={handleClick} data-unique-id="d6ac92b6-d568-4fe5-8935-29c5d4f9d118" data-loc="43:9-43:210" data-file-name="components/artist-card.tsx">
      <div className="relative overflow-hidden rounded-lg shadow-sm mb-3" data-unique-id="ac81496c-b550-4de3-a3c7-742d374001e6" data-loc="44:6-44:74" data-file-name="components/artist-card.tsx">
        <Image src={artist.imageUrl} alt={artist.name} width={300} height={300} className={cn("object-cover", sizes[size].image)} data-unique-id="f6f3122d-60b9-4b89-9bc2-a35f555b2b8c" data-loc="45:8-45:132" data-file-name="components/artist-card.tsx" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2" data-unique-id="a8d5fa1d-ad4f-4fe0-9d1e-6ba27eb4c636" data-loc="46:8-46:108" data-file-name="components/artist-card.tsx">
          <div className="flex items-center" data-unique-id="adb5636d-297d-4ff0-a617-2a437cef9069" data-loc="47:10-47:45" data-file-name="components/artist-card.tsx">
            {artist.platform === "Spotify" && <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2" data-unique-id="56f15111-c2df-4407-b539-81b821e9bf2a" data-loc="48:46-48:135" data-file-name="components/artist-card.tsx">
                <Music2 size={12} className="text-white" />
              </div>}
            {artist.platform === "YouTube" && <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center mr-2" data-unique-id="f834eca1-48b6-4400-ab43-e1ecc31b2e35" data-loc="51:46-51:133" data-file-name="components/artist-card.tsx">
                <Music2 size={12} className="text-white" />
              </div>}
            {artist.platform === "Deezer" && <div className="h-5 w-5 rounded-full bg-purple-600 flex items-center justify-center mr-2" data-unique-id="340aa4f6-c728-4402-b294-81003e1a1511" data-loc="54:45-54:135" data-file-name="components/artist-card.tsx">
                <Music2 size={12} className="text-white" />
              </div>}
            {artist.platform === "SoundCloud" && <div className="h-5 w-5 rounded-full bg-orange-500 flex items-center justify-center mr-2" data-unique-id="d47ebd63-7373-4bee-82e9-7af8506c3abe" data-loc="57:49-57:139" data-file-name="components/artist-card.tsx">
                <Music2 size={12} className="text-white" />
              </div>}
            {artist.platform === "Apple Music" && <div className="h-5 w-5 rounded-full bg-pink-600 flex items-center justify-center mr-2" data-unique-id="03b8ab9f-73f9-4490-8166-f101a548341a" data-loc="60:50-60:138" data-file-name="components/artist-card.tsx">
                <Music2 size={12} className="text-white" />
              </div>}
            <span className="text-xs font-medium text-white" data-unique-id="0f6627e1-06c8-421d-9c2e-ca607de100e9" data-loc="63:12-63:61" data-file-name="components/artist-card.tsx">{artist.platform}</span>
          </div>
        </div>
      </div>
      <h3 className={cn("font-medium text-center text-slate-800", sizes[size].title)} data-unique-id="e5ae1285-711d-4327-9b3a-438ef71b9200" data-loc="67:6-67:86" data-file-name="components/artist-card.tsx">
        {artist.name}
      </h3>
      {artist.genre && <p className="text-xs text-slate-500 mt-1" data-unique-id="3b4bdd59-ac49-404a-ad7d-13609d7d08ba" data-loc="70:23-70:66" data-file-name="components/artist-card.tsx">{artist.genre}</p>}
    </div>;
}