import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { getRoom } from '../firebase/auth';
import { Link } from 'react-router-dom';

function CreateRoom(props){
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setLoading] = useState(false);
    // const onSubmit = data => console.log(data);
    const onSubmit = async (data) => { 
        let room;
        setLoading(true);
        try {
            room = await getRoom(data);
            reset();
        }catch(error){
            console.log(error);
        }
        if (room){ props.history.push(`/Room/${room.uid}`);} else { setLoading(false);}
        setLoading(false);
    }
    const formClassName = `ui form ${isLoading ? 'loading': ''}`;
    return (
        <div className="create-container">
            <div className="ui card create-card">
                <div className="content">
                    <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
                    {/* <form className="ui form"> */}
                        <div className="two fields">
                            <div className="field">
                                <label>
                                    Id
                                    <input placeholder="Room Id" {...register("roomId", { required: true, minLength: 3 })}/>
                                </label>
                            </div>
                            <div className="field actions">
                                <button className="ui primary button create" type="submit">
                                    Get Room
                                </button>
                                or
                                <Link to="/createRoom">Create Room</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );    
}
export default CreateRoom;