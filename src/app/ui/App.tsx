import axios from "axios";
import { useEffect, type FC } from "react";

export const App: FC = () => {
    useEffect(() => {
        axios.get("/test");
        console.log(axios.defaults.baseURL);
    }, []);
    return <></>;
};

export default App;
