// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.api;

import java.io.Serializable;

public class LazopResponse implements Serializable
{
    private static final long serialVersionUID = 5014379068811962022L;
    private String type;
    private String code;
    private String message;
    private String requestId;
    private String body;
    
    public String getType() {
        return this.type;
    }
    
    public void setType(final String type) {
        this.type = type;
    }
    
    public String getCode() {
        return this.code;
    }
    
    public void setCode(final String code) {
        this.code = code;
    }
    
    public String getMessage() {
        return this.message;
    }
    
    public void setMessage(final String message) {
        this.message = message;
    }
    
    public String getRequestId() {
        return this.requestId;
    }
    
    public void setRequestId(final String requestId) {
        this.requestId = requestId;
    }
    
    public String getBody() {
        return this.body;
    }
    
    public void setBody(final String body) {
        this.body = body;
    }
    
    public boolean isSuccess() {
        return this.code == null || "0".equals(this.code);
    }
}
