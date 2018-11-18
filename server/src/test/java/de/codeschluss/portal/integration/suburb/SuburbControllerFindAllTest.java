package de.codeschluss.portal.integration.suburb;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.core.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.suburb.SuburbController;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SuburbControllerFindAllTest {

  @Autowired
  private SuburbController controller;

  private FilterSortPaginate params = new FilterSortPaginate("suburb", 0, 5, "name", "asc");

  @Test
  public void findAllWithoutPaginationOk() {
    FilterSortPaginate params = new FilterSortPaginate(null, null, null, "name", "asc");

    Resources<?> result = (Resources<?>) controller.findAll(params).getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  public void findAllEmptyParamsOk() {
    FilterSortPaginate params = new FilterSortPaginate(null, null, null, null, null);

    Resources<?> result = (Resources<?>) controller.findAll(params).getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  public void findAllWithPaginationOk() {
    PagedResources<?> result = (PagedResources<?>) controller.findAll(params).getBody();
    assertThat(result.getContent()).isNotEmpty();
  }

  @Test(expected = InvalidDataAccessApiUsageException.class)
  public void findAllWrongParams() {
    FilterSortPaginate params = new FilterSortPaginate("suburb", 1, 5, "blablabla123", "wrong");
    controller.findAll(params);
  }
}