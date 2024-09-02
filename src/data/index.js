/**
 * Static data for website application
 * @author Kyle Huang
 * @date 8/28/2024
 * @version 0.1
 */

import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";

export const textColor = "text-white"
export const sectionMaxWidth = "max-w-2xl"


// NAVBAR
export const title = "Weather App";


// HERO
export const weatherFormHeader = "Check Weather By Location";


// WEATHER DISPLAY
export const weatherDisplayHeader = "Weather Information";
export const weatherIconSize = 125;

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