import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

    //
type FirebaseQuestion = Record<string, {
        author: {
            name: string;
            avatar: string;
        }
        content: string;
        isAnswered: boolean;
        isHighlighted: boolean;
        likes: Record<string, {
            authorId: string;
        }>
}>
    //
type QuestionType = {
        id: string;
        author: {
            name: string;
            avatar: string;
        }
        content: string;
        isAnswered: boolean;
        isHighlighted: boolean;
        likeCount: number;
        likeId: string | undefined;
}

export function useRoom(roomId: string) {
    const { user } = useAuth();
    //
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    //
    const [title, setTitle] = useState('');

    //
    useEffect(() => {
        //
        const roomRef = database.ref(`rooms/${roomId}`);
        //
        roomRef.on('value', room => {
            //
            
            const databaseRoom = room.val();
            const FirebaseQuestion: FirebaseQuestion = databaseRoom.questions ?? {};
            // o Object.entries() transforma um objeto em array com objetos como
            // elementos do array
            const parsedQuestions = Object.entries(FirebaseQuestion).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    // some() via percorrer um array ate achar uma condição que
                    // satisfaça a sua condição criada, ao encontrar retorna true
                    // caso não, retorna false
                    likeId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions);
        })

        return () => {
            roomRef.off('value');
        }
    }, [roomId, user?.id]);

    return { questions, title }
}