package model;

public class Attraction {
	
	private String attraction_name;
	private String attraction_addr;
	private String site_1;
	private String site_2;
	private String attraction_detail;
	private String attraction_pic;
	private double latitude;
	private double longitude;
	
	
	private int attraction_num;
	public String getAttraction_name() {
		return attraction_name;
	}
	public void setAttraction_name(String attraction_name) {
		this.attraction_name = attraction_name;
	}
	public String getAttraction_addr() {
		return attraction_addr;
	}
	public void setAttraction_addr(String attraction_addr) {
		this.attraction_addr = attraction_addr;
	}

	public String getAttraction_detail() {
		return attraction_detail;
	}
	public String getSite_1() {
		return site_1;
	}
	public void setSite_1(String site_1) {
		this.site_1 = site_1;
	}
	public String getSite_2() {
		return site_2;
	}
	public void setSite_2(String site_2) {
		this.site_2 = site_2;
	}
	public void setAttraction_detail(String attraction_detail) {
		this.attraction_detail = attraction_detail;
	}
	public String getAttraction_pic() {
		return attraction_pic;
	}
	public void setAttraction_pic(String attraction_pic) {
		this.attraction_pic = attraction_pic;
	}
	
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public int getAttraction_num() {
		return attraction_num;
	}
	public void setAttraction_num(int attraction_num) {
		this.attraction_num = attraction_num;
	}
	
	

}
