import logoImg from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import RoomCode from '../../components/RoomCode';
import './styles.scss';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import Question from '../../components/Question';
import { useRoom } from '../../hooks/useRoom';
import deleteImg from '../../assets/images/delete.svg';
import * as routes from '../../routes/paths';



type RoomParams = {
    id: string;
}

function AdminRoom(){

    const { user } = useAuth();
   
    
    const params = useParams<RoomParams>();
   
    const roomId = params.id;   
    
    const {title, questions } = useRoom( roomId );  

    const history = useHistory();
    
    async function handleDeleteRomm(){

        if( window.confirm('Você realmente deseja encerrar esta sala?') ){
 
         await database.ref(`rooms/${roomId}`).update({ 
             endedAt: new Date(),
         }); 
         history.push(routes.HOME);
        }        
     }
    
    async function handleDeleteQuestion(questionId: string){

       if( window.confirm('Você tem certeza que deseja excluir esta pergunta?') ){

        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

       }
       
    }   

    return(
        <div id= 'page-room'>

            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={ roomId }/>
                        <Button type="button" isOutlined onClick={() => handleDeleteRomm()} >Encerrar sala</Button>
                    </div>
                    
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length> 0 && <span>{questions.length} perguntas</span>}
                    
                </div>
                <div className="question-list">

                    { questions?.map((question) =>(
                        <Question 
                            key={question.id}
                            content = {question.content}
                            author = { question.author }>
                                <button
                                type= 'button'
                                onClick={(event) => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>

                        </Question>

                    ))}

                </div>
                

            </main>
        </div>
    )
} export default AdminRoom;