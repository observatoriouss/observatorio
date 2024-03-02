"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { configParticles } from './config.particles'
import {
    type Container,
} from "@tsparticles/engine";

function ParticlesBackground() {
    const [init, setInit] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);
    const particlesLoaded = async (container?: Container | undefined): Promise<void> => {
        console.log(container);
    };
    if (init) {
        return (
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={configParticles}
            />
        );
    }

    return <></>;
}

export default ParticlesBackground