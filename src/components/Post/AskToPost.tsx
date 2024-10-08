'use client';
import React from 'react'
import { usePostStore } from '@/stores/post';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { RainbowButton } from '../ui/rainbow-button';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Loader2, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useMagicUssStore } from '@/app/magic-uss/store/magic-uss.store';

function AskToPost() {
    const postSelected = usePostStore(state => state.postSelected);

    const open = usePostStore(state => state.isOpenAskToPost);
    const setOpen = usePostStore(state => state.setIsOpenAskToPost);
    const messages = useMagicUssStore(state => state.messages);
    const newMessage = useMagicUssStore(state => state.newMessage)
    const setNewMessage = useMagicUssStore(state => state.setNewMessage)
    const isLoading = useMagicUssStore(state => state.isLoading)
    const askToPost = useMagicUssStore(state => state.askToPost)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return
        if (!postSelected) return
        askToPost(postSelected.id)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <RainbowButton>Conversar con Post ✨</RainbowButton>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[500px]"
                onPointerDownOutside={e => {
                    e.preventDefault()
                }}
                onEscapeKeyDown={(e) => {
                    e.preventDefault();
                }}
            >
                <DialogHeader>
                    <DialogTitle />
                </DialogHeader>
                <DialogDescription />

                <div className="flex flex-col h-[60vh]">
                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                        <AnimatePresence>
                            {messages.length === 0 ? (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center text-gray-500 italic"
                                >
                                    ¿Qué te gustaría saber sobre el post?
                                </motion.p>
                            ) : (
                                // conversation.map((message, index) => (
                                //     <motion.div
                                //         key={index}
                                //         initial={{ opacity: 0, y: 10 }}
                                //         animate={{ opacity: 1, y: 0 }}
                                //         exit={{ opacity: 0, y: -10 }}
                                //         transition={{ duration: 0.3 }}
                                //         className={`p-3 rounded-lg ${message.type === 'human' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                                //             } max-w-[80%]`}
                                //     >
                                //         {message.content}
                                //     </motion.div>
                                // ))
                                <>
                                    <motion.div
                                        id="input-dummy"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className={`mb-4 p-3 rounded-lg bg-green-100 ml-auto w-fit max-w-[80%]`}
                                        dangerouslySetInnerHTML={{ __html: messages[messages.length - 2].body }}
                                    >
                                        {/* {messages[0].body} */}
                                    </motion.div>
                                    <motion.div
                                        id="response-dummy"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className={`mb-4 p-3 rounded-lg bg-gray-200 w-fit max-w-[80%]`}
                                        dangerouslySetInnerHTML={{ __html: messages[messages.length - 1].body }}
                                    >
                                        {/* {messages[1].body} */}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-2">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Escribe tu pregunta aquí..."
                            className="flex-grow"
                        />
                        <Button type="submit" disabled={isLoading || !newMessage.trim()}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                    </form>
                </div>
                <DialogFooter />

            </DialogContent>
        </Dialog>
    )
}

export default AskToPost