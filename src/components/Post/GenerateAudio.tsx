'use client'
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react'; // Asumiendo que AudioPlayer está en el mismo directorio
import AudioPlayerIA from './AudioPlayerIA';
import { getAudio } from '@/services/posts';

interface GenerateAudioProps {
    postId: string;
}

const GenerateAudio: React.FC<GenerateAudioProps> = ({ postId }) => {
    const [loadingAudio, setLoadingAudio] = useState(false);
    const [audioBlob, setAudioBlob] = useState<string | null>(null);

    const generateAudio = async () => {
        setLoadingAudio(true);
        try {
            // Aquí deberías reemplazar esta URL con tu endpoint real
            const { contentAudioUrl } = await getAudio(postId);
            setAudioBlob(contentAudioUrl);
        } catch (error) {
            console.error('Error generating audio:', error);
            // Aquí podrías manejar el error, por ejemplo mostrando un mensaje al usuario
        } finally {
            setLoadingAudio(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            {!audioBlob ? (
                <div className="text-center">
                    <p className="text-lg font-medium mb-4">¿Quieres que la IA lo lea por ti?</p>
                    <button
                        onClick={generateAudio}
                        disabled={loadingAudio}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    >
                        {loadingAudio ? (
                            <Loader2 className="animate-spin inline-block mr-2" size={20} />
                        ) : null}
                        {loadingAudio ? 'Generando audio...' : 'Generar Audio'}
                    </button>
                </div>
            ) : (
                <div>
                    <p className="text-lg font-medium mb-4">¡Audio generado! Escúchalo aquí:</p>
                    <AudioPlayerIA audioBlob={audioBlob} />
                </div>
            )}
        </div>
    );
};

export default GenerateAudio;