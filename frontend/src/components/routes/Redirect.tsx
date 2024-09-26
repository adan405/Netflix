import { Navigate } from "react-router-dom";

const Redirect: React.FC = () =>{
    const token = localStorage.getItem('jwtToken');

return token?<Navigate to='/home'/>:<Navigate to='/signup'/>
}

export default Redirect;