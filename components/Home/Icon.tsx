import React from 'react'
import NTCLOGO from "../../public/Token/NTCLOGO.png";
import Image from 'next/image';

export function Icon() {
  return (
    <div>
<Image src={NTCLOGO.src} width={50} height={50} alt="logo"/>

    </div>
  )
}

