/**
 * Static data for website application
 * @author Kyle Huang
 * @date 8/28/2024
 * @version 0.1
 */

import { IconHistory, IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";

export const textColor = "text-white"
export const sectionMaxWidth = "max-w-2xl"


// NAVBAR
export const title = "Weather App";
export const navItems = [
  {
    name: "History",
    link: "#history",
    icon: <IconHistory className={`h-4 w-4 ${textColor} hover:text-neutral-500`} />,
  },
];


// HERO
export const weatherFormHeader = "Check Weather By City or Coordinate";


// HISTORY
export const historyHeader = "Search History";


// FOOTER
const socialIconSize = 15;
export const footerText = `All Rights Reserved. ${new Date().getFullYear()}`;
export const contacts = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/kyle-h/",
    icon: <IconBrandLinkedin className={`h-${socialIconSize} w-${socialIconSize} ${textColor} hover:text-neutral-500`} />
  },
  {
    name: "GitHub",
    link: "https://github.com/kylehuang041",
    icon: <IconBrandGithub className={`h-${socialIconSize} w-${socialIconSize} ${textColor} hover:text-neutral-500`} />
  }
];