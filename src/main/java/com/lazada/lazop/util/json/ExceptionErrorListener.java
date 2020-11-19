// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util.json;

public class ExceptionErrorListener extends BufferErrorListener
{
    @Override
    public void error(final String type, final int col) {
        super.error(type, col);
        throw new IllegalArgumentException(this.buffer.toString());
    }
}
