'use client'

import { useEffect } from "react"
import { useInscriptionEventStore } from "../store/incription-event.store"

function ChargeData() {
    const getListSchools = useInscriptionEventStore(state => state.getListSchools)
    useEffect(() => {
        getListSchools()
    }, [])
    return (
        <></>
    )
}

export default ChargeData