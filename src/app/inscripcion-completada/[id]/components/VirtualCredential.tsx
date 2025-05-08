'use client';
import html2canvas from 'html2canvas';
import { Participant, MapRoleInscription } from '@/services/events';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

function VirtualCredential({ participant }: { participant: Participant }) {
    const divRef = useRef(null);
    const [isImageLoaded, setIsImageLoaded] = useState(true);

    const handleDownload = async () => {
        if (divRef.current && isImageLoaded) {
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

    return (
        <>
            <div className='w-full flex justify-center align-middle py-4 text-white'>
                <div ref={divRef} className='min-h-[400px] w-4/5 md:w-1/2 p-2 bg-black'>
                    <div className='flex flex-col gap-1 p-2 items-center border border-white rounded bg-black'>
                        <div style={{
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '0.25rem',
                            display: 'inline-block',
                            padding: '4px 8px',
                            lineHeight: 1,
                        }}>
                            {participant.roles.map((role) => (
                                <p style={{
                                    fontSize: '11px',
                                    fontWeight: 500,
                                    margin: 0,
                                    padding: 0,
                                }}>
                                    {MapRoleInscription[role]}
                                </p>
                            ))}
                        </div>
                        <h2 className='text-xl font-medium'> {participant.user.name} </h2>
                        <h2 className='text-base font-medium'> {participant.user.email} </h2>
                        <h2 className='text-sm font-medium'> DNI: {participant.user.documentNumber} </h2>
                        <img
                            src={`https://quickchart.io/qr?text=${participant.id}&size=600`}
                            style={{ padding: '0.75rem' }}
                            onLoad={() => {
                                setIsImageLoaded(true)
                            }}
                            crossOrigin="anonymous"
                        />
                    </div>
                </div>
            </div>
            <div className='text-white flex flex-col gap-4'>
                <p className='text-xs font-medium text-center'>Descarga tu credencial, el personal de la entrada te la solicitará para ingresar al evento.</p>

                <Button onClick={handleDownload} className='w-full' disabled={!isImageLoaded}>
                    {isImageLoaded ? 'Descargar credencial' : 'Cargando...'}
                </Button>
            </div>
        </>
    );
}

export default VirtualCredential;