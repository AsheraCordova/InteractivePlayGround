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
