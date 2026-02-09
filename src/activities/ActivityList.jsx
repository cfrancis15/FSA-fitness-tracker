import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";
import { useState } from "react";

export default function ActivityList({ activities, syncActivities }) {
  
  const {token} = useAuth()
  const [error,setError] = useState(null)

  const handleDelete = async(activityId)=>{
    try{
      setError(null)
      await deleteActivity(token, activityId)
      syncActivities()
    }catch (err){
      setError(err.message)
    }
  }

  

  return (
    <ul>
      {activities.map((activity) => (
        <><li key={activity.id}>{activity.name}</li>
        {token && <button onClick={()=>handleDelete(activity.id)}>Delete Listing</button>}
        </>
      ))}
    </ul>
  );
}
