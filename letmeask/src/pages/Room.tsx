import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import RoomCode from '../components/RoomCode';
import '../styles/room.scss';
import { useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

type Questions = {
    id: string;
    author:{
        name: string,
        avatar: string,
    },
    content: string,
    isHighLighted:boolean,
    isAnswered: boolean,

}
type FirebaseQuestions = Record< string, {
    author:{
        name: string,
        avatar: string,
    },
    content: string,
    isHighLighted:boolean,
    isAnswered: boolean,

}> 
type RoomParams = {
    id: string;
}

function Room(){

    const { user } = useAuth();

    const [newQuestion, setNewQuestion] = useState('');
    const [ questions, setQuestions ] = useState<Questions[]>([]);
    const [title, setTitle] = useState('');
    
    const params = useParams<RoomParams>();
   
    const roomId = params.id;   

    useEffect(() => {
       
        const roomRef = database.ref(`rooms/${roomId}`);
        roomRef.once('value', room =>{
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            const parseQuestions = Object.entries(firebaseQuestions ).map(([key, value]) => {
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parseQuestions);
        })
        
        return () => {
           
        }
    }, [roomId])
    

    async function handleSendQuestion(event: FormEvent){

        event.preventDefault();

        if(newQuestion.trim() === ''){
            return;
        }
        if(!user){
            // usar react-hot-tost
            throw new Error("you must be logged in");
        }
        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
                id: user.id,
            },
            isHighLighted: false,
            isAnswered: false,
        }
        await database.ref(`rooms/${roomId}/question`).push(question); 
        setNewQuestion('');


    }

    return(
        <div id= 'page-room'>

            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={ roomId }/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length> 0 && <span>{questions.length} perguntas</span>}
                    
                </div>
                <form  onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="O que você quer perguntar?"
                        onChange={ event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {   user? (
                                <div className="user-info">
                                    <img src={user.avatar} alt={user.name} />
                                    <span>{user.name}</span>
                                </div>
                            ) : (
                                <span>Para enviar uma pergunta, <button> faça seu login</button>.</span>
                            )
                        }
                       
                        <Button type="submit" disabled={ !user }>Enviar pergunta</Button>
                    </div>
                </form>
                {JSON.stringify(questions)}

            </main>
        </div>
    )
} export default Room;