package de.codeschluss.portal.core.common;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface FilteredJpaRepository<T, I>
    extends JpaRepository<T, I> {

  Optional<List<T>> findByIdIn(List<String> ids);

  Optional<List<T>> findFiltered(String filter, Sort sort);

  Optional<Page<T>> findFiltered(String filter, Pageable pageable);
}