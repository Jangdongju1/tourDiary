package dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import model.User;

@Repository
public class SignUpDao {
	@Autowired SqlSession sess;
	
	public boolean idCheck(User userId) {
		boolean success = false;
		int result = sess.selectOne("idCheck", userId);
		
		if(result == 0) {
			success = true;
		}
		
		return success;
	}
	
	public boolean nickNameCheck(User userNick) {
		boolean success = false;
		int result  = sess.selectOne("nickNameCheck", userNick);
		
		if(result == 0) {
			success = true;
		}
		
		return success;
	}
	
	public boolean signUp(User userData) {
		boolean success = false;
		int result = sess.insert("insertUserData", userData);
		
		if(result > 0) {
			success = true;
		}
		
		return success;
	}

}
