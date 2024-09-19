'use client'
import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/session';

function AuthDialog() {
    const open = useAuthStore(state => state.openAuthDialog)
    const setOpen = useAuthStore(state => state.setOpenAuthDialog)
    const navigate = useRouter()

    const handleCreateAccount = () => {
        setOpen(false)
        navigate.push('/registro')
    }

    const handleLogin = () => {
        setOpen(false)
        navigate.push('/iniciar-sesion')
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className={""}
            // onPointerDownOutside={e => {
            //     e.preventDefault()

            // }}
            // onEscapeKeyDown={(e) => {
            //     e.preventDefault();
            // }}
            >
                <DialogHeader>
                    <DialogTitle />
                </DialogHeader>
                <DialogDescription />

                <div className='py-8 flex flex-col items-center gap-4 text-center'>
                    <h1 className='text-2xl font-semibold'>Crea una cuenta para realizar esta acción.</h1>
                    <p>
                        Al crear una cuenta, podrás acceder a todos los servicios de nuestra plataforma.
                    </p>

                    <Button className='py-4 w-3/4 rounded-xl' onClick={handleCreateAccount}>Crear cuenta</Button>

                    <p className='text-sm'>
                        ¿Ya tienes una cuenta?
                        <span>
                            <Button variant='link' className='py-4 px-0 ml-2' onClick={handleLogin}>Iniciar sesión</Button>
                        </span>
                    </p>

                </div>
                <DialogFooter />

            </DialogContent>
        </Dialog>
    )
}

export default AuthDialog