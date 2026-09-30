import { useState, type FC } from "react";
import { useLogin } from "src/features/login";

export const LoginPage: FC = () => {
    const [idInstance, setIdInstance] = useState("");
    const [apiTokenInstance, setApiTokenInstance] = useState("");

    const login = useLogin();

    return (
        <div>
            <form>
                <label>
                    ID Instance
                    <input name="idInstance" value={idInstance} onChange={(e) => setIdInstance(e.target.value)} />
                </label>
                <label>
                    API Token
                    <input
                        name="apiTokenInstance"
                        value={apiTokenInstance}
                        onChange={(e) => setApiTokenInstance(e.target.value)}
                    />
                </label>
                <button
                    type="button"
                    onClick={() => {
                        if (idInstance && apiTokenInstance) {
                            login({ apiTokenInstance, idInstance });
                        }
                    }}
                >
                    login
                </button>
            </form>
        </div>
    );
};
