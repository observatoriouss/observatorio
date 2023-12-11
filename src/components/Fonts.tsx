import React from 'react'

export default function Fonts() {
    return (
        <div>
            <h1 className='font-black'>Marselis Pro Black</h1>
            <h2 className='font-bold'>Marselis Pro Bold</h2>
            <h3 className='font-normal'>Marselis Pro Regular</h3>
            <h4 className='font-thin'>Marselis Pro Thin</h4>

            <hr />

            <h1 className='font-[Lyon-Text] font-black'>Lyon Text Black</h1>
            <h2 className='font-[Lyon-Text] font-bold'>Lyon Text Bold</h2>
            <h4 className='font-[Lyon-Text] font-semibold'>Lyon Text Semibold</h4>
            <h3 className='font-[Lyon-Text] font-normal'>Lyon Text Regular</h3>

            <hr />

            <h1 className='font-[Marselis-Slab] font-black'>Marselis Slab Black</h1>
            <h2 className='font-[Marselis-Slab] font-bold'>Marselis Slab Bold</h2>
            <h3 className='font-[Marselis-Slab] font-normal'>Marselis Slab Regular</h3>
            <h4 className='font-[Marselis-Slab] font-thin'>Marselis Slab Thin</h4>

            <hr />

            <h1 className='font-[Lyon] font-black'>Lyon Display Black</h1>
            <h2 className='font-[Lyon] font-bold'>Lyon Display Bold</h2>
            <h3 className='font-[Lyon] font-normal'>Lyon Display Regular</h3>
            <h4 className='font-[Lyon] font-thin'>Lyon Display Thin</h4>
        </div>
    )
}
