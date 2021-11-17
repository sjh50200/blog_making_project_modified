import React, { useEffect, useState } from 'react';
import "../css/Detail.scss";
import useDetail from '../hooks/useDetail';
import buttonImg from "../imgs/comment_delete.png";
import {saveComment, deleteComment} from "../util/Send";
import { countComment } from "../util/Number";

function Detail({ location }) {
    const page = location.state.info.id;
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useDetail({comments, setComments});

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const commentChange = (e) => {
        setComment(e.target.value);
    }

    return (
        <div className="post-detail">
            {/* 본문 */}
            <h1>{location.state.info.title}</h1>
            <hr />
            <p style={{marginTop: "3%", paddingBottom: "3%"}}>{location.state.info.content}</p>
            {/* 댓글 부분 */}
            <div style= {{marginTop: "7%"}}><strong>전체 댓글({countComment(page, comments)})</strong></div>
            <hr className= "comment-divide-line"/>
            <table className="comment-table">
            {
                comments.map(element => {
                    if(element.page === page) {
                        return (
                            <tr className="comment-tr">
                                <td>{element.name}</td>
                                <td>{element.comment}<button style={{float: "right"}} onClick= {() => {deleteComment(element, setComments)}}>
                                    <img src={buttonImg}/></button>
                                </td>
                            </tr>
                        );
                    }
                })
            }
            </table>
            {/* 댓글 작성 부분 */}
            <div className="comment-grid">
                <div className="temp">
                    <input className= "name-area" placeholder= "이름"
                    value={name} onChange={nameChange}/>
                </div>
                <div className= "temp">
                    <textarea className= "comment-area" placeholder= "내용을 입력하세요."
                    value={comment} onChange={commentChange}/>
                </div>
                <button className= "comment-button" onClick={() => {saveComment(page, name, comment, setName, setComment, setComments)}}>
                    쓰기
                </button>
            </div>
        </div>
    )
}

export default Detail;