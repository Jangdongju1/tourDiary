package config;

import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ArrayListConfig {
	@Bean
	public ArrayList<String> val() {
		
		return new ArrayList<String>();
	}
}
