// 
// Decompiled by Procyon v0.5.36
// 

package com.lazada.lazop.util.json;

public interface JSONErrorListener
{
    void start(final String p0);
    
    void error(final String p0, final int p1);
    
    void end();
}
