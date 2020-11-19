// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util.json;

public class JSONValidatingReader extends JSONReader
{
    public static final Object INVALID;
    private JSONValidator validator;
    
    public JSONValidatingReader(final JSONValidator validator) {
        this.validator = validator;
    }
    
    public JSONValidatingReader(final JSONErrorListener listener) {
        this(new JSONValidator(listener));
    }
    
    public JSONValidatingReader() {
        this(new StdoutStreamErrorListener());
    }
    
    @Override
    public Object read(final String string) {
        if (!this.validator.validate(string)) {
            return JSONValidatingReader.INVALID;
        }
        return super.read(string);
    }
    
    static {
        INVALID = new Object();
    }
}
