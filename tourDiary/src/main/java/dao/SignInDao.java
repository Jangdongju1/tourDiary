package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import model.User;

@Repository
public class SignInDao {
	@Autowired SqlSession sess;
	public List<User> loginProcess(User userInfo) {
		List<User> loginData = sess.selectList("loginProcess", userInfo);
		
		return loginData;
	}

}
