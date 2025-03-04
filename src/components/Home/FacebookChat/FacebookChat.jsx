import React from 'react'
import { CustomChat, FacebookProvider } from 'react-facebook'

export default function FacebookChat() {
  return (
    <div className="w-[100px] h-[100px] fixed bottom-12 right-12">
      <FacebookProvider appId="1624942758442517" chatSupport>
        <CustomChat pageId="100093440388357" minimized={false}/>
      </FacebookProvider>
    </div>
  )
}
