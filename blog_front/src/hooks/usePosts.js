import { useEffect } from "react";
import axios from "axios";

export default function usePosts({ posts, setPosts }) {
    useEffect(() => { //초기 렌더링
        axios
            .get('http://localhost:8080/postings')
            .then(({data}) => {
                setPosts(data);
            });
    }, []);

    useEffect(() => { //posts 모니터링
        console.log(posts);
    }, [posts]);
}