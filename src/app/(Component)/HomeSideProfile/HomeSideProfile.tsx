"use client";

import { useUserSlice } from "@/Hooks/useUserSlice";
import { Avatar, CardHeader } from "@mui/material";
import Link from "next/link";
import { MdPeopleAlt } from "react-icons/md";
import { RiMemoriesFill } from "react-icons/ri";
import { BsSaveFill, BsNewspaper } from "react-icons/bs";
import { TbUsersGroup } from "react-icons/tb";
import { MdVideoChat } from "react-icons/md";
import { IoStorefrontSharp, IoSettingsSharp } from "react-icons/io5";

export default function HomeSideProfile() {
  const {
    userSliceData: { user },
  } = useUserSlice();
  return (
    <div className="fixed">
      <CardHeader
        avatar={<Avatar src={user?.photo} aria-label="recipe" />}
        title={user?.name}
      />

      <ul>
        <li>
          <Link href={"/"} className="flex items-center gap-1 m-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center text-white">
              <MdPeopleAlt className="text-xl" />
            </div>
            <p className="text-xl">Friends</p>
          </Link>
        </li>
        <li>
          <Link href={"/"} className="flex items-center gap-1 m-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center text-white">
              <RiMemoriesFill className="text-xl" />
            </div>

            <p className="text-xl">Memories</p>
          </Link>
        </li>
        <li>
          <Link href={"/"} className="flex items-center gap-1 m-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center text-white">
              <BsSaveFill className="text-xl" />
            </div>
            <p className="text-xl">Saved</p>
          </Link>
        </li>
        <li>
          <Link href={"/"} className="flex items-center gap-1 m-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center text-white">
              <TbUsersGroup className="text-xl" />
            </div>
            <p className="text-xl">Groups</p>
          </Link>
        </li>
        <li>
          <Link href={"/"} className="flex items-center gap-1 m-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center text-white">
              <MdVideoChat className="text-xl" />
            </div>
            <p className="text-xl">Videos</p>
          </Link>
        </li>
        <li>
          <Link href={"/"} className="flex items-center gap-1 m-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center text-white">
              <IoStorefrontSharp className="text-xl" />
            </div>
            <p className="text-xl">Market Place</p>
          </Link>
        </li>
        <li>
          <Link href={"/"} className="flex items-center gap-1 m-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center text-white">
              <BsNewspaper className="text-xl" />
            </div>
            <p className="text-xl">Feeds</p>
          </Link>
        </li>
        <li>
          <Link href={"/"} className="flex items-center gap-1 m-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center text-white">
              <IoSettingsSharp className="text-xl" />
            </div>
            <p className="text-xl">Settings</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
