import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { roomCreation } from '../firebase/auth';
import { Link } from 'react-router-dom';

function CreateRoom(props){
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setLoading] = useState(false);
    // const onSubmit = data => console.log(data);
    const onSubmit = async (data) => { 
        let newRoom;
        setLoading(true);
        try {
            newRoom = await roomCreation(data);
            reset();
        }catch(error){
            console.log(error);
        }
        if (newRoom){ props.history.push(`/Room/${newRoom.uid}`);} else { setLoading(false);}
        setLoading(false);
    }
    const formClassName = `ui form ${isLoading ? 'loading': ''}`;
    return (
        <div className="create-container">
            <div className="ui card create-card">
                <div className="content">
                    <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
                        <div className="field">
                            <label>
                                Id
                                <input placeholder="Room Id (min 3 char)" {...register("roomId", { required: true, minLength: 3 })}/>
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                Name
                                <input placeholder="Room Name" {...register("roomName")}/>
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                Number
                                <input placeholder="Room Number" {...register("roomNumber")}/>
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                Occupant
                                <input placeholder="Occupant" {...register("occupant")}/>
                            </label>
                        </div>
                        <div className="field actions">
                            <button className="ui primary button create" type="submit">
                                Create Room
                            </button>
                            or
                            <Link to="/getRoom">Edit Room</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );    
}
export default CreateRoom;