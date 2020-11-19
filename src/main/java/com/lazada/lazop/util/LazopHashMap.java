// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util;

import java.util.Date;
import java.util.Map;
import java.util.HashMap;

public class LazopHashMap extends HashMap<String, String>
{
    private static final long serialVersionUID = -1277791390393392630L;
    
    public LazopHashMap() {
    }
    
    public LazopHashMap(final Map<? extends String, ? extends String> m) {
        super(m);
    }
    
    public String put(final String key, final Object value) {
        String strValue;
        if (value == null) {
            strValue = null;
        }
        else if (value instanceof String) {
            strValue = (String)value;
        }
        else if (value instanceof Integer) {
            strValue = ((Integer)value).toString();
        }
        else if (value instanceof Long) {
            strValue = ((Long)value).toString();
        }
        else if (value instanceof Float) {
            strValue = ((Float)value).toString();
        }
        else if (value instanceof Double) {
            strValue = ((Double)value).toString();
        }
        else if (value instanceof Boolean) {
            strValue = ((Boolean)value).toString();
        }
        else if (value instanceof Date) {
            strValue = String.valueOf(((Date)value).getTime());
        }
        else {
            strValue = value.toString();
        }
        return this.put(key, strValue);
    }
    
    @Override
    public String put(final String key, final String value) {
        if (LazopUtils.areNotEmpty(key, value)) {
            return super.put(key, value);
        }
        return null;
    }
}
