import { useState, useEffect, useRef } from 'react';
import { Bold, Italic, Underline, User } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import useStore from "@/hooks/useStore";
import { authStore } from "@/app/store/session";
import { Button } from '../ui/button';
import './styles.css';
import { cn } from '@/lib/utils';
import { PostStore } from '@/app/store/post';

interface NewCommentProps {
  isReply?: boolean;
  placeholder?: string;
  onCancel?: () => void;
  commentId?: string;
}
function NewComment({ isReply = false, placeholder = 'Qué estás pensando?', onCancel, commentId }: NewCommentProps) {
  const session = useStore(authStore, (state) => state)!;
  const { createComment } = PostStore()
  const [activeFormats, setActiveFormats] = useState({ bold: false, italic: false, underline: false });
  const editableRef = useRef<HTMLDivElement>(null);
  const savedSelection = useRef<Range | null>(null);
  const [comment, setComment] = useState('');
  const [showUI, setShowUI] = useState(true);

  const [isCreateCommentLoading, setIsCreateCommentLoading] = useState(false)

  const handleCancel = () => {
    setShowUI(false);
  }

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection) return;
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (editableRef.current?.contains(range.commonAncestorContainer)) {

          // Guardar la selección actual
          savedSelection.current = range.cloneRange();

          // Función recursiva para verificar las etiquetas
          const checkFormats = (node: Node) => {
            const formats = { bold: false, italic: false, underline: false };

            let currentNode: Node | null = node;
            while (currentNode && currentNode !== editableRef.current) {
              if (currentNode.nodeType === Node.ELEMENT_NODE) {
                const element = currentNode as HTMLElement;
                if (element.tagName === 'B' || element.style.fontWeight === 'bold') {
                  formats.bold = true;
                }
                if (element.tagName === 'I' || element.style.fontStyle === 'italic') {
                  formats.italic = true;
                }
                if (element.tagName === 'U' || element.style.textDecoration === 'underline') {
                  formats.underline = true;
                }
              }
              currentNode = currentNode.parentNode;
            }

            setActiveFormats(formats);
          };

          checkFormats(range.startContainer);
        }
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const applyFormat = (format: any) => {
    document.execCommand(format, false, undefined);
    updateComment();
  };

  const updateComment = () => {
    if (editableRef.current) {
      setComment(editableRef.current.innerHTML);
    }
  };

  const handlePostComment = async () => {
    if (comment.trim() === '') return;
    setIsCreateCommentLoading(true);
    await createComment({
      body: comment,
      parentId: isReply ? commentId ?? null : null,
    })
    window.getSelection()?.removeAllRanges();
    // editableRef.current!.innerHTML = "";
    setComment('');
    savedSelection.current = null;
    setActiveFormats({ bold: false, italic: false, underline: false });
    setIsCreateCommentLoading(false);
    if (isReply) {
      onCancel?.();
    } else {
      setShowUI(false);
    }
  };

  if (isCreateCommentLoading) {
    return (
      <Card className="rounded-lg shadow-md min-w-[375px]">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-green-100 h-6 w-6 flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="flex-1">
              <div className="animate-pulse bg-gray-200 h-4 w-1/2 mb-2"></div>
              <div className="animate-pulse bg-gray-200 h-4 w-3/4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "rounded-lg shadow-md  md:max-w-full",
      isReply ? 'max-w-xs md:max-w-full min-w-[330px] md:min-w-[400px]' : '',
    )}>
      <CardContent className="p-4">
        {!isReply && showUI && (
          <div className="grid grid-cols-[auto,1fr] gap-2 items-center mb-4">
            <div className="rounded-full bg-green-100 h-6 w-6 flex items-center justify-center">
              <User size={16} />
            </div>
            <h2 className="text-base font-semibold">{session?.user?.name}</h2>
          </div>
        )}

        <div className={cn("",
          showUI ? 'mb-4' : 'm-0',
        )}>
          <pre className='hidden'>
            {JSON.stringify(savedSelection.current?.toString())}
          </pre>
          <pre className='hidden'>
            {JSON.stringify(editableRef.current?.innerHTML)}
          </pre>

          <div className="comment-editor">
            <div
              ref={editableRef}
              contentEditable
              className={cn("outline-none",
                showUI ? 'min-h-[100px]' : 'h-auto',
              )}
              onInput={updateComment}
              onClick={() => setShowUI(true)}
            />
            {comment.trim() === '' && (
              <span className={cn(
                showUI ? 'placeholder' : 'placeholderHiddenUI',
              )}>
                {placeholder}
              </span>
            )}
          </div>
        </div>

        {showUI && (
          <div className="grid grid-cols-[auto,1fr,auto] gap-4 items-center">
            <div className='flex space-x-1'>
              <Button
                size={"sm"}
                variant={"outline"}
                value="bold"
                aria-label="Toggle bold"
                onClick={() => applyFormat('bold')}
                className={activeFormats.bold ? 'bg-gray-300' : ''}>
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                size={"sm"}
                variant={"outline"}
                value="italic"
                aria-label="Toggle italic"
                onClick={() => applyFormat('italic')}
                className={cn(
                  activeFormats.italic ? 'bg-gray-300' : '',
                  isReply ? 'hidden md:block' : '',
                )}>
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                size={"sm"}
                variant={"outline"}
                value="underline"
                aria-label="Toggle underline"
                onClick={() => applyFormat('underline')}
                className={cn(
                  activeFormats.italic ? 'bg-gray-300' : '',
                  isReply ? 'hidden md:block' : '',
                )}>
                <Underline className="h-4 w-4" />
              </Button>
            </div>
            <div></div>
            <div className="flex gap-2">
              <button className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm" onClick={onCancel ?? handleCancel}>Cancelar</button>
              <button className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm" onClick={handlePostComment}>
                {isReply ? 'Responder' : 'Comentar'}
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default NewComment;
