import axios from "axios";

export function doDelete({posts, setPosts, id}) {
    //삭제 통신만 하고 setpost에서 찾아 삭제 후 렌더링
    if(window.confirm("정말 삭제하시겠습니까?")) {
        axios.delete(`http://localhost:8080/posting/${id}`)
        .then(alert("삭제 되었습니다."))
        .then(() => {
            const newPosts = posts.splice(id, 1);
            console.log(newPosts);
            setPosts(newPosts);
        });
    }
}