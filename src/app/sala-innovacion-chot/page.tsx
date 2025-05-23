'use client'
import React from 'react';
import VideoEmbed from '../tube/[slug]/video-embed';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const IMAGES = [
    "/img/chot/1.jpeg",
    "/img/chot/2.jpeg",
    "/img/chot/3.jpeg",
    "/img/chot/4.jpeg",
    "/img/chot/5.jpeg",
    "/img/chot/6.jpeg",
    "/img/chot/7.jpeg",
]

const SalaInnovacionEducativa = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-uss-green/20">
            <div className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <header className="text-center mb-2">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">Sala de Innovación Educativa CHOT</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Universidad Señor de Sipán - Inaugurada el 1 de julio de 2024
                    </p>
                </header>

                <section className='mb-2 rounded-2xl container mx-auto overflow-hidden'>
                    <video src="/img/chot/Sala de innovación.mp4" controls className='rounded-3xl'></video>
                </section>

                {/* Introduction */}
                <section className="mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-semibold text-green-800 mb-6">Introducción</h2>
                        <p className="text-gray-700 leading-relaxed mb-8">
                            La Universidad Señor de Sipán se enorgullece en anunciar la apertura de una avanzada Sala de Innovación
                            Educativa. Este espacio está diseñado para impulsar el aprendizaje y la investigación a través de
                            tecnologías de vanguardia, ofreciendo una experiencia educativa única y transformadora.
                        </p>
                    </div>
                </section>

                {/* Objectives */}
                <section className="mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-semibold text-green-800 mb-6">Objetivos</h2>
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                            <h3 className="text-xl font-medium text-green-700 mb-4">Objetivo General</h3>
                            <p className="text-gray-700 mb-6">
                                Promover la integración educativa de tecnologías emergentes, para enriquecer el proceso de
                                enseñanza-aprendizaje, fomentando el desarrollo de capacitaciones, proyectos de investigación y sesiones
                                de aprendizaje en la Sala de Innovación Educativa Chot, de la USS.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Objetivos específicos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        <TooltipProvider>
                            <Tooltip delayDuration={1}>
                                <TooltipTrigger asChild>
                                    <Card className="text-center">
                                        <CardContent className="pt-6">
                                            <img
                                                src="/img/chot/icons/1.png"
                                                alt="Visitas Guiadas"
                                                className="w-16 h-16 mx-auto mb-4"
                                            />
                                            <h3 className="font-semibold text-green-700 mb-2">Visitas Guiadas</h3>
                                            <p className="text-sm text-gray-600">
                                                Recorridos organizados para estudiantes, docentes y público general
                                            </p>
                                        </CardContent>
                                    </Card>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-[400px] p-2'>
                                    <p>Organizar visitas y recorridos guiados para estudiantes, docentes y el público general, difundiendo las tecnologías avanzadas y las oportunidades educativas que ofrece la Sala de Innovación Educativa de la Universidad Señor de Sipán.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip delayDuration={1}>
                                <TooltipTrigger asChild>
                                    <Card className="text-center">
                                        <CardContent className="pt-6">
                                            <img
                                                src="/img/chot/icons/2.png"
                                                alt="Capacitación Docente"
                                                className="w-16 h-16 mx-auto mb-4"
                                            />
                                            <h3 className="font-semibold text-green-700 mb-2">Capacitación Docente</h3>
                                            <p className="text-sm text-gray-600">Formación progresiva en tecnologías emergentes</p>
                                        </CardContent>
                                    </Card>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-[400px] p-2'>
                                    <p>Capacitar de manera progresiva a docentes en la integración y uso de tecnologías emergentes para enriquecer el proceso de enseñanza aprendizaje.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip delayDuration={1}>
                                <TooltipTrigger asChild>
                                    <Card className="text-center">
                                        <CardContent className="pt-6">
                                            <img
                                                src="/img/chot/icons/3.png"
                                                alt="Eventos Académicos"
                                                className="w-16 h-16 mx-auto mb-4"
                                            />
                                            <h3 className="font-semibold text-green-700 mb-2">Eventos Académicos Holográficos</h3>
                                            <p className="text-sm text-gray-600">Conferencias y eventos con tecnología holográfica</p>
                                        </CardContent>
                                    </Card>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-[400px] p-2'>
                                    <p>Desarrollar eventos académicos como videoconferencias, webinar, entrevistas en línea aplicando tecnología holográfica, clases enriquecidas con TIC.
                                    </p>
                                    <p>
                                        Desarrollar sesiones de aprendizaje aplicando tecnología emergente implementadas en la sala de innovación.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip delayDuration={1}>
                                <TooltipTrigger asChild>
                                    <Card className="text-center">
                                        <CardContent className="pt-6">
                                            <img
                                                src="/img/chot/icons/4.png"
                                                alt="Clases TIC"
                                                className="w-16 h-16 mx-auto mb-4"
                                            />
                                            <h3 className="font-semibold text-green-700 mb-2">Clases con TIC</h3>
                                            <p className="text-sm text-gray-600">Sesiones enriquecidas con tecnología educativa</p>
                                        </CardContent>
                                    </Card>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-[400px] p-2 hidden'>
                                    <></>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip delayDuration={1}>
                                <TooltipTrigger asChild>
                                    <Card className="text-center">
                                        <CardContent className="pt-6">
                                            <img
                                                src="/img/chot/icons/5.png"
                                                alt="Posicionamiento"
                                                className="w-16 h-16 mx-auto mb-4"
                                            />
                                            <h3 className="font-semibold text-green-700 mb-2">Posicionamiento USS</h3>
                                            <p className="text-sm text-gray-600">Liderazgo en innovación educativa</p>
                                        </CardContent>
                                    </Card>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-[400px] p-2'>
                                    <p>Contribuir al posicionamiento de la Universidad Señor de Sipán como líder en innovación educativa a nivel regional y nacional mediante la difusión estratégica de las actividades y tecnologías de la Sala de Innovación Educativa en redes sociales y la prensa.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </div>
                </section>

                {/* Benefits */}
                <section className="mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-semibold text-green-800 mb-6">Beneficios</h2>
                        <p className="text-gray-700 leading-relaxed mb-8">
                            Mejora la precisión y eficiencia en la investigación, proporcionando a los estudiantes acceso a tecnología de última generación para resolver problemas complejos y desarrollar soluciones innovadoras.
                        </p>
                    </div>
                </section>

                {/* Impact Section */}
                <section className="mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-semibold text-green-800 mb-8">Impacto en la Comunidad Educativa</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-medium text-green-700 mb-3">Estudiantes</h3>
                                    <p className="text-gray-600">
                                        Acceso a herramientas y recursos avanzados que enriquecen el proceso de aprendizaje, preparándolos
                                        para enfrentar los desafíos del futuro.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-medium text-green-700 mb-3">Docentes</h3>
                                    <p className="text-gray-600">
                                        Un entorno propicio para la innovación en la enseñanza, permitiendo la implementación de nuevas
                                        metodologías.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-medium text-green-700 mb-3">Investigadores</h3>
                                    <p className="text-gray-600">
                                        Facilidades para realizar investigaciones avanzadas, colaborando con expertos y utilizando
                                        tecnología de punta.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-medium text-green-700 mb-3">Emprendedores</h3>
                                    <p className="text-gray-600">
                                        Un ecosistema de apoyo para la creación y el desarrollo de ideas de negocio innovadoras.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Conclusion */}
                <section className="max-w-4xl mx-auto text-center mb-4">
                    <h2 className="text-3xl font-semibold text-green-800 mb-6">Conclusión</h2>
                    <p className="text-gray-700 leading-relaxed mb-8">
                        La Sala de Innovación Educativa en la Universidad Señor de Sipán representa un hito en la transformación de
                        la educación superior, posicionando a nuestros estudiantes y docentes a la vanguardia de la innovación
                        educativa.
                    </p>
                    <p className="text-2xl font-medium text-green-900">
                        ¡Bienvenidos a la nueva era de la educación en la Universidad Señor de Sipán!
                    </p>
                </section>

                <Swiper
                    spaceBetween={10}
                    // slidesPerView={4}
                    loop={true}
                    modules={[Navigation]}
                    navigation={{
                        nextEl: `.nextMenu`,
                        prevEl: `.prevMenu`,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                    }}
                >
                    {IMAGES.map((img, idx) => (
                        <SwiperSlide key={idx + 'navs'}>
                            <img key={idx + 'img' + img} src={img} alt={'CHOT'} className='w-full' />
                        </SwiperSlide>
                    ))}
                    <div
                        className={`prevMenu absolute top-2/4 z-20 -mt-[16px] flex h-8 w-8 cursor-pointer items-center justify-center transition-all duration-200 -left-[10px]`}
                        role="button"
                    >
                        <span className="sr-only">Prev</span>
                        <ChevronLeft width={18} height={18} />
                    </div>
                    <div
                        className={`nextMenu absolute top-2/4 z-20 -mt-[16px] flex h-8 w-8 cursor-pointer items-center justify-center transition-all duration-200 -right-[10px]`}
                        role="button"
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRight width={18} height={18} />
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default SalaInnovacionEducativa;
// <div className="p-6 space-y-8  py-6 md:py-12 text-justify">
//     <h1 className="text-4xl font-bold text-center text-gray-900">
//         SALA DE INNOVACIÓN EDUCATIVA CHOT
//     </h1>
//     <VideoEmbed videoUrl={'https://www.youtube.com/watch?v=H57oOr9deoA'} title={'SALA DE INNOVACIÓN EDUCATIVA CHOT'} />
//     <p className="text-lg text-gray-700">
//         Término milenario de Lambayeque que significa ¨palacio¨ o ¨templo¨. Esta sala representa un lugar sagrado del conocimiento, donde la creatividad y la innovación se convierten en pilares fundamentales de la educación asociado a las megatendencias. Se encuentra inspirado por la riqueza cultural y el legado ancestral, Chot se erige como un espacio para el crecimiento intelectual, empresarial, innovador, disruptivo, donde se busca el intercambio de ideas y nuevos conocimientos, guiando a estudiantes, educadores y al empresariado de toda la región hacia horizontes de aprendizaje ilimitados.
//     </p>

//     <h2 className="text-3xl font-semibold text-gray-900">Introducción</h2>
//     <p className="text-lg text-gray-700">
//         La Universidad Señor de Sipán se enorgullece en anunciar la apertura de una avanzada Sala de Innovación Educativa. Este espacio está diseñado para impulsar el aprendizaje y la investigación a través de tecnologías de vanguardia, ofreciendo una experiencia educativa única y transformadora.
//     </p>

//     <h2 className="text-3xl font-semibold text-gray-900">
//         Bondades y Características Destacadas
//     </h2>
//     <div className="space-y-6">
//         <div>
//             <h3 className="text-2xl font-semibold text-gray-800">1. Holograma Humano</h3>
//             <p className="text-lg text-gray-700">
//                 <strong>Descripción:</strong> Tecnología de proyección holográfica que permite la visualización de instructores y expertos en 3D.
//             </p>
//             <p className="text-lg text-gray-700">
//                 <strong>Beneficios:</strong> Facilita la interacción en tiempo real con profesionales de diversas partes del mundo, mejorando la comprensión y la retención del conocimiento a través de una experiencia visual inmersiva.
//             </p>
//         </div>

//         <div>
//             <h3 className="text-2xl font-semibold text-gray-800">2. Metaverso Educativo</h3>
//             <p className="text-lg text-gray-700">
//                 <strong>Descripción:</strong> Un entorno virtual 3D donde los estudiantes pueden interactuar y aprender en un mundo digital paralelo.
//             </p>
//             <p className="text-lg text-gray-700">
//                 <strong>Beneficios:</strong> Fomenta la colaboración y el aprendizaje interactivo, permitiendo a los estudiantes explorar y experimentar conceptos en un espacio sin límites físicos.
//             </p>
//         </div>

//         <div>
//             <h3 className="text-2xl font-semibold text-gray-800">3. Espacio para Testear Productos y Nuevos Modelos de Negocios</h3>
//             <p className="text-lg text-gray-700">
//                 <strong>Descripción:</strong> Área dedicada a la innovación y el emprendimiento, equipada con herramientas para el desarrollo y la evaluación de prototipos y modelos de negocios.
//             </p>
//             <p className="text-lg text-gray-700">
//                 <strong>Beneficios:</strong> Ofrece a los estudiantes la oportunidad de aplicar sus conocimientos en un entorno práctico, desarrollando habilidades empresariales y creativas que son esenciales en el mundo moderno.
//             </p>
//         </div>

//         <div>
//             <h3 className="text-2xl font-semibold text-gray-800">4. Inteligencia Artificial Asociada a Laboratorios Inteligentes</h3>
//             <p className="text-lg text-gray-700">
//                 <strong>Descripción:</strong> Laboratorios equipados con sistemas de inteligencia artificial que asisten en experimentos, análisis de datos y simulaciones.
//             </p>
//             <p className="text-lg text-gray-700">
//                 <strong>Beneficios:</strong> Mejora la precisión y eficiencia en la investigación, proporcionando a los estudiantes acceso a tecnología de última generación para resolver problemas complejos y desarrollar soluciones innovadoras.
//             </p>
//         </div>
//     </div>

//     <h2 className="text-3xl font-semibold text-gray-900">Impacto en la Comunidad Educativa</h2>
//     <div className="space-y-6">
//         <div>
//             <h3 className="text-2xl font-semibold text-gray-800">Estudiantes</h3>
//             <p className="text-lg text-gray-700">
//                 Acceso a herramientas y recursos avanzados que enriquecen el proceso de aprendizaje, preparándolos para enfrentar los desafíos del futuro con una sólida base tecnológica y práctica.
//             </p>
//         </div>

//         <div>
//             <h3 className="text-2xl font-semibold text-gray-800">Docentes</h3>
//             <p className="text-lg text-gray-700">
//                 Un entorno propicio para la innovación en la enseñanza, permitiendo la implementación de nuevas metodologías y técnicas educativas.
//             </p>
//         </div>

//         <div>
//             <h3 className="text-2xl font-semibold text-gray-800">Investigadores</h3>
//             <p className="text-lg text-gray-700">
//                 Facilidades para realizar investigaciones avanzadas, colaborando con expertos y utilizando tecnología de punta para generar conocimiento significativo.
//             </p>
//         </div>

//         <div>
//             <h3 className="text-2xl font-semibold text-gray-800">Emprendedores</h3>
//             <p className="text-lg text-gray-700">
//                 Un ecosistema de apoyo para la creación y el desarrollo de ideas de negocio, potenciando el espíritu emprendedor y la capacidad de innovación.
//             </p>
//         </div>
//     </div>

//     <h2 className="text-3xl font-semibold text-gray-900">Conclusión</h2>
//     <p className="text-lg text-gray-700">
//         La Sala de Innovación Educativa en la Universidad Señor de Sipán representa un hito en la transformación de la educación superior. Al integrar tecnologías avanzadas como hologramas, el metaverso, y la inteligencia artificial, este espacio se convierte en un catalizador para el aprendizaje, la investigación y el emprendimiento, posicionando a nuestros estudiantes y docentes a la vanguardia de la innovación educativa.
//     </p>
//     <p className="text-lg font-bold text-gray-900">
//         ¡Bienvenidos a la nueva era de la educación en la Universidad Señor de Sipán!
//     </p>

//     <Swiper
//         spaceBetween={10}
//         // slidesPerView={4}
//         loop={true}
//         modules={[Navigation]}
//         navigation={{
//             nextEl: `.nextMenu`,
//             prevEl: `.prevMenu`,
//         }}
//         breakpoints={{
//             640: {
//                 slidesPerView: 1,
//                 spaceBetween: 10,
//             },
//             768: {
//                 slidesPerView: 2,
//                 spaceBetween: 20,
//             },
//             1024: {
//                 slidesPerView: 3,
//                 spaceBetween: 30,
//             },
//             1280: {
//                 slidesPerView: 4,
//                 spaceBetween: 40,
//             },
//         }}
//     >
//         {IMAGES.map((img, idx) => (
//             <SwiperSlide key={idx + 'navs'}>
//                 <img key={idx + 'img' + img} src={img} alt={'CHOT'} className='w-full' />
//             </SwiperSlide>
//         ))}
//         <div
//             className={`prevMenu absolute top-2/4 z-20 -mt-[16px] flex h-8 w-8 cursor-pointer items-center justify-center transition-all duration-200 -left-[10px]`}
//             role="button"
//         >
//             <span className="sr-only">Prev</span>
//             <ChevronLeft width={18} height={18} />
//         </div>
//         <div
//             className={`nextMenu absolute top-2/4 z-20 -mt-[16px] flex h-8 w-8 cursor-pointer items-center justify-center transition-all duration-200 -right-[10px]`}
//             role="button"
//         >
//             <span className="sr-only">Next</span>
//             <ChevronRight width={18} height={18} />
//         </div>
//     </Swiper>
// </div>
