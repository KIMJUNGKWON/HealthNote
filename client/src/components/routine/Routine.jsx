import React, { useEffect, useContext } from 'react';
import MyTable from './MyTable';
import DropDown from './DropDown';
import { ExerciseContext }  from '../../contexts/exercise.context'

const Routine = () => {
  const { getExercises, exercises,  } = useContext(ExerciseContext);

  useEffect(() => {
    getExercises();
    // eslint-disable-next-line
  }, [])   

    return (
      <>
       {exercises !== null ? (
        <div style={{ textAlign: "center" }} >
          {exercises.map((cv, i) => (
            <DropDown key={i + "2"} exercises={ cv }/>
          ))}
          <MyTable />
        </div>
       ) : "로딩중"}
      </>
      )
    }
    

export default Routine;
