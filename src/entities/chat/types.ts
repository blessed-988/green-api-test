export interface Message {
    id: string;
    text: string;
    timestamp: Date;
    isOwn: boolean;
}

export interface Chat {
    phone: string;
    lastMessage?: string;
}
