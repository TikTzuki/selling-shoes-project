// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.api;

import com.lazada.lazop.util.json.JSONReader;
import com.lazada.lazop.util.json.JSONValidatingReader;
import java.io.IOException;
import com.lazada.lazop.util.LazopLogger;
import com.lazada.lazop.util.WebUtils;
import com.lazada.lazop.util.LazopUtils;
import java.util.Date;
import java.util.Map;
import com.lazada.lazop.util.LazopHashMap;
import java.util.HashMap;
import com.lazada.lazop.util.RequestContext;
import com.lazada.lazop.util.ApiException;
import java.net.Proxy;

public class LazopClient implements ILazopClient
{
    protected String serverUrl;
    protected String appKey;
    protected String appSecret;
    protected String signMethod;
    protected int connectTimeout;
    protected int readTimeout;
    protected boolean useGzipEncoding;
    protected Proxy proxy;
    protected String sdkVersion;
    protected String logLevel;
    
    public LazopClient(final String serverUrl, final String appKey, final String appSecret) {
        this.signMethod = "sha256";
        this.connectTimeout = 15000;
        this.readTimeout = 30000;
        this.useGzipEncoding = true;
        this.sdkVersion = "lazop-sdk-java-20181207";
        this.logLevel = "ERROR";
        this.appKey = appKey;
        this.appSecret = appSecret;
        this.serverUrl = serverUrl;
    }
    
    public LazopClient(final String serverUrl, final String appKey, final String appSecret, final int connectTimeout, final int readTimeout) {
        this(serverUrl, appKey, appSecret);
        this.connectTimeout = connectTimeout;
        this.readTimeout = readTimeout;
    }
    
    @Override
    public LazopResponse execute(final LazopRequest request) throws ApiException {
        return this.execute(request, null);
    }
    
    @Override
    public LazopResponse execute(final LazopRequest request, final String accessToken) throws ApiException {
        return this.doExecute(request, accessToken);
    }
    
    private LazopResponse doExecute(final LazopRequest request, final String accessToken) throws ApiException {
        final long start = System.currentTimeMillis();
        final RequestContext requestContext = new RequestContext();
        final LazopHashMap bizParams = new LazopHashMap((request.getApiParams() != null) ? request.getApiParams() : new HashMap<String, String>());
        requestContext.setQueryParams(bizParams);
        requestContext.setApiName(request.getApiName());
        final LazopHashMap commonParams = new LazopHashMap();
        commonParams.put("app_key", this.appKey);
        Long timestamp = request.getTimestamp();
        if (timestamp == null) {
            timestamp = System.currentTimeMillis();
        }
        commonParams.put("timestamp", new Date(timestamp));
        commonParams.put("sign_method", this.signMethod);
        commonParams.put("access_token", accessToken);
        commonParams.put("partner_id", this.sdkVersion);
        if (this.isDebugEnabled()) {
            commonParams.put("debug", true);
        }
        requestContext.setCommonParams(commonParams);
        try {
            commonParams.put("sign", LazopUtils.signApiRequest(requestContext, this.appSecret, this.signMethod));
            final String rpcUrl = WebUtils.buildRestUrl(this.serverUrl, request.getApiName());
            final String urlQuery = WebUtils.buildQuery(requestContext.getCommonParams(), "UTF-8");
            final String fullUrl = WebUtils.buildRequestUrl(rpcUrl, urlQuery);
            String rsp = null;
            if (this.useGzipEncoding) {
                request.addHeaderParameter("Accept-Encoding", "gzip");
            }
            if (request.getFileParams() != null) {
                rsp = WebUtils.doPost(fullUrl, bizParams, request.getFileParams(), request.getHeaderParams(), "UTF-8", this.connectTimeout, this.readTimeout);
            }
            else if (request.getHttpMethod().equals("POST")) {
                rsp = WebUtils.doPost(fullUrl, bizParams, request.getHeaderParams(), "UTF-8", this.connectTimeout, this.readTimeout, this.proxy);
            }
            else {
                rsp = WebUtils.doGet(fullUrl, bizParams, request.getHeaderParams(), this.connectTimeout, this.readTimeout, "UTF-8", this.proxy);
            }
            requestContext.setResponseBody(rsp);
        }
        catch (IOException e) {
            LazopLogger.write(this.appKey, this.sdkVersion, request.getApiName(), this.serverUrl, requestContext.getAllParams(), System.currentTimeMillis() - start, e.toString());
            throw new ApiException(e);
        }
        catch (Exception e2) {
            LazopLogger.write(this.appKey, this.sdkVersion, request.getApiName(), this.serverUrl, requestContext.getAllParams(), System.currentTimeMillis() - start, e2.toString());
            throw new ApiException(e2);
        }
        final LazopResponse response = this.parseResponse(requestContext.getResponseBody());
        if (!response.isSuccess()) {
            LazopLogger.write(this.appKey, this.sdkVersion, request.getApiName(), this.serverUrl, requestContext.getAllParams(), System.currentTimeMillis() - start, response.getBody());
        }
        else if (this.isDebugEnabled() || this.isInfoEnabled()) {
            LazopLogger.write(this.appKey, this.sdkVersion, request.getApiName(), this.serverUrl, requestContext.getAllParams(), System.currentTimeMillis() - start, "");
        }
        return response;
    }
    
    private LazopResponse parseResponse(final String jsonRsp) {
        final JSONReader reader = new JSONValidatingReader();
        final Map<?, ?> root = (Map<?, ?>)reader.read(jsonRsp);
        final LazopResponse response = new LazopResponse();
        response.setType((String)root.get("type"));
        response.setCode((String)root.get("code"));
        response.setMessage((String)root.get("message"));
        response.setRequestId((String)root.get("request_id"));
        response.setBody(jsonRsp);
        return response;
    }
    
    public void setNeedEnableLogger(final boolean needEnableLogger) {
        LazopLogger.setNeedEnableLogger(needEnableLogger);
    }
    
    public void setIgnoreSSLCheck(final boolean ignore) {
        WebUtils.setIgnoreSSLCheck(ignore);
    }
    
    public void setUseGzipEncoding(final boolean useGzipEncoding) {
        this.useGzipEncoding = useGzipEncoding;
    }
    
    public void setConnectTimeout(final int connectTimeout) {
        this.connectTimeout = connectTimeout;
    }
    
    public void setReadTimeout(final int readTimeout) {
        this.readTimeout = readTimeout;
    }
    
    public void setSignMethod(final String signMethod) {
        this.signMethod = signMethod;
    }
    
    public void setProxy(final Proxy proxy) {
        this.proxy = proxy;
    }
    
    public void setLogLevel(final String logLevel) {
        this.logLevel = logLevel;
    }
    
    public boolean isDebugEnabled() {
        return this.logLevel.equals("DEBUG");
    }
    
    public boolean isInfoEnabled() {
        return this.logLevel.equals("INFO");
    }
    
    public boolean isErrorEnabled() {
        return this.logLevel.equals("ERROR");
    }
}
