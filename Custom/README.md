# Custom

Ashera provides cross platform support using Java and typescript language while using cordova as its base. To develop features which run at native speed, the custom project provides a starting point for developing cross platform code using java.

The following functionality can be extended :
* Validation
* Method Expression Handler
* Widget
* Attribute for widget
* Converter
* Image loader

The custom plugin can be cloned and used as starting point for developing custom crossplatform code based on java.

To install the plugin use:

```
git clone https://github.com/AsheraCordova/Custom.git
cordova plugin add ./Custom
```

## Custom Validator

A example of custom validator is given below:
```
package com.ashera.custom;

import com.ashera.validations.BaseValidator;
import com.ashera.validations.Validation;
import com.ashera.widget.IWidget;

public class CustomValidator extends BaseValidator{

	@Override
	public Validation newInstance(String... argument) {
		return new CustomValidator();
	}

	@Override
	public String getDefaultErrorMessage(IWidget widget) {
		String res = com.ashera.utils.ResourceBundleUtils.getString("values/strings", "string", "@string/lowercase_error_message", widget.getFragment());
		return res;
	}

	@Override
	public boolean isValid(String str, IWidget widget) {
		if (str == null || str.trim().equals("")) {
			return true;
		}
		
		return str.toLowerCase().equals(str);
	}

}
```

Register the validator on load of the plugin:

```
ValidatorFactory.register("lowercaseonly", new CustomValidator());
```

Use this validator in ui:

```
<EditText
	android:id="@+id/validation0"
	android:layout_width="match_parent"
	android:layout_height="wrap_content"
	formGroupId="test"
	android:layout_margin="10dp"
	android:minHeight="50dp"
	android:background="#ff0"
	validation="lowercaseonly" />

```

## Custom Method Expression Handler

A example of custom expression handler is given below:

```
package com.ashera.custom;

import java.util.Map;

import com.ashera.model.MethodHandler;
import com.ashera.widget.IWidget;

public class CustomMethodHandler implements com.ashera.model.MethodHandler {

	@Override
	public String handle(String methodName, Object obj, IWidget widget) {
		switch (methodName) {
		case "pointsEarned":
			int points = 0;			
			if (obj instanceof Map) {
				Map<String, Object> map = (Map<String, Object>)obj;
				Integer quantity = 0; 
				try {
					quantity = com.ashera.widget.PluginInvoker.getInt(map.get("noOfItems"));
				} catch (NumberFormatException e) {
				}
				Integer tradePrice = 0;
				try {
					tradePrice = com.ashera.widget.PluginInvoker.getInt(map.get("tradePrice"));
				} catch (NumberFormatException e) {
				}
				Integer memberPrice = com.ashera.widget.PluginInvoker.getInt(map.get("memPrice"));
			
				if (quantity != null && tradePrice != null && memberPrice != null) {
					points = quantity * (tradePrice - memberPrice);
					if (points < 0) {
						points = 0;
					}
				}
			}
			

			return points + "";

		default:
			break;
		}
		return MethodHandler.UNHANDLED;
	}
}

```
Register the handler on load of the plugin:
```
MethodHandlerFactory.register(new CustomMethodHandler());
```

The custom expression can be used in ui as follows:
```
    <TextView
	style="@style/h1_bold_black"
	modelPojoToUi="text = pointsEarned(.) from item->view"
	android:layout_width="match_parent"
	android:layout_height="wrap_content"
	android:layout_marginBottom="10dp"></TextView>
```


