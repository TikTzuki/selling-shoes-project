// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.net.InetAddress;
import java.util.Iterator;
import java.util.Set;
import java.util.HashMap;
import javax.crypto.SecretKey;
import java.security.GeneralSecurityException;
import java.security.Key;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Arrays;
import java.util.Map;
import java.io.IOException;

public abstract class LazopUtils
{
    private static String intranetIp;
    
    private LazopUtils() {
    }
    
    public static String signApiRequest(final RequestContext requestContext, final String appSecret, final String signMethod) throws IOException {
        return signApiRequest(requestContext.getApiName(), requestContext.getAllParams(), null, appSecret, signMethod);
    }
    
    public static String signApiRequest(final String apiName, final Map<String, String> params, final String body, final String appSecret, final String signMethod) throws IOException {
        final String[] keys = params.keySet().toArray(new String[0]);
        Arrays.sort(keys);
        final StringBuilder query = new StringBuilder();
        query.append(apiName);
        for (final String key : keys) {
            final String value = params.get(key);
            if (areNotEmpty(key, value)) {
                query.append(key).append(value);
            }
        }
        if (body != null) {
            query.append(body);
        }
        byte[] bytes = null;
        if (signMethod.equals("sha256")) {
            bytes = encryptHMACSHA256(query.toString(), appSecret);
            return byte2hex(bytes);
        }
        throw new IOException("Invalid Sign Method");
    }
    
    private static byte[] encryptHMACSHA256(final String data, final String secret) throws IOException {
        byte[] bytes = null;
        try {
            final SecretKey secretKey = new SecretKeySpec(secret.getBytes("UTF-8"), "HmacSHA256");
            final Mac mac = Mac.getInstance(secretKey.getAlgorithm());
            mac.init(secretKey);
            bytes = mac.doFinal(data.getBytes("UTF-8"));
        }
        catch (GeneralSecurityException gse) {
            throw new IOException(gse.toString());
        }
        return bytes;
    }
    
    public static String byte2hex(final byte[] bytes) {
        final StringBuilder sign = new StringBuilder();
        for (int i = 0; i < bytes.length; ++i) {
            final String hex = Integer.toHexString(bytes[i] & 0xFF);
            if (hex.length() == 1) {
                sign.append("0");
            }
            sign.append(hex.toUpperCase());
        }
        return sign.toString();
    }
    
    public static <V> Map<String, V> cleanupMap(final Map<String, V> map) {
        if (map == null || map.isEmpty()) {
            return null;
        }
        final Map<String, V> result = new HashMap<String, V>(map.size());
        final Set<Map.Entry<String, V>> entries = map.entrySet();
        for (final Map.Entry<String, V> entry : entries) {
            if (entry.getValue() != null) {
                result.put(entry.getKey(), entry.getValue());
            }
        }
        return result;
    }
    
    public static String getIntranetIp() {
        if (LazopUtils.intranetIp == null) {
            try {
                LazopUtils.intranetIp = InetAddress.getLocalHost().getHostAddress();
            }
            catch (Exception e) {
                LazopUtils.intranetIp = "127.0.0.1";
            }
        }
        return LazopUtils.intranetIp;
    }
    
    public static boolean isEmpty(final String value) {
        final int strLen;
        if (value == null || (strLen = value.length()) == 0) {
            return true;
        }
        for (int i = 0; i < strLen; ++i) {
            if (!Character.isWhitespace(value.charAt(i))) {
                return false;
            }
        }
        return true;
    }
    
    public static boolean areNotEmpty(final String... values) {
        boolean result = true;
        if (values == null || values.length == 0) {
            result = false;
        }
        else {
            for (final String value : values) {
                result &= !isEmpty(value);
            }
        }
        return result;
    }
    
    public static String formatDateTime(final Date date, final String pattern) {
        final DateFormat format = new SimpleDateFormat(pattern);
        return format.format(date);
    }
}
