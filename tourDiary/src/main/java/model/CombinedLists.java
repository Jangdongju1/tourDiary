package model;

import java.util.List;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@Component
@ComponentScan("model")
public class CombinedLists {
	private List<Attraction> list1;
	private List<DiaryWriter> list2;

	public List<Attraction> getList1() {
		return list1;
	}
	public void setList1(List<Attraction> list1) {
		this.list1 = list1;
	}
	public List<DiaryWriter> getList2() {
		return list2;
	}
	public void setList2(List<DiaryWriter> list2) {
		this.list2 = list2;
	}	
	
}
