package fr.formation.SimpleDevsForum.Back.repositories;

import fr.formation.SimpleDevsForum.Back.entities.Dev;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DevRepo extends JpaRepository<Dev, Long> {

    Optional<Dev> findByNickname(String nickname);
}
