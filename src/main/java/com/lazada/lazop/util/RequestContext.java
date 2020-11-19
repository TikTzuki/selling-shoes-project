// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util;

import java.util.HashMap;
import java.util.Map;

public class RequestContext
{
    private String requestUrl;
    private String responseBody;
    private String apiName;
    private LazopHashMap commonParams;
    private LazopHashMap queryParams;
    
    public String getRequestUrl() {
        return this.requestUrl;
    }
    
    public void setRequestUrl(final String requestUrl) {
        this.requestUrl = requestUrl;
    }
    
    public String getResponseBody() {
        return this.responseBody;
    }
    
    public void setResponseBody(final String responseBody) {
        this.responseBody = responseBody;
    }
    
    public LazopHashMap getQueryParams() {
        return this.queryParams;
    }
    
    public void setQueryParams(final LazopHashMap queryParams) {
        this.queryParams = queryParams;
    }
    
    public String getApiName() {
        return this.apiName;
    }
    
    public void setApiName(final String apiName) {
        this.apiName = apiName;
    }
    
    public LazopHashMap getCommonParams() {
        return this.commonParams;
    }
    
    public void setCommonParams(final LazopHashMap commonParams) {
        this.commonParams = commonParams;
    }
    
    public Map<String, String> getAllParams() {
        final Map<String, String> params = new HashMap<String, String>();
        if (this.commonParams != null && !this.commonParams.isEmpty()) {
            params.putAll(this.commonParams);
        }
        if (this.queryParams != null && !this.queryParams.isEmpty()) {
            params.putAll(this.queryParams);
        }
        return params;
    }
}
