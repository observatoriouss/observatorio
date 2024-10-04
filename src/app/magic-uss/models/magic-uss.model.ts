export interface Message {
    id:             string;
    role:           Role;
    body:           string;
    createdAt:      string;
    conversationId: string;
}

export enum Role {
    USER = 'user',
    ASSISTANT = 'assistant'
}
export const MapRole: Record<Role, string> = {
    [Role.USER]: 'Usuario',
    [Role.ASSISTANT]: 'Asistente'
}

export interface Conversation {
    id:            string;
    title:         string;
    userId:        string;
    lastMessageAt: string;
    createdAt:     string;
    updatedAt:     string;
}


// Streams
export enum EnumTypeMessage {
    PARTIAL_CONTENT = 'partial-content',
    END = 'end'
}

export interface PartialContent {
    type:       EnumTypeMessage.PARTIAL_CONTENT;
    payload:    string;
}

export interface EndContent {
    type: EnumTypeMessage.END;
    payload: {
        conversation:       Conversation;
        inputMessage:       Message;
        responseMessage:    Message;
    }
}