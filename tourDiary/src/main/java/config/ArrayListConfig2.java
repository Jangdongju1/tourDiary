package config;
import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ArrayListConfig2 {
	@Bean
	public ArrayList<Integer> key() {
		
		return new ArrayList<Integer>();
	}
}
