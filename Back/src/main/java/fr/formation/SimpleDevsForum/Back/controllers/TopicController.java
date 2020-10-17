package fr.formation.SimpleDevsForum.Back.controllers;

import fr.formation.SimpleDevsForum.Back.dtos.ReplyCreateDto;
import fr.formation.SimpleDevsForum.Back.dtos.TopicCreateDto;
import fr.formation.SimpleDevsForum.Back.dtos.TopicDisplayDto;
import fr.formation.SimpleDevsForum.Back.services.TopicService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/topics")
public class TopicController {

    private final TopicService service;
    protected TopicController(TopicService service) {
        this.service = service;
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    protected void create(@Valid @RequestBody TopicCreateDto dto) {
        System.out.println(dto.toString());
        service.create(dto);
    }

    @PatchMapping(consumes = "application/json", produces = "application/json")
    protected void addReply(@Valid @RequestBody ReplyCreateDto dto) {
        System.out.println(dto.toString());
        service.addReply(dto);
    }

    @GetMapping(value = "/{postId}", consumes = "application/json", produces = "application/json")
    protected TopicDisplayDto getOne(@PathVariable("postId") String postId) {
        return service.getOne(postId);
    }

    @GetMapping
    protected Page<TopicDisplayDto> getAll(@RequestParam("p") int page, @RequestParam("s") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return service.getAll(pageable);
    }


}
