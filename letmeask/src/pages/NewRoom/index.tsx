import { FormEvent, useState } from 'react';
import { Button } from '../../components/Button';
import { Link, useHistory } from 'react-router-dom';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import './styles.scss';
import * as routes from '../../routes/paths';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

export function NewRoom(){

    const {user} = useAuth();
    const [ newRoom, setNewRoom] = useState('');
    const history =useHistory();

    async function handleCreateRoom(event: FormEvent){

        event.preventDefault();
        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });
        //console.log(`/rooms/${firebaseRoom.key}`)

        history.push(`/rooms/${firebaseRoom.key}`)
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
                    <h1>{ user?.name }</h1>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={ handleCreateRoom }>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange = { event => setNewRoom(event.target.value)}
                            value = { newRoom }
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                   
                    <p>Quer entrar numa sala existente?  <Link to={routes.HOME}>clique aqui</Link></p>
                </div>
                
            </main>

        </div>
    )
}