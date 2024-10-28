'use client'

import { useState } from 'react'
import Image from 'next/image'
import Masonry from 'react-masonry-css'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { getYoutubeId } from '@/lib/utils'

// Simulamos 20 imágenes
const imageUrls = Array(20).fill(null).map((_, i) => `/img/uss-congreso/${i + 1}.jpg`)

export default function CumbreIberoamericana() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleVideoClick = (url: string) => {
        setSelectedImage(null)
        setSelectedVideo(url)
        setIsDialogOpen(true)
    }

    const handleImageClick = (index: number) => {
        setSelectedImage(index)
        setIsDialogOpen(true)
    }

    const handlePrevious = () => {
        setSelectedImage((prev) => (prev === null || prev === 0 ? imageUrls.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setSelectedImage((prev) => (prev === null || prev === imageUrls.length - 1 ? 0 : prev + 1))
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-center">
                    I Cumbre Iberoamericana de Educación Superior
                    <p className='font-extrabold text-2xl'>Tecnologías de última generación para la transformación de la Educación</p>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Masonry
                    breakpointCols={{
                        default: 3,
                        1100: 3,
                        700: 2,
                        500: 1
                    }}
                    className="flex w-auto -ml-4"
                    columnClassName="pl-4 bg-clip-padding"
                >
                    <div className="mb-4 relative">
                        <Image
                            src={'/img/uss-congreso/0.jpg'}
                            alt={`I Cumbre Iberoamericana de Educación Superior`}
                            width={200}
                            height={300}
                            className="w-full h-auto rounded-lg cursor-pointer transition-transform hover:scale-105"
                            onClick={() => handleVideoClick('https://youtu.be/MmYLawHfUUg')}
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Play className="h-12 w-12 text-uss-phosphor-green" />
                        </div>
                    </div>
                    {imageUrls.map((url, index) => (
                        <div key={index} className="mb-4">
                            <Image
                                src={url}
                                alt={`Imagen ${index + 1}`}
                                width={200}
                                height={300}
                                className="w-full h-auto rounded-lg cursor-pointer transition-transform hover:scale-105"
                                onClick={() => handleImageClick(index)}
                            />
                        </div>
                    ))}
                </Masonry>
            </CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl">
                    {selectedImage !== null && (
                        <div className="relative">
                            <Image
                                src={imageUrls[selectedImage]}
                                alt={`Imagen ${selectedImage + 1}`}
                                width={800}
                                height={600}
                                className="w-full h-auto rounded-lg"
                            />
                            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full px-4">
                                <Button variant="outline" size="icon" onClick={handlePrevious}>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={handleNext}>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                    {selectedVideo !== null && (
                        <LiteYouTubeEmbed
                            id={getYoutubeId(selectedVideo) || ''}
                            title={'I Cumbre Iberoamericana de Educación Superior'}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    )
}