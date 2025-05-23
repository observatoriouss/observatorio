import { Heart, MessageCircle, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import NewComment from './NewComment'
import { usePostStore, Comment } from "@/stores/post";
import { cn } from '@/lib/utils'
import { useAuthStore } from "@/stores/session";

interface CommentProps {
  comment: Comment
  isChild?: boolean
}
function CommentComponent({ comment, isChild = false }: CommentProps) {
  const user = useAuthStore(state => state.user)
  const setOpenAuthDialog = useAuthStore(state => state.setOpenAuthDialog)
  const likeComment = usePostStore(state => state.likeComment)
  const postSelected = usePostStore(state => state.postSelected)
  const [reply, setReply] = useState(false)
  const handleChangeReply = () => setReply(!reply)
  const [isLikeCommentLoading, setIsLikeCommentLoading] = useState(false)

  const onCancel = () => {
    setReply(false)
  }

  const handleLike = async (postId: string) => {
    if (!user) return setOpenAuthDialog(true)
    setIsLikeCommentLoading(true)
    await likeComment(postId)
    setIsLikeCommentLoading(false)
  }

  return (
    <div className="p-4 w-full">
      <div className="grid grid-cols-[auto,1fr] gap-2 items-center mb-4">
        <div className="rounded-full bg-green-100 h-6 w-6 flex items-center justify-center">
          {comment.user?.image ? (
            <img
              src={comment.user.image}
              alt={comment.user.name}
              className="rounded-full h-6 w-6"
            />
          ) : (
            <User size={16} />
          )}
        </div>
        <h2 className={cn(
          "text-base font-normal text-gray-600",
          postSelected?.userId === comment.userId ? 'font-bold text-black underline' : ''
        )}>{comment.user.name}</h2>
      </div>

      <div className="mb-4">
        <div
          className="outline-none"
          dangerouslySetInnerHTML={{ __html: comment.body }}
        />
      </div>
      <pre className='text-xs hidden'>
        {JSON.stringify({
          comment,
          session: user
        }, null, 2)}
      </pre>
      <div className="grid grid-cols-[auto,1fr,auto] gap-4 items-center">
        <div className='flex'>
          <Button
            size={"sm"}
            variant={"ghost"}
            value="bold"
            aria-label="Toggle bold"
            className={cn('text-xs h-6 p-0 px-2',
              isLikeCommentLoading ? 'pointer-events-none' : '',
              (comment.iLikedIt) ? 'text-red-500 bg-red-50' : ''
            )}
            onClick={() => handleLike(comment.id)}
          >
            {isLikeCommentLoading ? (
              <div className="animate-pulse pointer-events-none flex items-center text-slate-300">
                <Heart className="h-3 w-3 mr-1 text-slate-300" /> {comment.numberOfLikes}
              </div>
            ) :
              (<div className='flex items-center text-black'>
                <Heart className={cn("h-3 w-3 mr-1",
                  (comment.iLikedIt) ? 'text-red-500' : ''
                )} /> {comment.numberOfLikes}
              </div>)
            }
          </Button>
          {!isChild && (
            <Button
              size={"sm"}
              variant={"ghost"}
              value="italic"
              aria-label="Toggle italic"
              className='text-xs h-6 p-0 px-2'
            //   onClick={() => applyFormat('italic')}
            //   className={activeFormats.italic ? 'bg-gray-300' : ''}
            >
              <MessageCircle className="h-3 w-3 mr-1" /> {comment.children.length}
            </Button>
          )}
        </div>
        <div></div>
        <div className="flex gap-2">
          {!isChild && (
            <Button variant={"ghost"} size={"sm"} className='text-xs' onClick={handleChangeReply}>Responder</Button>
          )}
        </div>
      </div>

      {reply && (
        <div className='grid grid-cols-1'>
          <div className='grid grid-cols-[auto,1fr,auto] gap-1 items-center'>
            <div className='w-0.5 h-full bg-slate-200 ml-3'></div>
            <div></div>
            <NewComment isReply placeholder={`Responder a ${comment.user.name}`} onCancel={onCancel} commentId={comment.id} />
          </div>
        </div>
      )}

      {comment.children.length > 0 && (
        <div className='grid grid-cols-1'>
          {comment.children.map((child, index) => (
            <div className='flex flex-row' key={'comtchil' + index + child.id}>
              <div className='w-0.5 h-full bg-slate-200 ml-3'></div>
              <CommentComponent comment={child} key={'comtchil' + index + child.id} isChild />
            </div>
          ))}
        </div>
      )}

      <Separator className='mt-8' />
    </div>
  )
}

export default CommentComponent