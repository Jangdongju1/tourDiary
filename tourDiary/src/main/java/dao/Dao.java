package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import model.Attraction;
import model.AttractionSelection;
import model.DiaryWriter;

@Repository
public class Dao {
	@Autowired SqlSession sess;
	@Autowired SqlSession getMaxIndex;
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
	
	public void insertUserWrite(DiaryWriter textData) {
		sess.insert("insertTextData", textData);
	}
	
	public int getMaxIndex() {
		Integer result = getMaxIndex.selectOne("getMaxIndex");
		
		int maxIndex = result.intValue();
		
		return maxIndex;
	}
	
	public boolean insertUserUpload(List<AttractionSelection> uploadList) {
		boolean success = false; 
		int insertQuantity = sess.insert("insertUserUpload", uploadList);
		
		if(insertQuantity >0) {
			success = true;
		}
		
		return success;
	}

}
