/**
 * @brief Code of the navbar
 * @author Kyle Huang
 * @date 8/28/2024
 * @version 0.1
 */

'use client'

import { title } from "@/data"
import { FloatingNav } from "@/components/ui/floating-navbar";

const Navbar = ({className}: {className?: string;}) => {
  return (
    <FloatingNav className={className} title={title} />
  );
};

export default Navbar;
