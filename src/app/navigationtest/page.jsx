"use client";

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const NavigationTestPage = () => {

  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  const handleClick = () => {
    console.log('click');
    router.push("/");
  }

  return (
    <div>
      <Link href="/" prefetch={false}>Click here</Link>
      <button onClick={handleClick}>Write and Redirect</button>
    </div>
  )
}

export default NavigationTestPage