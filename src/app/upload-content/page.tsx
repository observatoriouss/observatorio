import React from 'react'

function UploadContentRequest() {
  return (
    <div className='container mx-auto min-h-[600px] flex flex-col justify-center items-center gap-4'>
        <p className='max-w-[600px] text-center'>
            {/* invitación de la universidad hacia las personas interesadas, a poder participar en la carga de información a través de un documento adjunto en un link */}
            La Universidad Señor de Sipán, a través de su Observatorio, ofrece asistencia a profesores, estudiantes, y profesionales apasionados por la cultura e innovación, para que puedan aportar con información relevante y actualizada en el ámbito educativo. Si deseas colaborar con nosotros, puedes hacerlo a través del siguiente formulario.
        </p>

        <a href="https://docs.google.com/document/d/1RNKd7oD-UxfvKhAMElAwY-lPc0xzPSnelqSg9fL_uB0/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            Formulario de carga de información
        </a>
    </div>
  )
}

export default UploadContentRequest