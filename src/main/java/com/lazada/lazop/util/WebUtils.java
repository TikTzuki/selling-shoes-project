// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util;

import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import javax.net.ssl.X509TrustManager;
import java.util.HashMap;
import java.io.Reader;
import java.io.InputStreamReader;
import java.io.InputStream;
import java.util.zip.GZIPInputStream;
import java.net.URLEncoder;
import javax.net.ssl.SSLSession;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.KeyManager;
import java.security.SecureRandom;
import javax.net.ssl.TrustManager;
import javax.net.ssl.SSLContext;
import javax.net.ssl.HttpsURLConnection;
import java.util.Iterator;
import java.util.Set;
import java.io.OutputStream;
import java.net.URL;
import java.net.HttpURLConnection;
import java.io.IOException;
import java.net.Proxy;
import java.util.Map;

public abstract class WebUtils
{
    private static final String DEFAULT_CHARSET = "UTF-8";
    private static boolean ignoreSSLCheck;
    private static boolean ignoreHostCheck;
    
    private WebUtils() {
    }
    
    public static void setIgnoreSSLCheck(final boolean ignoreSSLCheck) {
        WebUtils.ignoreSSLCheck = ignoreSSLCheck;
    }
    
    public static void setIgnoreHostCheck(final boolean ignoreHostCheck) {
        WebUtils.ignoreHostCheck = ignoreHostCheck;
    }
    
    public static String doGet(final String url, final Map<String, String> params, final int connectTimeout, final int readTimeout) throws IOException {
        return doGet(url, params, null, connectTimeout, readTimeout, "UTF-8", null);
    }
    
    public static String doGet(final String url, final Map<String, String> queryParams, final Map<String, String> headerParams, final int connectTimeout, final int readTimeout, final String charset, final Proxy proxy) throws IOException {
        HttpURLConnection conn = null;
        String rsp = null;
        try {
            final String ctype = "application/x-www-form-urlencoded;charset=" + charset;
            final String query = buildQuery(queryParams, charset);
            conn = getConnection(buildGetUrl(url, query), "GET", ctype, headerParams, proxy);
            conn.setConnectTimeout(connectTimeout);
            conn.setReadTimeout(readTimeout);
            rsp = getResponseAsString(conn);
        }
        finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
        return rsp;
    }
    
    public static String doPost(final String url, final Map<String, String> params, final int connectTimeout, final int readTimeout) throws IOException {
        return doPost(url, params, null, "UTF-8", connectTimeout, readTimeout, null);
    }
    
    public static String doPost(final String url, final String body, final Map<String, String> headers, final String charset, final int connectTimeout, final int readTimeout) throws IOException {
        final String ctype = "text/plain;charset=" + charset;
        final byte[] content = body.getBytes(charset);
        return _doPost(url, ctype, content, headers, connectTimeout, readTimeout, null);
    }
    
    public static String doPost(final String url, final Map<String, String> queryParams, final Map<String, String> headerParams, final String charset, final int connectTimeout, final int readTimeout, final Proxy proxy) throws IOException {
        final String ctype = "application/x-www-form-urlencoded;charset=" + charset;
        final String query = buildQuery(queryParams, charset);
        byte[] content = new byte[0];
        if (query != null) {
            content = query.getBytes(charset);
        }
        return _doPost(url, ctype, content, headerParams, connectTimeout, readTimeout, proxy);
    }
    
    private static String _doPost(final String url, final String ctype, final byte[] content, final Map<String, String> headers, final int connectTimeout, final int readTimeout, final Proxy proxy) throws IOException {
        HttpURLConnection conn = null;
        OutputStream out = null;
        String rsp = null;
        try {
            conn = getConnection(new URL(url), "POST", ctype, headers, proxy);
            conn.setConnectTimeout(connectTimeout);
            conn.setReadTimeout(readTimeout);
            out = conn.getOutputStream();
            out.write(content);
            rsp = getResponseAsString(conn);
        }
        finally {
            if (out != null) {
                out.close();
            }
            if (conn != null) {
                conn.disconnect();
            }
        }
        return rsp;
    }
    
    public static String doPost(final String url, final Map<String, String> queryParams, final Map<String, FileItem> fileParams, final int connectTimeout, final int readTimeout) throws IOException {
        return doPost(url, queryParams, fileParams, null, "UTF-8", connectTimeout, readTimeout);
    }
    
    public static String doPost(final String url, final Map<String, String> queryParams, final Map<String, FileItem> fileParams, final Map<String, String> headerParams, final String charset, final int connectTimeout, final int readTimeout) throws IOException {
        if (fileParams == null || fileParams.isEmpty()) {
            return doPost(url, queryParams, headerParams, charset, connectTimeout, readTimeout, null);
        }
        return _doPostWithFile(url, queryParams, fileParams, headerParams, charset, connectTimeout, readTimeout);
    }
    
    private static String _doPostWithFile(final String url, final Map<String, String> queryParams, final Map<String, FileItem> fileParams, final Map<String, String> headerParams, final String charset, final int connectTimeout, final int readTimeout) throws IOException {
        final String boundary = String.valueOf(System.nanoTime());
        HttpURLConnection conn = null;
        OutputStream out = null;
        String rsp = null;
        try {
            final String ctype = "multipart/form-data;charset=" + charset + ";boundary=" + boundary;
            conn = getConnection(new URL(url), "POST", ctype, headerParams, null);
            conn.setConnectTimeout(connectTimeout);
            conn.setReadTimeout(readTimeout);
            out = conn.getOutputStream();
            final byte[] entryBoundaryBytes = ("\r\n--" + boundary + "\r\n").getBytes(charset);
            final Set<Map.Entry<String, String>> textEntrySet = queryParams.entrySet();
            for (final Map.Entry<String, String> textEntry : textEntrySet) {
                final byte[] textBytes = getTextEntry(textEntry.getKey(), textEntry.getValue(), charset);
                out.write(entryBoundaryBytes);
                out.write(textBytes);
            }
            final Set<Map.Entry<String, FileItem>> fileEntrySet = fileParams.entrySet();
            for (final Map.Entry<String, FileItem> fileEntry : fileEntrySet) {
                final FileItem fileItem = fileEntry.getValue();
                if (!fileItem.isValid()) {
                    throw new IOException("FileItem is invalid");
                }
                final byte[] fileBytes = getFileEntry(fileEntry.getKey(), fileItem.getFileName(), fileItem.getMimeType(), charset);
                out.write(entryBoundaryBytes);
                out.write(fileBytes);
                fileItem.write(out);
            }
            final byte[] endBoundaryBytes = ("\r\n--" + boundary + "--\r\n").getBytes(charset);
            out.write(endBoundaryBytes);
            rsp = getResponseAsString(conn);
        }
        finally {
            if (out != null) {
                out.close();
            }
            if (conn != null) {
                conn.disconnect();
            }
        }
        return rsp;
    }
    
    private static byte[] getTextEntry(final String fieldName, final String fieldValue, final String charset) throws IOException {
        final StringBuilder entry = new StringBuilder();
        entry.append("Content-Disposition:form-data;name=\"");
        entry.append(fieldName);
        entry.append("\"\r\nContent-Type:text/plain\r\n\r\n");
        entry.append(fieldValue);
        return entry.toString().getBytes(charset);
    }
    
    private static byte[] getFileEntry(final String fieldName, final String fileName, final String mimeType, final String charset) throws IOException {
        final StringBuilder entry = new StringBuilder();
        entry.append("Content-Disposition:form-data;name=\"");
        entry.append(fieldName);
        entry.append("\";filename=\"");
        entry.append(fileName);
        entry.append("\"\r\nContent-Type:");
        entry.append(mimeType);
        entry.append("\r\n\r\n");
        return entry.toString().getBytes(charset);
    }
    
    private static HttpURLConnection getConnection(final URL url, final String method, final String ctype, final Map<String, String> headers, final Proxy proxy) throws IOException {
        HttpURLConnection conn = null;
        if (proxy == null) {
            conn = (HttpURLConnection)url.openConnection();
        }
        else {
            conn = (HttpURLConnection)url.openConnection(proxy);
        }
        if (conn instanceof HttpsURLConnection) {
            final HttpsURLConnection connHttps = (HttpsURLConnection)conn;
            Label_0144: {
                if (WebUtils.ignoreSSLCheck) {
                    try {
                        final SSLContext ctx = SSLContext.getInstance("TLS");
                        ctx.init(null, new TrustManager[] { new TrustAllTrustManager() }, new SecureRandom());
                        connHttps.setSSLSocketFactory(ctx.getSocketFactory());
                        connHttps.setHostnameVerifier(new HostnameVerifier() {
                            @Override
                            public boolean verify(final String hostname, final SSLSession session) {
                                return true;
                            }
                        });
                        break Label_0144;
                    }
                    catch (Exception e) {
                        throw new IOException(e.toString());
                    }
                }
                if (WebUtils.ignoreHostCheck) {
                    connHttps.setHostnameVerifier(new HostnameVerifier() {
                        @Override
                        public boolean verify(final String hostname, final SSLSession session) {
                            return true;
                        }
                    });
                }
            }
            conn = connHttps;
        }
        conn.setRequestMethod(method);
        conn.setDoInput(true);
        conn.setDoOutput(true);
        conn.setRequestProperty("Host", url.getHost());
        conn.setRequestProperty("Accept", "text/xml,text/javascript");
        conn.setRequestProperty("User-Agent", "lazop-sdk-java");
        conn.setRequestProperty("Content-Type", ctype);
        if (headers != null) {
            for (final Map.Entry<String, String> entry : headers.entrySet()) {
                conn.setRequestProperty(entry.getKey(), entry.getValue());
            }
        }
        return conn;
    }
    
    private static URL buildGetUrl(final String url, final String query) throws IOException {
        if (LazopUtils.isEmpty(query)) {
            return new URL(url);
        }
        return new URL(buildRequestUrl(url, query));
    }
    
    public static String buildRequestUrl(final String url, final String... queries) {
        if (queries == null || queries.length == 0) {
            return url;
        }
        final StringBuilder newUrl = new StringBuilder(url);
        boolean hasQuery = url.contains("?");
        boolean hasPrepend = url.endsWith("?") || url.endsWith("&");
        for (final String query : queries) {
            if (!LazopUtils.isEmpty(query)) {
                if (!hasPrepend) {
                    if (hasQuery) {
                        newUrl.append("&");
                    }
                    else {
                        newUrl.append("?");
                        hasQuery = true;
                    }
                }
                newUrl.append(query);
                hasPrepend = false;
            }
        }
        return newUrl.toString();
    }
    
    public static String buildRestUrl(final String url, final String apiName) {
        if (apiName == null || apiName.length() == 0) {
            return url;
        }
        final boolean hasPrepend = url.endsWith("/");
        if (hasPrepend) {
            return url + apiName.substring(1);
        }
        return url + apiName;
    }
    
    public static String buildQuery(final Map<String, String> params, final String charset) throws IOException {
        if (params == null || params.isEmpty()) {
            return null;
        }
        final StringBuilder query = new StringBuilder();
        final Set<Map.Entry<String, String>> entries = params.entrySet();
        boolean hasParam = false;
        for (final Map.Entry<String, String> entry : entries) {
            final String name = entry.getKey();
            final String value = entry.getValue();
            if (LazopUtils.areNotEmpty(name, value)) {
                if (hasParam) {
                    query.append("&");
                }
                else {
                    hasParam = true;
                }
                query.append(name).append("=").append(URLEncoder.encode(value, charset));
            }
        }
        return query.toString();
    }
    
    protected static String getResponseAsString(final HttpURLConnection conn) throws IOException {
        final String charset = getResponseCharset(conn.getContentType());
        if (conn.getResponseCode() >= 400) {
            if (conn.getResponseCode() == 400) {
                final InputStream error = conn.getErrorStream();
                if (error != null) {
                    return getStreamAsString(error, charset);
                }
            }
            throw new IOException(conn.getResponseCode() + " " + conn.getResponseMessage());
        }
        final String contentEncoding = conn.getContentEncoding();
        if ("gzip".equalsIgnoreCase(contentEncoding)) {
            return getStreamAsString(new GZIPInputStream(conn.getInputStream()), charset);
        }
        return getStreamAsString(conn.getInputStream(), charset);
    }
    
    public static String getStreamAsString(final InputStream stream, final String charset) throws IOException {
        try {
            final Reader reader = new InputStreamReader(stream, charset);
            final StringBuilder response = new StringBuilder();
            final char[] buff = new char[1024];
            int read = 0;
            while ((read = reader.read(buff)) > 0) {
                response.append(buff, 0, read);
            }
            return response.toString();
        }
        finally {
            if (stream != null) {
                stream.close();
            }
        }
    }
    
    public static String getResponseCharset(final String ctype) {
        String charset = "UTF-8";
        if (!LazopUtils.isEmpty(ctype)) {
            final String[] arr$;
            final String[] params = arr$ = ctype.split(";");
            final int len$ = arr$.length;
            int i$ = 0;
            while (i$ < len$) {
                String param = arr$[i$];
                param = param.trim();
                if (param.startsWith("charset")) {
                    final String[] pair = param.split("=", 2);
                    if (pair.length == 2 && !LazopUtils.isEmpty(pair[1])) {
                        charset = pair[1].trim();
                        break;
                    }
                    break;
                }
                else {
                    ++i$;
                }
            }
        }
        return charset;
    }
    
    public static Map<String, String> splitUrlQuery(final String query) {
        final Map<String, String> result = new HashMap<String, String>();
        final String[] pairs = query.split("&");
        if (pairs != null && pairs.length > 0) {
            for (final String pair : pairs) {
                final String[] param = pair.split("=", 2);
                if (param != null && param.length == 2) {
                    result.put(param[0], param[1]);
                }
            }
        }
        return result;
    }
    
    static {
        WebUtils.ignoreSSLCheck = true;
        WebUtils.ignoreHostCheck = true;
    }
    
    public static class TrustAllTrustManager implements X509TrustManager
    {
        @Override
        public X509Certificate[] getAcceptedIssuers() {
            return null;
        }
        
        @Override
        public void checkClientTrusted(final X509Certificate[] chain, final String authType) throws CertificateException {
        }
        
        @Override
        public void checkServerTrusted(final X509Certificate[] chain, final String authType) throws CertificateException {
        }
    }
}
