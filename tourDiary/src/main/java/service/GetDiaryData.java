package service;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.DiaryDao;
import model.Attraction;
import model.AttractionSelection;
import model.DiaryWriter;

@Service
public class GetDiaryData {
	@Autowired DiaryDao getTextData;
	@Autowired DiaryDao getUPloadData;
	@Autowired DiaryDao getAttracitonData;
	@Autowired DiaryDao increaseCount;
	
	// 게시물 데이터를 가져오는 부분.
	public void getDiaryData(int postNum, HttpServletRequest request) {
		List<DiaryWriter> textData = getTextData.getTextContent(postNum);
		List<AttractionSelection> uploadData = getUPloadData.getUploadContent(postNum);
		
		int [] attractionNum = new int[uploadData.size()];
		for(int i=0 ;i<uploadData.size(); i++) {
			attractionNum[i] = uploadData.get(i).getAttraction_Num();	
		}
		List<Attraction> attractionData = getAttracitonData.getAttractionContent(attractionNum);
		
		request.setAttribute("attractionData", attractionData);
		request.setAttribute("textData", textData);
		request.setAttribute("uploadData", uploadData);
		
	}
	
	// 조회수 증가 부분.
	public void increaseViewCount(int postNum, HttpServletRequest request, HttpServletResponse response) {
		
		Cookie [] cookies = request.getCookies();
		HttpSession usersession = request.getSession();
		String userId = (String)usersession.getAttribute("id");
		String cookieVal = Integer.toString(postNum);
		boolean isViewed = false;
		
		if(cookies != null) {
			for(Cookie cookie : cookies) {
				if(cookie.getName().equals(userId) && cookie.getValue().equals(cookieVal) ) {
					isViewed = true;
					break;
				}	
			}
		}
		
		try {
			if(!isViewed) { 
				increaseCount.increaseViewCount(postNum);
				Cookie viewCookies = new Cookie(userId, cookieVal);
				viewCookies.setMaxAge(60*60*24);
				response.addCookie(viewCookies);
			}	
			
		} catch (NullPointerException e) {
			// TODO: handle exception
		}
		
	
	}
}
