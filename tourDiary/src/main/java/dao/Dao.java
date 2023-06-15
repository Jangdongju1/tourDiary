package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import model.Attraction;
import model.AttractionSelection;
import model.DiaryWriter;
import model.Search;

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
	
	public List<DiaryWriter> getTextContent(int postNum) {
		List<DiaryWriter> textData = sess.selectList("getTextData", postNum);
		
		return textData;
	}
	
	public List<AttractionSelection> getUploadContent(int post_Num) {
		List<AttractionSelection> uploadData = sess.selectList("getUploadData", post_Num);
		
		return uploadData;
	}
	
	public List<Attraction> getAttractionContent(int[] attractionNum) {
		List<Attraction> attractionData = sess.selectList("getAttractionData", attractionNum);
		
		return attractionData;
	}
	
	public List<DiaryWriter> getInitContent() {
		List<DiaryWriter> data = sess.selectList("getInitContent");
		
		return data;
	}
	
	public List<DiaryWriter> getTotalAreaContent(Search searchParam) {
		List<DiaryWriter> data = sess.selectList("getTotalAreaContent", searchParam);
		
		return data;
	}
	
	public List<DiaryWriter> getAreaContent(Search searchParam) {
		List<DiaryWriter> data = sess.selectList("getAreaContent", searchParam);
		
		return data;
	}
	public List<DiaryWriter> getSearchContent(Search searchParam) {
		String xmlId ="";
		if(searchParam.getArea().equals("total")) {
			xmlId = "getKeywordSearchContent";
		}else {
			xmlId = "getKeywordSearchAreaContent";
		}
		List<DiaryWriter> data = sess.selectList(xmlId, searchParam);
		
		return data; 
	}
}
