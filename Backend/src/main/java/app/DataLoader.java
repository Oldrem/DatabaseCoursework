package app;

import app.model.UserData;
import app.repositories.UserDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserDataRepository users;

    @Autowired
    public DataLoader(UserDataRepository userDataRepository) {

        this.users = userDataRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
    /*
        UserData greg = this.users.save(new UserData("oleg", "gelo",
                "ROLE_MANAGER"));
        UserData oliver = this.users.save(new UserData("123", "123",
                "ROLE_MANAGER"));

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("oleg", "doesn't matter",
                        AuthorityUtils.createAuthorityList("ROLE_MANAGER")));


        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("oliver", "doesn't matter",
                        AuthorityUtils.createAuthorityList("ROLE_MANAGER")));


        SecurityContextHolder.clearContext();
     */
    }
}
