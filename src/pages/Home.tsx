import { useHistory } from 'react-router';

import { database } from '../services/firebase';

//
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
// webpack (snowpack, vite, ...)

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react';
import { useState } from 'react';

export function Home() {
    // declarando uma History
    const history = useHistory();
    const [roomCode, setRoomCode] = useState('');
    //
    const { user, signInWithGoogle } = useAuth();

    async function handleCreateRoom() {
        if(!user) {
            await signInWithGoogle();
        }


        // enviando o usuário para esta rota
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === '') { return; }

        // verificar se a sala que o usuário buscou existe
        // get() para pegar os dados
        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        //
        if(!roomRef.exists()) {
            alert('Room does not exist')
            return;
        }
        //
        if(roomRef.val().endedAt) {
            alert('Room already closed');
            return;
        }
        //
        history.push(`/rooms/${roomCode}`)

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo da Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}

