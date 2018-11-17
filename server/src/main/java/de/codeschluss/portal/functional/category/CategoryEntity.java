package de.codeschluss.portal.functional.category;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.core.common.BaseEntity;
import de.codeschluss.portal.functional.activity.ActivityEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The persistent class for the categories database table.
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class CategoryEntity extends BaseEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private String color;

	@Lob
	@Column(columnDefinition = "TEXT")
	private String description;

	private String name;

	@OneToMany(mappedBy = "category")
	@JsonIgnore
	private List<ActivityEntity> activities;

}
