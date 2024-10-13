import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../..";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { isAuthenticated } = useContext(Context);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/message/getall",
                    { withCredentials: true }
                );
                setMessages(data.messages);
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        fetchMessages();
    }, []);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <section className="page messages bg-gray-100">
            <h1 className="text-3xl text-center mt-8 mb-4">MESSAGE</h1>
            <div className="banner mx-auto max-w-xl">
                {messages && messages.length > 0 ? (
                    messages.map((element) => {
                        return (
                            <div className="card bg-white shadow-md rounded-md mb-4" key={element._id}>
                                <div className="details p-4">
                                    <p className="mb-2">
                                        <span className="font-semibold">First Name:</span> {element.name}
                                    </p>
                                    <p className="mb-2">
                                        <span className="font-semibold">Phone:</span> {element.phone}
                                    </p>
                                    <p className="mb-2">
                                        <span className="font-semibold">Message:</span> {element.message}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <h1 className="text-xl text-center">No Messages!</h1>
                )}
            </div>
        </section>
    );
};

export default Messages;
