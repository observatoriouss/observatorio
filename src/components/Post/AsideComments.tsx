'use client';
import { usePostStore } from "@/app/store/post";
import { useAuthStore } from "@/app/store/session";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader, SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import NewComment from "./NewComment";
import { Separator } from "../ui/separator";
import { useEffect } from "react";
import CommentComponent from "./Comment";


function AsideComments() {
    const isOpenComments = usePostStore(state => state.isOpenComments);
    const setIsOpenComments = usePostStore(state => state.setIsOpenComments);
    const postSelected = usePostStore(state => state.postSelected);
    const getCommentsForPost = usePostStore(state => state.getCommentsForPost);
    const commentsForPostDraft = usePostStore(state => state.commentsForPostDraft);
    const user = useAuthStore(state => state.user)
    useEffect(() => {
        if (postSelected) {
            getCommentsForPost(postSelected.id)
        }
    }, [postSelected])

    return (
        <Sheet open={isOpenComments} onOpenChange={setIsOpenComments}>
            <SheetTrigger>
                <div className="'w-fit flex flex-row gap-1 rounded-md items-center justify-center border border-gray-600 px-4 py-2">
                    <MessageCircle size={20} /> {postSelected?.numberOfComments}
                </div>
            </SheetTrigger>
            <SheetContent className="p-0 overflow-auto w-full md:w-[540px]">
                <SheetHeader className="p-3.5 pb-0">
                    <SheetTitle>Comentarios ({postSelected?.numberOfComments})</SheetTitle>
                </SheetHeader>
                <SheetDescription className="flex flex-col gap-4" asChild>
                    <>
                        <div className="p-4">
                            {user ? (
                                <NewComment />
                            ) : (
                                <Card className="mt-2">
                                    <CardContent className="p-4 underline">
                                        <Link href="/iniciar-sesion">
                                            ¿Qué es lo que piensas?
                                        </Link>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                        <Separator />
                        <div className="flex flex-col gap-1">
                            {commentsForPostDraft.map((comment, index) => (
                                <CommentComponent comment={comment} key={'comt' + index} />
                            ))}
                        </div>
                    </>
                </SheetDescription>
            </SheetContent>
        </Sheet >
    )
}

export default AsideComments