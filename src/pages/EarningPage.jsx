import React from 'react'
import HeaderNav from '../components/HeaderNav'
import HomeSideNav from '../components/HomeSideNav'

export default function EarningPage() {
  return (
    <main  className="grid grid-cols-[auto,1fr,1fr] grid-rows-[auto,1fr] gap-4 h-svh bg-secondary font-poppins text-primary">
        <HeaderNav />
        <HomeSideNav />
        <main>
            Earning Page
        </main>
    </main>
  )
}
