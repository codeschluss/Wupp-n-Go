package de.codeschluss.portal.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.base.DataService;
import de.codeschluss.portal.exception.NotFoundException;

@Service
public class UserService extends DataService<UserEntity> {
	
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public UserService(
			UserRepository repo,
			UserResourceAssembler assembler,
			BCryptPasswordEncoder encoder) {
		super(repo, assembler);
		this.bCryptPasswordEncoder = encoder;
	}
	
	public UserEntity add(UserEntity newUser) {
		newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
		return getRepo().save(newUser);
	}
	
	public UserEntity update(String id, UserEntity newUser) {
		return getRepo().findById(id).map(user -> {
			user.setUsername(newUser.getUsername());
			user.setFullname(newUser.getFullname());
			user.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			user.setPhone(newUser.getPhone());
			return getRepo().save(user);
		}).orElseGet(() -> {
			newUser.setId(id);
			return getRepo().save(newUser);
		});
	}
	
	public UserEntity getUser(String username) {
		return getRepo().findByUsername(username).orElseThrow(() -> new NotFoundException(username));
	}

	public void grantSuperUser(String id, boolean isSuperuser) {
		UserEntity user = getRepo().findById(id).orElseThrow(() -> new NotFoundException(id));
		user.setSuperuser(isSuperuser);
		getRepo().save(user);
	}

	public boolean userExists(String username) {
		return getRepo().existsByUsername(username);
	}
	
	public UserRepository getRepo() {
		if (repo instanceof UserRepository) {
			return (UserRepository) repo;
		} else {
			throw new RuntimeException("repository is type of " + repo.getClass().getName() + " instead of " + UserRepository.class.getName());
		}
	}
}
