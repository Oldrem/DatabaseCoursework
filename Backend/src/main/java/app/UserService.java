package app;

import app.model.UserData;
import app.repositories.UserDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserDataRepository repository;

    @Autowired
    public UserService(UserDataRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        UserData userData = this.repository.findByLogin(login);
        return new User(userData.getLogin(), userData.getPassword(),
                AuthorityUtils.createAuthorityList(userData.getRoles()));
    }

}
