import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import * as routes from '../routes/paths';
import { useAuth } from '../hooks/useAuth';

export function NewRoom(){

    const {user} = useAuth();
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
                    <form >
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                   
                    <p>Quer entrar numa sala existente?  <Link to={routes.HOME}>clique aqui</Link></p>
                </div>
                
            </main>

        </div>
    )
}