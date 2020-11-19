// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util.json;

public class BufferErrorListener implements JSONErrorListener
{
    protected StringBuffer buffer;
    private String input;
    
    public BufferErrorListener(final StringBuffer buffer) {
        this.buffer = buffer;
    }
    
    public BufferErrorListener() {
        this(new StringBuffer());
    }
    
    @Override
    public void start(final String input) {
        this.input = input;
        this.buffer.setLength(0);
    }
    
    @Override
    public void error(final String type, final int col) {
        this.buffer.append("expected ");
        this.buffer.append(type);
        this.buffer.append(" at column ");
        this.buffer.append(col);
        this.buffer.append("\n");
        this.buffer.append(this.input);
        this.buffer.append("\n");
        this.indent(col - 1, this.buffer);
        this.buffer.append("^");
    }
    
    private void indent(final int n, final StringBuffer ret) {
        for (int i = 0; i < n; ++i) {
            ret.append(' ');
        }
    }
    
    @Override
    public void end() {
    }
}
