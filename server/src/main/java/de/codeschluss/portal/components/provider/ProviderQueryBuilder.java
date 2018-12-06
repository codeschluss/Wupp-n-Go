package de.codeschluss.portal.components.provider;

import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.common.QueryBuilder;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import java.util.List;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class ProviderQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class ProviderQueryBuilder extends QueryBuilder<QProviderEntity> {
  
  /**
   * Instantiates a new provider query builder.
   */
  public ProviderQueryBuilder() {
    super(QProviderEntity.providerEntity);
  }

  /**
   * With user id and any of orga ids.
   *
   * @param userId the user id
   * @param orgaIds the orga ids
   * @return the boolean expression
   */
  public BooleanExpression withUserIdAndAnyOfOrgaIds(String userId, List<String> orgaIds) {
    return withUserId(userId).and(query.organisation.id.in(orgaIds));
  }
  
  /**
   * With user id and orga id.
   *
   * @param userId the user id
   * @param orgaId the orga id
   * @return the boolean expression
   */
  public BooleanExpression withUserIdAndOrgaId(String userId, String orgaId) {
    return withUserId(userId).and(withOrgaId(orgaId));
  }

  /**
   * With approved user id.
   *
   * @param userId the user id
   * @return the boolean expression
   */
  public BooleanExpression withApprovedUserId(String userId) {
    return withUserId(userId).and(query.approved.isTrue());
  }
  
  /**
   * As orga admins.
   *
   * @param userId the user id
   * @return the boolean expression
   */
  public BooleanExpression asOrgaAdmins(String userId) {
    return withUserId(userId).and(admin());
  }
  
  /**
   * Adminsfor orga.
   *
   * @param orgaId the orga id
   * @return the boolean expression
   */
  public BooleanExpression adminsforOrga(String orgaId) {
    return query.organisation.id.eq(orgaId).and(admin());
  }
  
  /**
   * Admin.
   *
   * @return the boolean expression
   */
  public BooleanExpression admin() {
    return query.admin.isTrue();
  }

  /**
   * With user id.
   *
   * @param userId the user id
   * @return the boolean expression
   */
  public BooleanExpression withUserId(String userId) {
    return query.user.id.eq(userId);
  }
  
  /**
   * With orga id.
   *
   * @param orgaId the orga id
   * @return the boolean expression
   */
  public BooleanExpression withOrgaId(String orgaId) {
    return query.organisation.id.eq(orgaId);
  }

  /**
   * With any activity id.
   *
   * @param activityId the activity id
   * @return the boolean expression
   */
  public BooleanExpression withAnyActivityId(String activityId) {
    return query.activities.any().id.eq(activityId);
  }

  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common.QueryBuilder#fuzzySearch(java.lang.String)
   */
  @Override
  public BooleanExpression search(FilterSortPaginate params) {
    String filter = prepareFilter(params.getFilter());
    return query.activities.any().translatables.any().name.likeIgnoreCase(filter)
        .or(query.organisation.name.likeIgnoreCase(filter))
        .or(query.user.username.likeIgnoreCase(filter));
  }
}
