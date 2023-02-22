import React from 'react'
import { Header } from '../contents/header/Header'
import { Hero } from '../contents/home/Hero'
import { Section2 } from '../contents/home/section2'

export const Home = ({ user }) => {
  return (
    <div>

      <Header user={user} />
      <Hero />
      <Section2 />

    </div>
  )
}
