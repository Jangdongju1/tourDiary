package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import model.Attraction;

@Repository
public class Dao {
	@Autowired SqlSession sess;
	public List<Attraction> getCourse() {
		List<Attraction> data  = sess.selectList("getCourse");
		
		return data;
	}
	
	public List<Attraction> getSearchCourse(String keyword) {	
		List<Attraction> data = sess.selectList("getSearchCourse", keyword);
		
		return data;
	}
	
	public List<Attraction> getAttractionInfo(String query) {
		List<Attraction> data = sess.selectList("getAttractionInfo", query);
		
		return data;
	}

}
