package com.blog.backend.Controller;

import com.blog.backend.Document.Comments;
import com.blog.backend.Document.Posts;
import com.blog.backend.MongoRepository.CommentRepository;
import com.blog.backend.MongoRepository.PostRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ReactController {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;

    @RequestMapping(path = "/posting", method = RequestMethod.POST)
    public ResponseEntity<?> savePost(@RequestBody postDTO data) {
        System.out.println("글 저장");
        int number = postRepository.findAll().size();
        Posts post = new Posts(Integer.toString(number+1), data.getTitle(), data.getContent());
        postRepository.save(post);
        return ResponseEntity.ok(postRepository.findAll(Sort.by(Sort.Direction.DESC, "id")));
    }

    @RequestMapping(path = "/posting", method = RequestMethod.PUT)
    public ResponseEntity<?> updatePost(@RequestBody postDTO data) {
        Posts post = postRepository.findById(data.getId()).get();
        post.setTitle(data.getTitle());
        post.setContent(data.getContent());
        postRepository.save(post);

        return ResponseEntity.ok(postRepository.findAll(Sort.by(Sort.Direction.DESC, "id")));
    }

    @RequestMapping(path = "/posting/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deletePost(@PathVariable String id) {
        int from = Integer.parseInt(id) + 1;
        int to = postRepository.findAll().size();
        postRepository.deleteById(id);
        for(int i = from; i <= to; i++) {
            Posts temp = postRepository.findById(Integer.toString(i)).get();
            temp.setId(Integer.toString(i-1));
            postRepository.save(temp);
            postRepository.deleteById(Integer.toString(i));
        }
        List<Comments> commentList = commentRepository.findAll();
        int page = Integer.parseInt(id);
        commentList.forEach(comment -> {
            int commentPage = Integer.parseInt(comment.getPage());
            if(commentPage > page) {
                //페이지번호 당기기
                comment.setPage(Integer.toString(commentPage-1));
                commentRepository.save(comment);
            }
            else if(commentPage == page) commentRepository.delete(comment);

            else return;
        });

        return ResponseEntity.ok(postRepository.findAll(Sort.by(Sort.Direction.DESC, "id")));
    }

    @RequestMapping(path = "/postings", method = RequestMethod.GET)
    public ResponseEntity<?> getPosts() {
        System.out.println("전체 글 가져오기");
        return ResponseEntity.ok(postRepository.findAll(Sort.by(Sort.Direction.DESC, "id")));
    }

    @RequestMapping(path = "/comments", method = RequestMethod.GET)
    public ResponseEntity<?> getComments() {
        System.out.println("전체 코멘트 가져오기");
        return ResponseEntity.ok(commentRepository.findAll(Sort.by(Sort.Direction.DESC, "id")));
    }

    @RequestMapping(path = "/comment", method = RequestMethod.POST)
    public ResponseEntity<?> saveComment(@RequestBody commentDTO data) {
        int id2 = 0;
        if(commentRepository.findAll(Sort.by(Sort.Direction.DESC, "id")).size() != 0)
                id2 = Integer.parseInt(commentRepository.findAll(Sort.by(Sort.Direction.DESC, "id")).get(0).getId());
        String id = Integer.toString(id2 + 1);
        Comments comment = new Comments(id, data.getPage(), data.getName(), data.getComment());
        commentRepository.save(comment);
        return ResponseEntity.ok(id);
    }

    @RequestMapping(path = "/comment/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteComment(@PathVariable String id) {
        commentRepository.deleteById(id);
        return ResponseEntity.ok(commentRepository.findAll(Sort.by(Sort.Direction.DESC, "id")));
    }

    @Getter
    @Setter
    private static class commentDTO {
        private String page;
        private String name;
        private String comment;
    }

    @Getter
    @Setter
    private static class commentIdDTO {
        private String id;
        private String page;
        private String name;
        private String comment;
    }

    @Getter
    @Setter
    private static class postDTO {
        private String id;
        private String title;
        private String content;
    }
}
