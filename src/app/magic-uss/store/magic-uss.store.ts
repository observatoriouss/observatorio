import { create, StateCreator } from "zustand";
import {
  Conversation,
  EndContent,
  EnumTypeMessage,
  Message,
  PartialContent,
  Role,
} from "../models/magic-uss.model";
import { MagicUssService } from "../services/magic-uss.service";
import { devtools } from "zustand/middleware";
import { useAuthStore } from "@/stores/session";

interface StateMagicUss {
  conversations: Conversation[];
  currentConversation?: Conversation;
  messages: Message[];
  newMessage: string;
  isLoading: boolean;
  isLoadingConversations: boolean;
  isLoadingMessages: boolean;
  isSidebarOpen: boolean;
  isMobileSidebarOpen: boolean;
  isSelectedConversation: boolean;
  dummyRef?: HTMLButtonElement;
  inputMsgRef?: HTMLDivElement;
  responseMsgRef?: HTMLDivElement;
  isDummyConversation: boolean;
  isContinueConversation: boolean;

  // Actions
  setCurrentConversation: (conversation: Conversation) => void;
  setNewMessage: (message: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setDummyRef: (ref: HTMLButtonElement) => void;
  setInputMsgRef: (ref: HTMLDivElement) => void;
  setResponseMsgRef: (ref: HTMLDivElement) => void;
  initNewConversation: () => void;
  createNewConversation: () => void; //interactua con un EventSource
  sendMessage: () => void; //interactua con un EventSource
  askToPost: (postId: string) => void; //interactua con un EventSource
  getConversations: () => Promise<void>;
  getMessages: () => Promise<void>;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
}

export const storeApi: StateCreator<
  StateMagicUss,
  [["zustand/devtools", never]]
> = (set, get) => ({
  conversations: [],
  messages: [],
  currentConversation: undefined,
  newMessage: "",
  isLoading: false,
  isLoadingConversations: false,
  isLoadingMessages: false,
  isSidebarOpen: true,
  isMobileSidebarOpen: false,
  isDummyConversation: false,
  isSelectedConversation: false,
  isContinueConversation: false,

  setCurrentConversation: (currentConversation) => {
    set({ currentConversation, isSelectedConversation: true, messages: [] });
  },

  setNewMessage: (message: string) => {
    set({ newMessage: message });
  },

  setIsLoading: (isLoading) => {
    set({ isLoading });
  },

  setDummyRef: (ref: HTMLButtonElement) => {
    set({ dummyRef: ref });
  },

  setInputMsgRef: (ref: HTMLDivElement) => {
    set({ inputMsgRef: ref });
  },

  setResponseMsgRef: (ref: HTMLDivElement) => {
    set({ responseMsgRef: ref });
  },

  initNewConversation: () => {
    const user = useAuthStore.getState().user;
    const conversations = get().conversations;
    // Si ya existe una conversación dummy, no hacer nada
    if (conversations.find((conv) => conv.id === "new-conversation")) return;
    if (!user) return;
    set({
      isDummyConversation: true,
      isSelectedConversation: false,
      currentConversation: {
        id: "new-conversation",
        title: `Nueva conversación ${get().conversations.length + 1}`,
        userId: user.id,
        lastMessageAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      messages: [],
      conversations: [
        {
          id: "new-conversation",
          title: `Nueva conversación ${get().conversations.length + 1}`,
          userId: user.id,
          lastMessageAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...get().conversations,
      ],
    });
  },

  createNewConversation: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const body = get().newMessage;

    set({
      isLoading: true,
      messages: [
        {
          id: Date.now().toString(),
          body,
          role: Role.USER,
          createdAt: new Date().toISOString(),
          conversationId: "new-conversation",
        },
        {
          id: (Date.now() + 1).toString(),
          body: "...",
          role: Role.ASSISTANT,
          createdAt: new Date().toISOString(),
          conversationId: "new-conversation",
        },
      ],
      isSelectedConversation: false,
      newMessage: "",
    });

    // Escuchar los mensajes que envía el servidor
    const eventSource = await MagicUssService.createConversation({
      userId: user.id,
      body
    });

    let msg = "";
    eventSource.onmessage = function (event: MessageEvent) {
      console.log("Message from server:", { data: event.data });

      // Parsear el contenido JSON sin comillas manuales
      const data: PartialContent | EndContent = JSON.parse(event.data);
      console.log({ data });
      if (data.type === EnumTypeMessage.PARTIAL_CONTENT) {
        msg += data.payload;
        console.log({ msg });
        console.log({ type: EnumTypeMessage.PARTIAL_CONTENT });
        let formattedMessage = formatBodyMessage(msg);

        document.getElementById("response-dummy")!.innerHTML = formattedMessage;
      } else if (data.type === EnumTypeMessage.END) {
        console.log({ type: EnumTypeMessage.END });

        let formattedMessage = formatBodyMessage(msg);

        let conversations = get().conversations;
        conversations[0] = data.payload.conversation;

        let messages = get().messages;
        messages[messages.length - 1] = {
          body: formattedMessage,
          conversationId: data.payload.responseMessage.conversationId,
          createdAt: data.payload.responseMessage.createdAt,
          id: data.payload.responseMessage.id,
          role: data.payload.responseMessage.role,
        };
        set({
          messages,
          currentConversation: data.payload.conversation,
          isDummyConversation: true,
          conversations,
          isSelectedConversation: true,
          isContinueConversation: true,
          isLoading: false,
        });
      }

      if (data.type === EnumTypeMessage.END) {
        eventSource.close();
      }
    };

    // Manejar posibles errores
    eventSource.onerror = function (err) {
      console.error("EventSource failed:", err);
      eventSource.close();
      get().setIsLoading(false);
    };
  },

  sendMessage: () => {
    const user = useAuthStore.getState().user;
    const currentConversation = get().currentConversation;
    if (!user && !currentConversation) return;

    const body = get().newMessage;
    set({
      isLoading: true,
      messages: [
        ...get().messages,
        {
          id: Date.now().toString(),
          body,
          role: Role.USER,
          createdAt: new Date().toISOString(),
          conversationId: get().currentConversation!.id,
        },
        {
          id: (Date.now() + 1).toString(),
          body: "...",
          role: Role.ASSISTANT,
          createdAt: new Date().toISOString(),
          conversationId: get().currentConversation!.id,
        },
      ],
      isContinueConversation: true,
      isDummyConversation: false,
      newMessage: "",
    });

    // Escuchar los mensajes que envía el servidor
    const eventSource = MagicUssService.createMessage(
      currentConversation!.id,
      body
    );

    let msg = "";
    eventSource.onmessage = function (event: MessageEvent) {
      console.log("Message from server:", { data: event.data });

      // Parsear el contenido JSON sin comillas manuales
      const data: PartialContent | EndContent = JSON.parse(event.data);
      console.log({ data });
      if (data.type === EnumTypeMessage.PARTIAL_CONTENT) {
        msg += data.payload;
        console.log({ msg });
        console.log({ type: EnumTypeMessage.PARTIAL_CONTENT });
        let formattedMessage = formatBodyMessage(msg);

        document.getElementById("response-dummy")!.innerHTML = formattedMessage;
      } else if (data.type === EnumTypeMessage.END) {
        console.log({ type: EnumTypeMessage.END });

        let formattedMessage = formatBodyMessage(msg);

        const messages = get().messages;
        messages[messages.length - 1] = {
          body: formattedMessage,
          conversationId: data.payload.responseMessage.conversationId,
          createdAt: data.payload.responseMessage.createdAt,
          id: data.payload.responseMessage.id,
          role: data.payload.responseMessage.role,
        };
        set({
          messages,
          isContinueConversation: false,
          isLoading: false,
        });
      }

      if (data.type === EnumTypeMessage.END) {
        eventSource.close();
      }
    };

    // Manejar posibles errores
    eventSource.onerror = function (err) {
      console.error("EventSource failed:", err);
      eventSource.close();
      get().setIsLoading(false);
    };
  },

  askToPost: async (postId: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const question = get().newMessage;

    set({
      isLoading: true,
      messages: [
        {
          id: Date.now().toString(),
          body: question,
          role: Role.USER,
          createdAt: new Date().toISOString(),
          conversationId: "new-conversation",
        },
        {
          id: (Date.now() + 1).toString(),
          body: "...",
          role: Role.ASSISTANT,
          createdAt: new Date().toISOString(),
          conversationId: "new-conversation",
        },
      ],
      // isSelectedConversation: false,
      newMessage: "",
    });

    // Escuchar los mensajes que envía el servidor
    const eventSource = await MagicUssService.ask(postId, question);

    let msg = "";
    eventSource.onmessage = function (event: MessageEvent) {
      console.log("Message from server:", { data: event.data });

      // Parsear el contenido JSON sin comillas manuales
      const data: PartialContent | EndContent = JSON.parse(event.data);
      console.log({ data });
      if (data.type === EnumTypeMessage.PARTIAL_CONTENT) {
        msg += data.payload;
        console.log({ msg });
        console.log({ type: EnumTypeMessage.PARTIAL_CONTENT });
        let formattedMessage = formatBodyMessage(msg);

        document.getElementById("response-dummy")!.innerHTML = formattedMessage;
      } else if (data.type === EnumTypeMessage.END) {
        console.log({ type: EnumTypeMessage.END });

        let formattedMessage = formatBodyMessage(msg);

        const messages = get().messages;
        messages[messages.length - 1] = {
          body: formattedMessage,
          createdAt: new Date().toISOString(),
          conversationId: "new-conversation",
          id: (Date.now() + 1).toString(),
          role: Role.ASSISTANT,
        };
        set({
          messages,
          // currentConversation: data.payload.conversation,
          // isSelectedConversation: true,
          isLoading: false,
        });
      }

      if (data.type === EnumTypeMessage.END) {
        eventSource.close();
      }
    };

    // Manejar posibles errores
    eventSource.onerror = function (err) {
      console.error("EventSource failed:", err);
      eventSource.close
      get().setIsLoading(false);
    }
  },

  getConversations: async () => {
    set({ isLoadingConversations: true });
    try {
      const conversations = await MagicUssService.getConversations();
      set({
        conversations: conversations.sort((a, b) =>
          b.lastMessageAt.localeCompare(a.lastMessageAt)
        ),
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoadingConversations: false });
    }
  },

  getMessages: async () => {
    const currentConversation = get().currentConversation;
    if (!currentConversation) return;
    set({ isLoadingMessages: true });
    try {
      const messages = await MagicUssService.getMessages(
        currentConversation.id
      );
      // mapear los mensajes con highlite code
      const messagesFormatted = messages.map((message) => {
        const formattedMessage = formatBodyMessage(message.body);
        return {
          ...message,
          body: formattedMessage,
        };
      });
      set({ messages: messagesFormatted });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  toggleSidebar: () => set({ isSidebarOpen: !get().isSidebarOpen }),

  toggleMobileSidebar: () =>
    set({ isMobileSidebarOpen: !get().isMobileSidebarOpen }),
});

export const useMagicUssStore = create<StateMagicUss>()(
  devtools(storeApi, {
    name: "MagicUSS Store",
  })
);

// Función para escapar caracteres HTML
function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function highlightCode(code: string) {
  // Definir patrones de tokens
  const patterns = [
    {
      type: "keyword",
      regex: /\b(var|let|const|function|if|else|return|for|while|class)\b/g,
    },
    { type: "string", regex: /(["'`])(?:\\.|[^\\])*?\1/g },
    { type: "number", regex: /\b\d+(\.\d+)?\b/g },
    { type: "function", regex: /\b([a-zA-Z_]\w*)\s*\(/g },
    { type: "comment", regex: /\/\/.*|\/\*[\s\S]*?\*\//g },
  ];

  // Función para escapar caracteres HTML
  function escapeHtml(unsafe: string) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Tokenizar el código
  let tokens = [];
  let lastIndex = 0;

  function findNextToken(startIndex: number) {
    let nextToken = null;
    let nextIndex = code.length;

    for (let pattern of patterns) {
      pattern.regex.lastIndex = startIndex;
      let match = pattern.regex.exec(code);
      if (match && match.index < nextIndex) {
        nextToken = { type: pattern.type, value: match[0], index: match.index };
        nextIndex = match.index;
      }
    }

    return nextToken;
  }

  while (lastIndex < code.length) {
    let token = findNextToken(lastIndex);
    if (token) {
      if (token.index > lastIndex) {
        tokens.push({
          type: "text",
          value: code.slice(lastIndex, token.index),
        });
      }
      tokens.push(token);
      lastIndex = token.index + token.value.length;
    } else {
      tokens.push({ type: "text", value: code.slice(lastIndex) });
      break;
    }
  }

  // Generar HTML resaltado
  let highlightedCode = tokens
    .map((token) => {
      let escapedValue = escapeHtml(token.value);
      if (token.type === "text") {
        return escapedValue;
      } else {
        return `<span class="${token.type}">${escapedValue}</span>`;
      }
    })
    .join("");

  // Manejar saltos de línea
  highlightedCode = highlightedCode.replace(/\n/g, "<br/>");

  return `<pre><code>${highlightedCode}</code></pre>`;
}

function formatBodyMessage(formattedMessage: string) {
  // Dividir el mensaje por bloques de código usando los triples backticks ```
  let parts = formattedMessage.split(/```/);

  // Procesar las partes del mensaje
  formattedMessage = parts
    .map((part, index) => {
      if (index % 2 === 1) {
        // Si es un bloque de código (índices impares en el split)
        return highlightCode(part);
      } else {
        // Si es texto normal
        return escapeHtml(part).replace(/\n/g, "<br/>"); // Escapar y conservar saltos de línea
      }
    })
    .join(""); // Unir todo el mensaje de nuevo

  return formattedMessage;
}
