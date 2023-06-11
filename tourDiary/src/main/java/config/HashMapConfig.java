package config;

import java.util.HashMap;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class HashMapConfig {
	@Bean
	public HashMap<String, String> hashMap() {
		
		return new HashMap<String, String>();
	}

}
