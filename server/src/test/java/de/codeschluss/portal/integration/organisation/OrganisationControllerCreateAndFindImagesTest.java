package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.image.ImageService;

import java.io.IOException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.hateoas.Resources;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrganisationControllerCreateAndFindImagesTest {

  @Autowired
  private OrganisationController controller;

  @MockBean
  private ImageService imageService;

  @Test
  @WithUserDetails("super@user")
  public void addAndFindImagesSuperUserOk() throws IOException {
    given(this.imageService.resize(Mockito.any())).willReturn("test".getBytes());
    MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt",
        "text/plain", "test".getBytes());
    controller.addImage("00000000-0000-0000-0008-100000000000", "test", multipartFile);
    
    Resources<?> result = (Resources<?>) controller
        .readImages("00000000-0000-0000-0008-100000000000").getBody();

    assertThat(result.getContent()).isNotEmpty();
  }
  
  @Test
  @WithUserDetails("admin@user")
  public void addAndFindImagesOwnOrgaOk() throws IOException {
    given(this.imageService.resize(Mockito.any())).willReturn("test".getBytes());
    MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt",
        "text/plain", "test".getBytes());
    controller.addImage("00000000-0000-0000-0008-100000000000", "test", multipartFile);
    
    Resources<?> result = (Resources<?>) controller
        .readImages("00000000-0000-0000-0008-100000000000").getBody();

    assertThat(result.getContent()).isNotEmpty();
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("admin@user")
  public void addNotValidDenied() throws IOException {
    given(this.imageService.resize(Mockito.any())).willReturn(null);
    byte[] content = null;
    MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt",
        "text/plain", content);
    controller.addImage("00000000-0000-0000-0008-100000000000", "test", multipartFile);
  }
  
  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void addAndFindImagesOtherOrgaDenied() throws IOException {
    MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt",
        "text/plain", "test".getBytes());
    controller.addImage("00000000-0000-0000-0008-100000000000", "test", multipartFile);
  }
  
  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addAndFindImagesNotRegisteredDenied() throws IOException {
    MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt",
        "text/plain", "test".getBytes());
    controller.addImage("00000000-0000-0000-0008-100000000000", "test", multipartFile);
  }

  @Test(expected = NotFoundException.class)
  public void findImagesByOrganisationNotFound() {
    Resources<?> result = (Resources<?>) controller
        .readImages("00000000-0000-0000-0008-XX0000000000").getBody();

    assertThat(result.getContent()).isNotEmpty();
  }
}