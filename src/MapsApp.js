import React from "react"

import { SocketProvider } from "./context/SocketContext"
import { MapsPage } from "./pages/MapsPage"

export const MapsApp = () => {
  return (
    <SocketProvider>
      <MapsPage />

    </SocketProvider>
  )
}
