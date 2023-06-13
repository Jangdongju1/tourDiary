package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import dao.Dao;
import model.DiaryWriter;
import model.Search;

@Service
public class GETAreaContentTotal {
	@Autowired Dao getContent;
	@Autowired Gson totalAreaJson;
	public String getAreaContentTotal(Search serchParam) {
		int start = (serchParam.getPage()-1)*16; 
		serchParam.setPage(start);
		List<DiaryWriter> totalArea = getContent.getTotalAreaContent(serchParam);
		String jsonData = totalAreaJson.toJson(totalArea);
		
		return jsonData;
	}

}
