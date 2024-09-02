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
export const footerText = `All Rights Reserved. Kyle Huang, ${new Date().getFullYear()}`;
export const medias = [
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
export const PMAcceleratorLink = "https://www.linkedin.com/school/productmanagerinterview/"
export const PMAcceleratorDescription = `
The Product Manager Accelerator Program is designed to support PM professionals through every stage of their career. From students looking for entry-level jobs to Directors aiming for leadership roles, our program has helped hundreds of students achieve their career aspirations.

Our Product Manager Accelerator community is ambitious and committed. Through our program, they have learned, honed, and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.

Learn product management for free today on our YouTube channel:
https://www.youtube.com/c/drnancyli?sub_confirmation=1

Interested in PM Accelerator Pro?

1️⃣ Attend the Product Masterclass to learn more about the program details, pricing, different packages, and stay until the end to receive a FREE AI Course.

Learn how to create a killer product portfolio in just two weeks that will help you land any PM job (traditional or AI), even if you were laid off or have zero PM experience:
https://www.drnancyli.com/masterclass

2️⃣ Reserve your early bird ticket and submit an application to talk to our Head of Admission.

3️⃣ Successful applicants join our PMA Pro community to receive customized coaching!
`;