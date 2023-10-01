"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface User {
  login: string | null;
  name: string;
  created_at: string;
  bio: string;
  public_repos: string;
  followers: string;
  following: string;
  location: string;
  twitter_username: string;
  html_url: string;
  avatar_url: string;
}

export default function Home() {
  const lightModeClass = "bg-white text-black";
  const darkModeClass = "bg-[#141D2F] text-white";

  const [user, setUser] = useState<User>({
    login: null,
    name: "",
    created_at: "",
    bio: "",
    public_repos: "",
    followers: "",
    following: "",
    location: "",
    twitter_username: "",
    html_url: "",
    avatar_url: "",
  });
  // const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("TheTechGoddess");

  const formatDate = (inputDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  };

  const fetchData = async () => {
    const username = searchQuery.trim() === "" ? "TheTechGoddess" : searchQuery;

    const apiUrl = `https://api.github.com/users/${username}`;
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      data.created_at = formatDate(data.created_at);
      setUser(data); // Update the user state with the fetched data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Fetch "TheTechGoddess" data when the component initially mounts
    fetchData();
  }); // Empty dependency array to ensure it runs only once on mount

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    // Call fetchData when the search button is clicked
    fetchData();
  };
  return (
    <main className="bg-[#141D2F]">
      <div className="mx-4 lg:mx-16 my-10">
        <div className="flex justify-between text-white">
          <p className="text-3xl font-bold">devfinder</p>
          <div className="flex">
            <p className="mr-3">LIGHT</p>
            <Image
              src="/assets/light.svg"
              alt="light_mode"
              width={20}
              height={20}
              className="-mt-3"
            />
          </div>
        </div>
        <div className="relative h-[100px] w-full">
          <div className="absolute w-full left-0 top-0 flex items-center">
            <Image
              src="/assets/search.svg"
              alt="search_icon"
              width={20}
              height={20}
              className="absolute top-11.5 ml-5 left-0"
            />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search GitHub Username…"
              className="w-full my-5 py-6 px-16 rounded-2xl placeholder:text-xl placeholder:text-white outline-none bg-[#1E2A47] text-white text-xl"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="bg-[#1E2A47] w-full my-8 p-4 lg:p-10 rounded-2xl text-white">
          <div className=" flex ">
            <Image
              src={user.avatar_url || "/assets/profile.svg"} // Use user's avatar_url or a default image
              alt="profile_image"
              width={120}
              height={120}
              className="mr-6 self-start rounded-full"
            />
            <div className="w-full mx-6">
              <div className="lg:flex justify-between items-center">
                <p className="text-3xl font-bold">
                  {user.name || "The Octocat"}
                </p>
                <p className="">Joined {user.created_at || "N/A"}</p>
              </div>
              <p className="text-[#0079FF] my-1">@{user.login || "octocat"}</p>
            </div>
          </div>
          <div className="lg:ml-[170px]">
            <p className="mt-6 text-[#b2b6bf">
              {user.bio || "This profile has no bio"}
            </p>
            <div className="bg-[#141D2F] lg:flex justify-between my-8 px-8 py-5 rounded-2xl">
              <div>
                <p>Repos</p>
                <p className="text-2xl font-bold mt-2">
                  {user.public_repos || "0"}
                </p>
              </div>
              <div>
                <p>Followers</p>
                <p className="text-2xl font-bold mt-2">
                  {user.followers || "0"}
                </p>
              </div>
              <div>
                <p>Following</p>
                <p className="text-2xl font-bold mt-2">
                  {user.following || "0"}
                </p>
              </div>
            </div>
            <div>
              <div className="lg:flex justify-between">
                <div className="flex w-[50%] mb-2 lg:mb-0">
                  <Image
                    src="/assets/location.svg"
                    alt="profile_image"
                    width={20}
                    height={20}
                    className="mr-6"
                  />
                  <p>{user.location || "N/A"}</p>
                </div>
                <div className="flex w-[50%]">
                  <Image
                    src="/assets/twitter.svg"
                    alt="profile_image"
                    width={20}
                    height={20}
                    className="mr-6"
                  />
                  <p>{user.twitter_username || "N/A"}</p>
                </div>
              </div>
              <div className="lg:flex justify-between my-3">
                <div className="flex w-[50%] mb-2 lg:mb-0">
                  <Image
                    src="/assets/link.svg"
                    alt="profile_image"
                    width={20}
                    height={20}
                    className="mr-6"
                  />
                  <a
                    href={user.html_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="overflow-hidden whitespace-nowrap w-full text-ellipsis hover:text-blue-500 hover:underline"
                  >
                    {user.html_url || "N/A"}
                  </a>
                </div>
                <div className="flex w-[50%]">
                  <Image
                    src="/assets/building.svg"
                    alt="profile_image"
                    width={20}
                    height={20}
                    className="mr-6"
                  />
                  <p>@github</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
