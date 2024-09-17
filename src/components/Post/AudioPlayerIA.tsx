'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { usePostStore } from '@/app/store/post';

interface AudioPlayerProps {
    audioBlob: string;
}

const AudioPlayerIA: React.FC<AudioPlayerProps> = ({ audioBlob }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const audio = audioBlob
        if (audioRef.current) {
            audioRef.current.src = audio;
        }
        if (audio) {
        }
    }, [audioBlob]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
        };

        const setAudioTime = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);

        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
        };
    }, []);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef.current || !audioRef.current) return;

        const progressBar = progressBarRef.current;
        const audio = audioRef.current;

        const percent = (event.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
        audio.currentTime = percent * audio.duration;
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!audioBlob) return null;

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md">
            <audio ref={audioRef} />
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={handlePlayPause}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <div className="text-sm font-medium text-gray-600">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
            </div>
            <div
                ref={progressBarRef}
                className="bg-gray-300 h-2 rounded-full cursor-pointer"
                onClick={handleProgressBarClick}
            >
                <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default AudioPlayerIA;