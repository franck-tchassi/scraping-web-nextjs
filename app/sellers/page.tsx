"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { sendAutomatedMessages } from '../send-messages/actions'




const SellersPage = () => {
 const [status, setStatus] = useState("")

  const handleClick = async () =>{
    //setStatus("Envoie en cours...")
    const response = await sendAutomatedMessages();
    //setStatus(response);
  }

  return (
    <div className="flex flex-col text-center gap-4 py-32 max-w-4xl  m-auto ">
        <div className='flex flex-col items-center gap-4'>
            <h2>Envoyer des messages automatiquement aux Vendeurs</h2>
            <Button onClick={handleClick} size={"lg"} className='max-w-44 text-center'>Envoyer maintenant</Button>
           
        </div>
        
    </div>
  )
}

export default SellersPage