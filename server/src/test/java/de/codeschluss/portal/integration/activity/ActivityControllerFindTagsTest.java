package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.functional.activity.ActivityController;
import de.codeschluss.portal.functional.tag.TagEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerFindTagsTest {

	@Autowired
	private ActivityController controller;
	
	@Test
	@SuppressWarnings("unchecked")
	public void findTagsOK() {
		String activityId = "00000000-0000-0000-0010-100000000000";
		
		Resources<Resource<TagEntity>> result = (Resources<Resource<TagEntity>>) controller.findTags(activityId).getBody();
		
		assertThat(result.getContent()).isNotNull();
	}
	
	@Test(expected = NotFoundException.class)
	public void findTagNotFound() {
		String activityId = "00000000-0000-0000-0010-XX0000000000";
		
		controller.findTags(activityId);
	}
}
