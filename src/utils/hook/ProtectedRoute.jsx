import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../recoil/atom/userAtom";
import { UseLogin } from "./UseLogin";


export default function ProtectedRoute ({ children }) {
    const user = useRecoilValue(currentUserAtom);
    const [_, success] = UseLogin();
    
    if(!user.success) {
        console.log(user.success + 'not access')
        return <Navigate to='/'/>
    } else {
        console.log(user.success + 'access')
        return children
    }
}