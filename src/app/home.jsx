"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchAPI } from "./lib/API/search.api";
import { useDebounce } from "use-debounce";
import { CloseIcon, ExpandableCard } from "@/components/ui/expandable-cards";
import SpotifyPlayer from "react-spotify-player";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

function Home({ session }) {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);

  const [dataMusic, setDataMusic] = useState([]);

  const FetchSearch = async (value) => {
    const response = await SearchAPI.getAll({
      params: {
        q: value || "pamungkas",
        type: "artist",
        limit: 10,
      },
    });
    console.log(response);
    setDataMusic(response?.data?.artists);
  };

  useEffect(() => {
    FetchSearch(value);
  }, []);

  useEffect(() => {
    if (value) {
      FetchSearch(value);
    }
  }, [value]);

  // React Player Spotify
  const size = {
    width: "100%",
    height: 160,
  };
  const view = "list"; // or 'coverart'
  const theme = "black"; // or 'white'

  // Handle Play
  const [uri, setUri] = useState("");
  const handlePlay = (e, uri) => {
    e.stopPropagation();
    setUri(uri);
  };

  return (

    <div className="p-12">
      <div>
        <Input placeholder="Cari" onChange={(e) => setSearch(e.target.value)} />
      </div>
      {session?.token && (
        <Button
          onClick={() => signOut("spotify")}
          className={"fixed bottom-4 right-4 "}
        >
          Logout
        </Button>
      )}

      <div className="h-[520px] overflow-auto mt-12">
        {dataMusic?.items?.map((item, index) => {
          return (
            <div key={index}>
              <ExpandableCard
                name={item?.name}
                type={item?.type}
                image={item?.images?.[0]?.url}
                handlePlay={(e) => handlePlay(e, item?.uri)}
                genres={item?.genres}
              />
            </div>
          );
        })}
      </div>


      {uri && (
        <div className="fixed bottom-4 left-4">
          <div className="absolute right-0 top-[-20px]" onClick={() => {setUri('')}}>
          <CloseIcon/>
          </div>
          <SpotifyPlayer
            uri={uri}
            size={size}
            view={view}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
