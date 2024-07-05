import React, {lazy} from 'react'
const TasksTab = lazy(() => import("../prospect/TasksTab"));
function page() {
  return (
    <TasksTab prospectId="general"/>
  )
}

export default page