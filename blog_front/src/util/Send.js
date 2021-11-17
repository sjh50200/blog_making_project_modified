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

export function saveComment(page, name, comment, setName, setComment, setComments) { //저장 후 value 초기화
    if(window.confirm("댓글을 등록하시겠습니까?")) {
        if(name.length !== 0) {
            let commentDto = {page: page, name: name, comment: comment};
            axios.post("http://localhost:8080/comment", commentDto)
            .then(alert("등록이 완료되었습니다."))
            .then(({data}) => {
                commentDto = {id: data, ...commentDto};
                setComments(prev => [commentDto, ...prev]);
            });
        }
        else alert("이름을 입력하세요.");
    }
    setName("");
    setComment("");
}

export function deleteComment(element, setComments) {
    if(window.confirm("댓글을 삭제하시겠습니까?")) {
        axios.delete(`http://localhost:8080/comment/${element.id}`)
        .then(alert("삭제되었습니다."))
        .then(({data}) => {
            setComments(data);
        });
    }
}