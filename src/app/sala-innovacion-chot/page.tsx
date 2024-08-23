import React from 'react';
import VideoEmbed from '../tube/[slug]/video-embed';

const SalaInnovacionEducativa = () => {
    return (
        <div className="p-6 space-y-8  py-6 md:py-12 text-justify">
            <h1 className="text-4xl font-bold text-center text-gray-900">
                SALA DE INNOVACIÓN EDUCATIVA CHOT
            </h1>
            <VideoEmbed videoUrl={'https://www.youtube.com/watch?v=H57oOr9deoA'} title={'SALA DE INNOVACIÓN EDUCATIVA CHOT'} />
            <p className="text-lg text-gray-700">
                Término milenario de Lambayeque que significa ¨palacio¨ o ¨templo¨. Esta sala representa un lugar sagrado del conocimiento, donde la creatividad y la innovación se convierten en pilares fundamentales de la educación asociado a las megatendencias. Se encuentra inspirado por la riqueza cultural y el legado ancestral, Chot se erige como un espacio para el crecimiento intelectual, empresarial, innovador, disruptivo, donde se busca el intercambio de ideas y nuevos conocimientos, guiando a estudiantes, educadores y al empresariado de toda la región hacia horizontes de aprendizaje ilimitados.
            </p>

            <h2 className="text-3xl font-semibold text-gray-900">Introducción</h2>
            <p className="text-lg text-gray-700">
                La Universidad Señor de Sipán se enorgullece en anunciar la apertura de una avanzada Sala de Innovación Educativa. Este espacio está diseñado para impulsar el aprendizaje y la investigación a través de tecnologías de vanguardia, ofreciendo una experiencia educativa única y transformadora.
            </p>

            <h2 className="text-3xl font-semibold text-gray-900">
                Bondades y Características Destacadas
            </h2>
            <div className="space-y-6">
                <div>
                    <h3 className="text-2xl font-semibold text-gray-800">1. Holograma Humano</h3>
                    <p className="text-lg text-gray-700">
                        <strong>Descripción:</strong> Tecnología de proyección holográfica que permite la visualización de instructores y expertos en 3D.
                    </p>
                    <p className="text-lg text-gray-700">
                        <strong>Beneficios:</strong> Facilita la interacción en tiempo real con profesionales de diversas partes del mundo, mejorando la comprensión y la retención del conocimiento a través de una experiencia visual inmersiva.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800">2. Metaverso Educativo</h3>
                    <p className="text-lg text-gray-700">
                        <strong>Descripción:</strong> Un entorno virtual 3D donde los estudiantes pueden interactuar y aprender en un mundo digital paralelo.
                    </p>
                    <p className="text-lg text-gray-700">
                        <strong>Beneficios:</strong> Fomenta la colaboración y el aprendizaje interactivo, permitiendo a los estudiantes explorar y experimentar conceptos en un espacio sin límites físicos.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800">3. Espacio para Testear Productos y Nuevos Modelos de Negocios</h3>
                    <p className="text-lg text-gray-700">
                        <strong>Descripción:</strong> Área dedicada a la innovación y el emprendimiento, equipada con herramientas para el desarrollo y la evaluación de prototipos y modelos de negocios.
                    </p>
                    <p className="text-lg text-gray-700">
                        <strong>Beneficios:</strong> Ofrece a los estudiantes la oportunidad de aplicar sus conocimientos en un entorno práctico, desarrollando habilidades empresariales y creativas que son esenciales en el mundo moderno.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800">4. Inteligencia Artificial Asociada a Laboratorios Inteligentes</h3>
                    <p className="text-lg text-gray-700">
                        <strong>Descripción:</strong> Laboratorios equipados con sistemas de inteligencia artificial que asisten en experimentos, análisis de datos y simulaciones.
                    </p>
                    <p className="text-lg text-gray-700">
                        <strong>Beneficios:</strong> Mejora la precisión y eficiencia en la investigación, proporcionando a los estudiantes acceso a tecnología de última generación para resolver problemas complejos y desarrollar soluciones innovadoras.
                    </p>
                </div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900">Impacto en la Comunidad Educativa</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Estudiantes</h3>
                    <p className="text-lg text-gray-700">
                        Acceso a herramientas y recursos avanzados que enriquecen el proceso de aprendizaje, preparándolos para enfrentar los desafíos del futuro con una sólida base tecnológica y práctica.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Docentes</h3>
                    <p className="text-lg text-gray-700">
                        Un entorno propicio para la innovación en la enseñanza, permitiendo la implementación de nuevas metodologías y técnicas educativas.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Investigadores</h3>
                    <p className="text-lg text-gray-700">
                        Facilidades para realizar investigaciones avanzadas, colaborando con expertos y utilizando tecnología de punta para generar conocimiento significativo.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Emprendedores</h3>
                    <p className="text-lg text-gray-700">
                        Un ecosistema de apoyo para la creación y el desarrollo de ideas de negocio, potenciando el espíritu emprendedor y la capacidad de innovación.
                    </p>
                </div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900">Conclusión</h2>
            <p className="text-lg text-gray-700">
                La Sala de Innovación Educativa en la Universidad Señor de Sipán representa un hito en la transformación de la educación superior. Al integrar tecnologías avanzadas como hologramas, el metaverso, y la inteligencia artificial, este espacio se convierte en un catalizador para el aprendizaje, la investigación y el emprendimiento, posicionando a nuestros estudiantes y docentes a la vanguardia de la innovación educativa.
            </p>
            <p className="text-lg font-bold text-gray-900">
                ¡Bienvenidos a la nueva era de la educación en la Universidad Señor de Sipán!
            </p>
        </div>
    );
};

export default SalaInnovacionEducativa;
