'use client'
import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { PlusCircle, Send, Menu, User, LogOut, PanelRightCloseIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useAuthStore } from '@/stores/session'
import { cn } from '@/lib/utils'
import AuthDialog from '@/components/AuthDialog'
import Sidebar from './components/Sidebar'
import { useMagicUssStore } from './store/magic-uss.store'
import { Role } from './models/magic-uss.model'

export default function MagicUSS() {
    /* Session Store */
    const user = useAuthStore(state => state.user)
    const openAuthDialog = useAuthStore(state => state.openAuthDialog)
    const _hasHydrated = useAuthStore(state => state._hasHydrated)
    const setOpenAuthDialog = useAuthStore(state => state.setOpenAuthDialog)

    /* Magic USS Store */
    const isLoading = useMagicUssStore(state => state.isLoading)
    const isLoadingMessages = useMagicUssStore(state => state.isLoadingMessages)
    const isDummyConversation = useMagicUssStore(state => state.isDummyConversation)
    const isSelectedConversation = useMagicUssStore(state => state.isSelectedConversation)
    const isContinueConversation = useMagicUssStore(state => state.isContinueConversation)
    const setInputMsgRef = useMagicUssStore(state => state.setInputMsgRef)
    const setResponseMsgRef = useMagicUssStore(state => state.setResponseMsgRef)
    const currentConversation = useMagicUssStore(state => state.currentConversation)
    const messages = useMagicUssStore(state => state.messages)
    const initNewConversation = useMagicUssStore(state => state.initNewConversation)
    const createNewConversation = useMagicUssStore(state => state.createNewConversation)
    const sendMessage = useMagicUssStore(state => state.sendMessage)
    const getMessages = useMagicUssStore(state => state.getMessages)
    const newMessage = useMagicUssStore(state => state.newMessage)
    const setNewMessage = useMagicUssStore(state => state.setNewMessage)
    const isSidebarOpen = useMagicUssStore(state => state.isSidebarOpen)
    const toggleSidebar = useMagicUssStore(state => state.toggleSidebar)
    const isMobileSidebarOpen = useMagicUssStore(state => state.isMobileSidebarOpen)
    const toggleMobileSidebar = useMagicUssStore(state => state.toggleMobileSidebar)

    const inputDummyRef = React.useRef<HTMLDivElement>(null)
    const responseDummyRef = React.useRef<HTMLDivElement>(null)
    const messageContainerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const messageContainer = messageContainerRef.current;
        if (messageContainer) {
            const children = messageContainer.querySelectorAll("div > div");
            const length = children.length;

            if (length > 0) {
                children[length - 1].scrollIntoView({
                    behavior: "smooth",
                });
            }
        }
    }, [messages]); // Ejecuta cuando los mensajes se renderizan

    useEffect(() => {
        if (isDummyConversation && inputDummyRef.current && responseDummyRef.current) {
            setInputMsgRef(inputDummyRef.current)
            setResponseMsgRef(responseDummyRef.current)
        }
    }, [inputDummyRef, responseDummyRef, isDummyConversation])

    const UserMenu = () => (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <TooltipProvider>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={
                                        user?.image
                                            ? user.image
                                            : `https://ui-avatars.com/api/?name=${user?.name}&background=random&color=fff`
                                    } alt="Avatar" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent side='right'>
                                <p>{user?.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi cuenta</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )

    useEffect(() => {
        if (_hasHydrated) {
            if (!user) {
                setOpenAuthDialog(true)
            }
        }
    }, [user, _hasHydrated])

    useEffect(() => {
        if (_hasHydrated) {
            if (currentConversation && !isDummyConversation && currentConversation.id !== 'new-conversation') {
                getMessages()
            }
        }
    }, [currentConversation, _hasHydrated])

    useEffect(() => {
        if (isContinueConversation) {
            const responseDummy = document?.getElementById("response-dummy");
            if (responseDummy) {
                responseDummy.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [isContinueConversation])

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar for larger screens */}
            <div className={cn(
                "hidden md:block bg-uss-phosphor-green text-black transition-all duration-300",
                isSidebarOpen ? 'w-64' : 'w-0'
            )}>
                {isSidebarOpen && (
                    <div className="p-4 h-full">
                        <Sidebar />
                    </div>
                )}
            </div>

            {/* Main chat area */}
            <div className="flex-1 flex flex-col">
                {/* Top bar */}
                <div className="flex items-center justify-between p-4 bg-white border-b">
                    <div className="md:hidden">
                        <Sheet open={isMobileSidebarOpen} onOpenChange={toggleMobileSidebar}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 p-0">
                                <div className="bg-uss-phosphor-green text-black p-4 h-full">
                                    <Sidebar />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    {!isSidebarOpen && (
                        <TooltipProvider>
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={toggleSidebar}
                                        className="mr-2 hidden md:flex p-0 m-0"
                                    >
                                        <PanelRightCloseIcon className="h-7 w-7 p-0 m-0" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side='right'>
                                    <p>Expander barra lateral</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    )}
                    <div className="flex-1 text-center font-semibold">
                        {currentConversation ? currentConversation.title : ''}
                    </div>
                    <div className="flex items-center">
                        <UserMenu />
                    </div>
                </div>

                {currentConversation ? (
                    <React.Fragment>
                        <ScrollArea className="flex-grow p-4" id='messages-container' ref={messageContainerRef}>
                            {isLoadingMessages && (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-600">Cargando mensajes...</p>
                                </div>
                            )}
                            {isDummyConversation && !isSelectedConversation && messages && messages.length > 0 && (
                                <>
                                    <div
                                        id="input-dummy"
                                        ref={inputDummyRef}
                                        className={`mb-4 p-3 rounded-lg bg-green-100 ml-auto w-fit max-w-[80%]`}
                                        dangerouslySetInnerHTML={{ __html: messages[messages.length - 2].body }}
                                    >
                                        {/* {messages[0].body} */}
                                    </div>
                                    <div
                                        id="response-dummy"
                                        ref={responseDummyRef}
                                        className={`mb-4 p-3 rounded-lg bg-gray-200 w-fit max-w-[80%]`}
                                        dangerouslySetInnerHTML={{ __html: messages[messages.length - 1].body }}
                                    >
                                        {/* {messages[1].body} */}
                                    </div>
                                </>
                            )}
                            {isSelectedConversation && messages && messages.length > 0 && (
                                <>
                                    {messages.map(msg => (
                                        <div
                                            id={
                                                isContinueConversation && msg.id === messages[messages.length - 1].id ? 'response-dummy' : ''
                                            }
                                            ref={
                                                isContinueConversation && msg.id === messages[messages.length - 1].id ? responseDummyRef : null
                                            }
                                            key={msg.id}
                                            className={`mb-4 p-3 rounded-lg ${msg.role === Role.USER ? 'bg-green-100 ml-auto' : 'bg-gray-200'
                                                } w-fit max-w-[80%]`}
                                            dangerouslySetInnerHTML={{ __html: msg.body }}
                                        >
                                            {/* {msg.body} */}
                                        </div>
                                    ))}
                                </>
                            )}
                        </ScrollArea>
                        <div className="p-4 border-t">
                            <div className="flex items-center">
                                <Textarea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Escribe tu mensaje aquí..."
                                    className="flex-grow mr-2"
                                    rows={1}
                                    disabled={isLoadingMessages || isLoading}
                                />
                                <Button onClick={isLoadingMessages || (isDummyConversation && !isSelectedConversation) ? createNewConversation : sendMessage}
                                    disabled={isLoading}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <div className="flex-grow flex items-center justify-center p-4">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4">Bienvenido a Magic USS AI ✨</h2>
                            <p className="text-gray-600 mb-4">
                                ¡Hola! Soy Magic USS, tu asistente virtual. ¿En qué puedo ayudarte hoy?
                            </p>
                            <Button onClick={initNewConversation} disabled={isLoading}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Iniciar nueva conversación
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {openAuthDialog && <AuthDialog />}
        </div>
    )
}