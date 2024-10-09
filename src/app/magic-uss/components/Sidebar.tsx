import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { MessageSquare, PanelRightOpenIcon, PlusCircle } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMagicUssStore } from '../store/magic-uss.store'
import { cn } from '@/lib/utils'

function Sidebar() {
    const isLoadingConversations = useMagicUssStore(state => state.isLoadingConversations)
    const isLoading = useMagicUssStore(state => state.isLoading)
    const isContinueConversation = useMagicUssStore(state => state.isContinueConversation)
    const isDummyConversation = useMagicUssStore(state => state.isDummyConversation)
    const isMobileSidebarOpen = useMagicUssStore(state => state.isMobileSidebarOpen)
    const conversations = useMagicUssStore(state => state.conversations)
    const toggleSidebar = useMagicUssStore(state => state.toggleSidebar)
    const toggleMobileSidebar = useMagicUssStore(state => state.toggleMobileSidebar)
    const setDummyRef = useMagicUssStore(state => state.setDummyRef)
    const initNewConversation = useMagicUssStore(state => state.initNewConversation)
    const getConversations = useMagicUssStore(state => state.getConversations)
    const currentConversation = useMagicUssStore(state => state.currentConversation)
    const setCurrentConversation = useMagicUssStore(state => state.setCurrentConversation)
    const dummyRef = React.useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (isDummyConversation && dummyRef.current) {
            setDummyRef(dummyRef.current)
        }
    }, [dummyRef, isDummyConversation])

    useEffect(() => {
        getConversations()
    }, [])

    return (
        <div className="flex flex-col h-full">
            <div className="mb-8 flex items-center justify-between">
                <Link href='/' target='_blank'>
                    <Image
                        src="/img/logo_gray.png"
                        alt="Logo USS"
                        width={120}
                        height={80}
                    />
                </Link>
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleSidebar}
                                className="md:flex hidden p-0 m-0"
                            >
                                <PanelRightOpenIcon className="h-7 w-7 p-0 m-0" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side='right'>
                            <p>Contraer barra lateral</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Button
                onClick={initNewConversation}
                className="mb-4 w-full bg-gray-700 hover:bg-gray-600"
                disabled={(isLoadingConversations && !isContinueConversation) || isLoading}
            >
                <PlusCircle className="mr-2 h-4 w-4" /> Nueva conversación
            </Button>
            <ScrollArea className="flex-grow">
                {(isLoadingConversations && !isContinueConversation) && (
                    <div className="flex items-center justify-center h-full">
                        <p>Cargando...</p>
                    </div>
                )}
                {conversations.map(conv => (
                    <Button
                        key={conv.id}
                        onClick={() => {
                            setCurrentConversation(conv)
                            isMobileSidebarOpen && toggleMobileSidebar()
                        }}
                        variant="ghost"
                        className={cn(
                            "w-full justify-start mb-2 text-left",
                            currentConversation?.id === conv.id && "bg-white"
                        )}
                        disabled={(isLoadingConversations && !isContinueConversation || isLoading)}
                    >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {conv.title}
                    </Button>
                ))}
            </ScrollArea>
        </div>
    )
}

export default Sidebar