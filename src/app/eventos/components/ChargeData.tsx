'use client'

import { useEffect } from "react"
import { InscriptionEventStore } from "../store/incription-event.store"

function ChargeData() {
    const { getListSchools } = InscriptionEventStore()
    useEffect(() => {
        getListSchools()
    }, [])
    return (
        <></>
    )
}

export default ChargeData