import { Link, useHistory } from 'react-router-dom';
import { FormEvent } from 'react';
//
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
// webpack (snowpack, vite, ...)

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { database } from '../services/firebase';

export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();

    const [newRoom, setNewRoom] = useState('');

    //
    async function handleCreateRoom(event: FormEvent) {
        // previde que o form mude de página
        event.preventDefault();

        // verificar antes de criar a sala
        if(newRoom.trim() === '') { return; }
        // criar a sala
        // vou usar o database do firebase
        // Pegando a ref lá no database
        // rooms seria uma categoria que tem lá
        const roomRef = database.ref('rooms');
        // pequei os dados do roomRef e usando push
        // ou seja, estou jogando algo no roomRef
        // No caso seria uma nova sala em meio a muitas outras
        const firebaseRoom = await roomRef.push({
            // nome da sala
            title: newRoom,
            // id do usuário que criou a sala
            authorId: user?.id,
        });

        // vou redirecionar para a rota da sala
        // para isso pego o id do registro lá no firebase
        history.push(`/room/${firebaseRoom.key}`);
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="#">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}