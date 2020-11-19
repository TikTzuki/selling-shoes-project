// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.api;

import java.util.HashMap;
import com.lazada.lazop.util.FileItem;
import java.util.Map;
import com.lazada.lazop.util.LazopHashMap;

public class LazopRequest
{
    protected LazopHashMap apiParams;
    protected LazopHashMap headerParams;
    protected Map<String, FileItem> fileParams;
    private Long timestamp;
    private String apiName;
    private String httpMethod;
    
    public LazopRequest() {
        this.httpMethod = "POST";
    }
    
    public LazopRequest(final String apiName) {
        this.httpMethod = "POST";
        this.apiName = apiName;
    }
    
    public void addApiParameter(final String key, final String value) {
        if (this.apiParams == null) {
            this.apiParams = new LazopHashMap();
        }
        this.apiParams.put(key, value);
    }
    
    public void addFileParameter(final String key, final FileItem file) {
        if (this.fileParams == null) {
            this.fileParams = new HashMap<String, FileItem>();
        }
        this.fileParams.put(key, file);
    }
    
    public void addHeaderParameter(final String key, final String value) {
        if (this.headerParams == null) {
            this.headerParams = new LazopHashMap();
        }
        this.headerParams.put(key, value);
    }
    
    public LazopHashMap getApiParams() {
        return this.apiParams;
    }
    
    public Map<String, FileItem> getFileParams() {
        return this.fileParams;
    }
    
    public Map<String, String> getHeaderParams() {
        return this.headerParams;
    }
    
    public Long getTimestamp() {
        return this.timestamp;
    }
    
    public void setTimestamp(final Long timestamp) {
        this.timestamp = timestamp;
    }
    
    public String getApiName() {
        return this.apiName;
    }
    
    public void setApiName(final String apiName) {
        this.apiName = apiName;
    }
    
    public String getHttpMethod() {
        return this.httpMethod;
    }
    
    public void setHttpMethod(final String httpMethod) {
        this.httpMethod = httpMethod;
    }
    
    public void setHeaderParams(final LazopHashMap headerParams) {
        this.headerParams = headerParams;
    }
}
