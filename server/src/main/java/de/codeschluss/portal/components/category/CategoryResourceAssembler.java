package de.codeschluss.portal.components.category;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.core.api.PagingAndSortingAssembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

/**
 * The Class LanguageResourceAssembler.
 * 
 * @author Valmir Etemi
 * 
 */
@Service
public class CategoryResourceAssembler extends PagingAndSortingAssembler<CategoryEntity> {

  @Override
  protected List<Link> createResourceLinks(CategoryEntity category) {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(CategoryController.class)
        .readOne(category.getId())).withSelfRel());
    links.add(linkTo(methodOn(CategoryController.class)
        .readTranslations(category.getId())).withRel("translations"));

    return links;
  }
}