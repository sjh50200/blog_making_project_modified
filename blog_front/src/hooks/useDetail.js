import { useEffect } from "react";
import axios from "axios";

export default function useDetail({ comments, setComments }) {
    useEffect(() => { //초기 렌더링 후
        axios.get("http://localhost:8080/comments")
        .then(({data}) => setComments(data));
    }, []);

    useEffect(() => {
        console.log(comments);
    }, [comments])
}