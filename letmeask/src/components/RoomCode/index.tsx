import copyImg from '../../assets/images/copy.svg';
import './styles.scss';

type RoomCodeProps = {
    code: string;
}

function RoomCode(props: RoomCodeProps){

    function copyRoomCodeToClipBoard( ){
        navigator.clipboard.writeText(props.code);
    }

    return(
        <button className="room-code" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={copyImg} alt="copy room code" />
            </div>
            <span>{props.code}</span>
        </button>
    )
}; export default RoomCode;