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