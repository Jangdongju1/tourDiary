package service;

import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Service
public class RegDiary {
	public void insertDiary(HttpServletRequest request) {
		
		
		
		if(request instanceof MultipartHttpServletRequest) {
			System.out.println("멀티파트부분");
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
			MultiValueMap<String, MultipartFile> fileMap = multipartRequest.getMultiFileMap();
			
	
			for(String key : fileMap.keySet()) {
				List<MultipartFile> files = fileMap.get(key);
			}
			
			if(fileMap.isEmpty()) {
				Enumeration<String> paramaterNames = request.getParameterNames();
				
				while (paramaterNames.hasMoreElements()) {
					String key = (String) paramaterNames.nextElement();
					
					if(key.equals("contentTitle")) {
						// 작업.
					}
					
				}
				
			}
				
			
			
		}
		
	
		
	}

}
