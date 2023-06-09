package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import dao.DiaryDao;
import model.DiaryWriter;
import model.Search;

@Service
public class GetAreaContentTotal {
	@Autowired DiaryDao getContent;
	@Autowired Gson totalAreaJson;
	public String getAreaContentTotal(Search searchParam) {
		List<DiaryWriter> totalArea = getContent.getTotalAreaContent(searchParam);
		String totalData = totalAreaJson.toJson(totalArea);
			
		return totalData;
	}

}
