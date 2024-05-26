import React from 'react'
import {BorderBeam}  from "@/components/magicui/border-beam";
import Meteors from "@/components/magicui/meteors";
const Header = () => {
  return (
    <div className="relative min-h-[100px] w-[800px] rounded-xl bg-slate-800">
        {/* HEADER */}
        <div className="relative flex flex-col h-[100px] w-full items-center justify-center overflow-hidden border-b border-slate-700 rounded-lg bg-background p-20 md:shadow-xl">
            <Meteors number={30} />
            <BorderBeam />
            <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-slate-300">
                Dudarev Pavel
            </p>
            <br/>
            <a className="z-10 whitespace-pre-wrap text-center text-2xl font-medium tracking-tighter text-blue-300 cursor-pointer" 
            href='https://t.me/rinerte'>
                @RINERTE
            </a>
        </div>
    </div>
  )
}

export default Header