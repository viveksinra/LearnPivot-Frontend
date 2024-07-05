import React, {lazy} from 'react'
const NotesTab = lazy(() => import("../prospect/NotesTab"));
function page() {
  return (
    <NotesTab prospectId="general"/>
  )
}

export default page