// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util;

import org.apache.commons.logging.LogFactory;
import java.io.IOException;
import java.util.Date;
import java.util.Map;
import org.apache.commons.logging.Log;

public class LazopLogger
{
    private static final Log log;
    private static final String LOG_SPLIT = "^_^";
    private static String osName;
    private static boolean needEnableLogger;
    
    public static void setNeedEnableLogger(final boolean needEnableLogger) {
        LazopLogger.needEnableLogger = needEnableLogger;
    }
    
    public static void write(final String appKey, final String sdkVersion, final String apiName, final String url, final Map<String, String> params, final long latency, final String errorMessage) {
        if (!LazopLogger.needEnableLogger) {
            return;
        }
        final StringBuilder sb = buildLogApi(appKey, sdkVersion, apiName, url, params, latency, errorMessage);
        LazopLogger.log.error((Object)sb.toString());
    }
    
    private static StringBuilder buildLogApi(final String appKey, final String sdkVersion, final String apiName, final String url, final Map<String, String> params, final long latency, final String errorMessage) {
        final StringBuilder sb = new StringBuilder();
        sb.append(formatDateTime(new Date()));
        sb.append("^_^");
        sb.append(appKey);
        sb.append("^_^");
        sb.append(sdkVersion);
        sb.append("^_^");
        sb.append(apiName);
        sb.append("^_^");
        sb.append(LazopUtils.getIntranetIp());
        sb.append("^_^");
        sb.append(LazopLogger.osName);
        sb.append("^_^");
        sb.append(latency);
        sb.append("^_^");
        sb.append(url);
        try {
            sb.append("^_^");
            sb.append(WebUtils.buildQuery(params, "utf-8"));
        }
        catch (IOException ex) {}
        sb.append("^_^");
        sb.append(errorMessage);
        return sb;
    }
    
    private static String formatDateTime(final Date date) {
        return LazopUtils.formatDateTime(date, "yyyy-MM-dd HH:mm:ss.SSS");
    }
    
    static {
        log = LogFactory.getLog((Class)LazopLogger.class);
        LazopLogger.osName = System.getProperties().getProperty("os.name");
        LazopLogger.needEnableLogger = true;
    }
}
