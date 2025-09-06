"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "./components/ThemaToggle";
import { navigation } from "@/utils/constants";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const NavBar = () => {
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");

  return (
    <header className="border-b-2 border-secondary">
      <Disclosure as="nav" className="bg-primary dark:bg-primaryDark">
        <div className="mx-auto  px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {status === "authenticated" && (
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              )}
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  {theme === "light" ? (
                    <Image
                      width={30}
                      height={30}
                      src="/logoOrange.svg"
                      alt="logo"
                      className=" mr-2"
                    />
                  ) : (
                    <Image
                      width={30}
                      height={30}
                      src="/logoDark.svg"
                      alt="logo"
                      className=" mr-2"
                    />
                  )}
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                {status === "authenticated" ? (
                  <div className="flex space-x-4">
                    {navigation.map(({ name, href }) => {
                      const current = pathname === href;
                      return (
                        <Link
                          key={name}
                          href={href}
                          aria-current={current ? "page" : undefined}
                          className={classNames(
                            current
                              ? "bg-primaryHover dark:bg-primaryHoverDark text-white" 
                              : "text-gray-300 dark:border-primary dark:border-2 hover:bg-secondary hover:text-white ", 
                            "rounded-md px-3 py-2 text-sm font-medium  flex justify-center items-center"
                          )}
                        >
                          {name}
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <Link
                    href="/"
                    className="animate__animated animate-pulse bg-primaryHover dark:bg-primaryHoverDark text-white rounded-md px-3 py-2 text-sm font-medium flex hover:bg-secondary"
                  >
                    Quizlet App by Oleh Nadiein
                  </Link>
                )}
              </div>
            </div>

            <div className="hidden sm:block px-2">
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {status === "authenticated" ? (
                <button
                  onClick={() => signOut()}
                  className="bg-secondary dark:hover:bg-secondaryDark  hover:bg-primaryHover dark:bg-primaryHoverDark text-white px-6 py-2 rounded  flex justify-content items-center shadow-md dark:border dark:border-backgroundDark"
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="bg-secondary hover:bg-primaryHover dark:bg-primaryHoverDark text-white px-6 py-2 rounded  flex justify-content items-center shadow-md dark:border dark:border-backgroundDark"
                >
                  Sign in
                </button>
              )}
              {status === "authenticated" && (
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Image
                        alt=""
                        src={session?.user?.image || "/avatar.png"}
                        width={30}
                        height={30}
                        className="h-8 w-8 rounded-full"
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <Menu.Item>
                      <p className="block px-4 py-2 text-sm text-grey-600 data-[focus]:bg-gray-100 break-keep">
                        {session.user?.name}
                      </p>
                    </Menu.Item>
                    <Menu.Item>
                      <p className="block px-4 py-2 text-sm text-grey-600 data-[focus]:bg-gray-100 break-all">
                        {session.user?.email}
                      </p>
                    </Menu.Item>
                  
                  </Menu.Items>
                </Menu>
              )}
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => {
              const current = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} passHref>
                  <DisclosureButton
                    as="a"
                    aria-current={current ? "page" : undefined}
                    className={classNames(
                      current
                        ? "bg-primaryHover dark:bg-primaryHoverDark text-white"
                        : "text-gray-300 hover:bg-secondary hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                </Link>
              );
            })}

            <div className="px-3">
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </header>
  );
};
