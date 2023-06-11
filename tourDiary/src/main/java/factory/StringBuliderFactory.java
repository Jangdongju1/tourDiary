package factory;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@Component
@ComponentScan("factory")
public class StringBuliderFactory {
	// 동적으로 객체를 주입하기 위한 클래스 .
	public StringBuilder stringBuilderFactory() {
		return new StringBuilder();
	}
}
