import React, { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export const RootLayout: FC = () => {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <main>
      <Outlet />
    </main>
  )
}
