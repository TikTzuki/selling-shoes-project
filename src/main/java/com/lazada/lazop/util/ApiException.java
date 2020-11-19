// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util;

public class ApiException extends Exception
{
    private static final long serialVersionUID = -238091758285157331L;
    private String errorCode;
    private String errorMessage;
    
    public ApiException() {
    }
    
    public ApiException(final String message, final Throwable cause) {
        super(message, cause);
    }
    
    public ApiException(final String message) {
        super(message);
    }
    
    public ApiException(final Throwable cause) {
        super(cause);
    }
    
    public ApiException(final String errorCode, final String errorMessage) {
        super(errorCode + ":" + errorMessage);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    
    public String getErrorCode() {
        return this.errorCode;
    }
    
    public String getErrorMessage() {
        return this.errorMessage;
    }
}
