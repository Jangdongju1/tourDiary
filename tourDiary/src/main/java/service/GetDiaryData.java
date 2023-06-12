package service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.Dao;
import model.Attraction;
import model.AttractionSelection;
import model.DiaryWriter;

@Service
public class GetDiaryData {
	@Autowired Dao getTextData;
	@Autowired Dao getUPloadData;
	@Autowired Dao getAttracitonData;	
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

}
