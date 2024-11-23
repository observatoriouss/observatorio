'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { VerifyParticipant } from "@/services/events"
import { useAuthStore } from "@/stores/session"
import html2canvas from "html2canvas"
import { useEffect, useRef, useState } from "react"
import { toast, Toaster } from "sonner"

function ShareCredential({ participant }: { participant: VerifyParticipant }) {
    const {
        credentialBackgroundUrl,
        credentialHelpText,
        credentialLogos,
        credentialTextToShare,
    } = participant.training
    const user = useAuthStore((state) => state.user)
    const arr = credentialLogos

    const divRef = useRef(null);
    const [imgLoaded, setImgLoaded] = useState(false)
    const [userImg, setUserImg] = useState('')
    useEffect(() => {
        if (!user) return;
        (async () => {
            try {
                const response = await fetch(user.image);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const userImgBlob = await response.blob();
                const userImgUrl = URL.createObjectURL(userImgBlob);
                setUserImg(userImgUrl);
                setImgLoaded(true);
            } catch (error) {
                console.error("Failed to fetch the image:", error);
            }
        })();
    }, [user]);

    const handleDownload = async () => {
        if (divRef.current) {
            try {
                const canvas = await html2canvas(divRef.current, {
                    useCORS: true,
                    allowTaint: true,
                    logging: true,
                });

                const image = canvas.toDataURL("image/png");
                const link = document.createElement('a');
                link.download = 'virtual-credential.png';
                link.href = image;
                link.click();
            } catch (err) {
                console.error('Error al generar la imagen:', err);
            }
        } else {
            console.error('Error al generar la imagen: divRef.current no existe o la imagen no ha cargado');
        }
    };

    return credentialBackgroundUrl && imgLoaded && (
        <div className='w-full flex justify-center items-center flex-col gap-4'>

            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <h1 className="text-white w-[400px] hover:scale-105 transition-transform duration-300 ease-in-out text-center cursor-pointer"
                            onClick={() => {
                                // copiar al portapapeles
                                navigator.clipboard.writeText(credentialTextToShare);

                                toast.success('Texto copiado al portapapeles!');
                            }}>
                            {credentialTextToShare}
                        </h1>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Copiar al portapapeles!</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <div className='w-[400px] relative aspect-square object-contain hover:scale-105 transition-transform duration-300'
                ref={divRef}
            >
                <img
                    src={credentialBackgroundUrl} alt="template"
                    // src="/credential/template.jpeg" alt="template"
                    className='w-[400px] aspect-square object-contain'
                />

                {user && (
                    <>
                        <img
                            src={userImg}
                            alt="perfil" className="absolute top-[160px] left-[207px] transform -translate-x-1/2 -translate-y-1/2 w-1/3 rounded-full aspect-square object-cover" />
                        <div className='absolute top-[265px] h-10 pb-1.5 left-[198px] transform -translate-x-1/2 -translate-y-1/2 font-bold text-center bg-[#fff] max-w-[315px] min-w-[315px] text-sm sm:text-lg text-ellipsis overflow-hidden whitespace-nowrap flex items-center justify-center'
                            style={{
                                display: 'grid',
                                placeItems: 'center',
                            }}
                        >{user.name} <br /> &nbsp;</div>
                    </>
                )}
                <div className='absolute top-[315px] left-[198px] h-10 pb-1.5 transform -translate-x-1/2 -translate-y-1/2 font-bold text-center max-w-[315px] min-w-[315px] bg-[#fff] text-xs text-clip overflow-hidden flex items-center justify-center'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingBottom: '8px',
                    }}
                >{credentialHelpText}</div>

                <div className={cn(
                    'absolute bottom-0 w-full left-1/2 h-[50px] transform -translate-x-1/2 bg-white',
                    arr.length === 1 && 'grid grid-cols-1',
                    arr.length === 2 && 'grid grid-cols-2 py-1.5 px-1.5',
                    arr.length === 3 && 'grid grid-cols-3',
                    arr.length === 4 && 'grid grid-cols-4',
                )}>
                    {arr.map((img, index) => (
                        <div key={index} className='flex justify-center items-center px-0.5'>
                            <img src={img} alt="logo-sponsor" className='w-full max-h-10 object-contain' />
                        </div>
                    ))}
                </div>
            </div>

            <button
                className='bg-uss-phosphor-green text-black py-2 px-4 rounded-lg hover:scale-105 transition-transform duration-300'
                onClick={handleDownload}
            >
                Descargar Credencial Virtual
            </button>

            <Toaster />
        </div>
    )
}

export default ShareCredential