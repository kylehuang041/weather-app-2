/**
 * @brief Code of the footer
 * @author Kyle Huang
 * @date 8/28/2024
 * @version 0.1
 */

'use client'

import { footerText, contacts, sectionMaxWidth, PMAcceleratorDescription, PMAcceleratorLink } from '@/data'
import { useState } from "react"

const Footer = ({className} : {className?: string;}) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleButton = () => {
    setShowInfo(!showInfo);
  }
  return (
    <footer className={`${className} w-full flex flex-col bg-black text-white gap-10 pt-10`}>
      <div className="text-center">
        <h3 className="text-2xl">Project by <a target="_blank" href={PMAcceleratorLink}><em>PM Accelerator</em></a></h3>
        <button className="mt-4 text-sm border border-white px-3 py-1 rounded" onClick={toggleButton}>Click for more information</button>
        {showInfo && (
          <pre className={`${sectionMaxWidth} mx-auto text-left py-4 px-10 whitespace-pre-wrap`}>{PMAcceleratorDescription}</pre>
        )}
      </div>
      <div className="flex justify-between p-4">
        <ul className="flex gap-2">
          {contacts.map((contact, index) => (
            <li key={contact.name} className="flex gap-1">
              <a href={contact.link}>{contact.icon ? contact.icon : contact.name}</a>
            </li>
          ))}
        </ul>
        <p className="font-bold">&copy;<span> {footerText}</span></p>
      </div>
    </footer>
  )
}

export default Footer;