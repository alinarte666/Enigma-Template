import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../recoil/atom/userAtom";


export default function ProtectedRoute ({ children }) {
    const user = useRecoilValue(currentUserAtom);
    
    if(user == '') {
        
        return <Navigate to='/'/>
    } else {
        return children
    }
}