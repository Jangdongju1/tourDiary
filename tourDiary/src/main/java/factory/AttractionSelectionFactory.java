package factory;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

import model.AttractionSelection;

@Component
@ComponentScan("factory")
public class AttractionSelectionFactory {
	
	public AttractionSelection attractionSelcetionFactory() {
		
		return new AttractionSelection();
	}

}
