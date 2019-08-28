import React from 'react';
import DashBoard from './components/dashBoard/DashBoard';
import { ExerciseProvider } from './contexts/exercise.context';
import { MembersProvider } from './contexts/members.context';
import { ScheduleProvider } from './contexts/schedule.context';
import { AuthProvider } from './contexts/auth.context';

import './App.css';

function App () {
    return (
      <>
      <AuthProvider>
        <ScheduleProvider>
          <MembersProvider>
            <ExerciseProvider >
                <DashBoard />
            </ExerciseProvider>
          </MembersProvider>
        </ScheduleProvider>
      </AuthProvider>
      </>
    );  
}
export default App;
