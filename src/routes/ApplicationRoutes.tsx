import {FirstPage, SecondPage} from '../pages';
import {Routes, Route} from "react-router-dom";

const ApplicationRoutes = () => {
  
  
  return (
    <Routes>
        <>
          <Route path="/" element={<FirstPage />} />
          <Route path="/second-page" element={<SecondPage />} />
          <Route path="*" element={<FirstPage />} />
        </>
    </Routes>
  )
}

export default ApplicationRoutes