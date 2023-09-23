'use client'
import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const Navbar = () => {
    return (
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
       <NavigationMenu className="items-center">
        <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/upload-cv" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Upload CV
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/upload-cv" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Search Candidates
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
      </header>
    );
  };
  
  export default Navbar;