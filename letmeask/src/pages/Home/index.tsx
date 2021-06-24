import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button';
import * as routes from '../../routes/paths';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import './styles.scss';
import { useAuth } from '../../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../../services/firebase';

export function Home(){

    const history = useHistory();
    const {user, signWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');

    const handleCreateRoom = () => {
        if(!user){
            signWithGoogle();
        }
        history.push(routes.NEWROOM); 
    }
    async function handleJoinRoom(event: FormEvent){

        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            console.log('Room does not exists')
            alert('Room does not exists');
            return;
        }
        history.push(`rooms/${roomCode}`);
    }
    return(
        <div id= 'page-auth'>
            <aside>
                <img src={ illustrationImg } alt="ilustração" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real </p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt=" Letmeask" />
                    <button onClick={ handleCreateRoom } className='create-room'>
                        <img src={ googleIconImg } alt="Logo do Google" />
                        Crie sua sala com Google
                    </button>
                    <div className='separator'>ou entre na sala</div>
                    <form onSubmit={ handleJoinRoom }>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
                
            </main>

        </div>
    )
}