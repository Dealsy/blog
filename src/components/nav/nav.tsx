'use client'

import { Routes } from '@/contstants'

import NavLink from '../ui/navLink'

export default function Nav() {
  return (
    <nav className="flex items-center justify-between bg-primary p-8 text-white">
      <ul className="flex items-center space-x-4">
        <li>
          <NavLink route={Routes.HOME} text="Blog" />
        </li>
      </ul>
    </nav>
  )
}
