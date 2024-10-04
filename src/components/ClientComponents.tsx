'use client'
import React from 'react';
import Counter from '@/components/Counter';
import GoogleTranslate from './GoogleTranslate';
import ToasterContainer from './Toaster';
import AuthDialog from './AuthDialog';
import { useAuthStore } from '@/stores/session';

function ClientComponents() {
    const openAuthDialog = useAuthStore(state => state.openAuthDialog)
    return (
        <React.Fragment>
            {openAuthDialog && <AuthDialog />}
            <Counter />
            <GoogleTranslate />
            <ToasterContainer />
        </React.Fragment>
    )
}

export default ClientComponents