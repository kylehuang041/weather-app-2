/**
 * @brief Code of the footer
 * @author Kyle Huang
 * @date 8/28/2024
 * @version 0.1
 */

'use client'

import { footerText, contacts } from '@/data'


const Footer = ({className} : {className?: string;}) => {
  const date = new Date().getFullYear();

  return (
    <footer className={`${className} w-[100%] flex justify-between bg-black w-[100%] text-white p-4 text-center`}>
      <ul className="flex gap-2">
        {contacts.map((contact, index) => (
          <li key={contact.name} className="flex gap-1">
            <a href={contact.link}>{contact.icon ? contact.icon : contact.name}</a>
          </li>
        ))}
      </ul>
      <p className="font-bold">&copy;<span> {footerText}</span></p>
    </footer>
  )
}

export default Footer;