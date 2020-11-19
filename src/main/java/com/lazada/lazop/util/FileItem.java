// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util;

import java.io.FileInputStream;
import java.io.OutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.File;

public class FileItem
{
    private Contract contract;
    
    public FileItem(final File file) {
        this.contract = new LocalContract(file);
    }
    
    public FileItem(final String filePath) {
        this(new File(filePath));
    }
    
    public FileItem(final String fileName, final byte[] content) {
        this(fileName, content, null);
    }
    
    public FileItem(final String fileName, final byte[] content, final String mimeType) {
        this.contract = new ByteArrayContract(fileName, content, mimeType);
    }
    
    public FileItem(final String fileName, final InputStream stream) {
        this(fileName, stream, null);
    }
    
    public FileItem(final String fileName, final InputStream stream, final String mimeType) {
        this.contract = new StreamContract(fileName, stream, mimeType);
    }
    
    public boolean isValid() {
        return this.contract.isValid();
    }
    
    public String getFileName() {
        return this.contract.getFileName();
    }
    
    public String getMimeType() throws IOException {
        return this.contract.getMimeType();
    }
    
    public long getFileLength() {
        return this.contract.getFileLength();
    }
    
    public void write(final OutputStream output) throws IOException {
        this.contract.write(output);
    }
    
    private static class LocalContract implements Contract
    {
        private File file;
        
        public LocalContract(final File file) {
            this.file = file;
        }
        
        @Override
        public boolean isValid() {
            return this.file != null && this.file.exists() && this.file.isFile();
        }
        
        @Override
        public String getFileName() {
            return this.file.getName();
        }
        
        @Override
        public String getMimeType() {
            return "application/octet-stream";
        }
        
        @Override
        public long getFileLength() {
            return this.file.length();
        }
        
        @Override
        public void write(final OutputStream output) throws IOException {
            InputStream input = null;
            try {
                input = new FileInputStream(this.file);
                final byte[] buffer = new byte[4096];
                int n = 0;
                while (-1 != (n = input.read(buffer))) {
                    output.write(buffer, 0, n);
                }
            }
            finally {
                if (input != null) {
                    input.close();
                }
            }
        }
    }
    
    private static class ByteArrayContract implements Contract
    {
        private String fileName;
        private byte[] content;
        private String mimeType;
        
        public ByteArrayContract(final String fileName, final byte[] content, final String mimeType) {
            this.fileName = fileName;
            this.content = content;
            this.mimeType = mimeType;
        }
        
        @Override
        public boolean isValid() {
            return this.content != null && this.fileName != null;
        }
        
        @Override
        public String getFileName() {
            return this.fileName;
        }
        
        @Override
        public String getMimeType() {
            if (this.mimeType == null) {
                return "application/octet-stream";
            }
            return this.mimeType;
        }
        
        @Override
        public long getFileLength() {
            return this.content.length;
        }
        
        @Override
        public void write(final OutputStream output) throws IOException {
            output.write(this.content);
        }
    }
    
    private static class StreamContract implements Contract
    {
        private String fileName;
        private InputStream stream;
        private String mimeType;
        
        public StreamContract(final String fileName, final InputStream stream, final String mimeType) {
            this.fileName = fileName;
            this.stream = stream;
            this.mimeType = mimeType;
        }
        
        @Override
        public boolean isValid() {
            return this.stream != null && this.fileName != null;
        }
        
        @Override
        public String getFileName() {
            return this.fileName;
        }
        
        @Override
        public String getMimeType() {
            if (this.mimeType == null) {
                return "application/octet-stream";
            }
            return this.mimeType;
        }
        
        @Override
        public long getFileLength() {
            return 0L;
        }
        
        @Override
        public void write(final OutputStream output) throws IOException {
            try {
                final byte[] buffer = new byte[4096];
                int n = 0;
                while (-1 != (n = this.stream.read(buffer))) {
                    output.write(buffer, 0, n);
                }
            }
            finally {
                if (this.stream != null) {
                    this.stream.close();
                }
            }
        }
    }
    
    private interface Contract
    {
        boolean isValid();
        
        String getFileName();
        
        String getMimeType();
        
        long getFileLength();
        
        void write(final OutputStream p0) throws IOException;
    }
}
