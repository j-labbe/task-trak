import { useRouter } from "next/router"
import { useEffect } from "react"
import { useUser } from "@auth0/nextjs-auth0"

const Login = () => {
    const { user } = useUser();

    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/api/auth/login");
        }
    });

    return (<h1>Loading...</h1>);
};

export default Login;